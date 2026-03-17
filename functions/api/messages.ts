interface Env {
  DB: D1Database;
  'form-submit-limit': KVNamespace; 
  RESEND_API_KEY: string;
  WECHAT_WEBHOOK_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      name: string;
      phone: string;
      email?: string;
      message: string;
    };

    //基础必填校验
    if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
      return new Response(
        JSON.stringify({ error: '姓名、电话和留言内容为必填项' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    //KV限流防重逻辑开始
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const contentHash = await generateHash(body.message, body.name);

    // 构造唯一的 Key: 包含 IP、电话和内容哈希
    const limitKey = `limit:${ip}:${body.phone.trim()}:${contentHash}`;

    // 检查 KV 中是否存在该 Key
    const isRateLimited = await context.env['form-submit-limit'].get(limitKey);
    if (isRateLimited) {
      return new Response(
        JSON.stringify({ error: '请勿重复提交，60秒后再试' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    //写入 D1 数据库
    await context.env.DB.prepare(
      'INSERT INTO messages (name, phone, email, message, created_at) VALUES (?, ?, ?, ?, datetime("now"))'
    )
      .bind(
        body.name.trim(),
        body.phone.trim(),
        body.email?.trim() || '',
        body.message.trim()
      )
      .run();

    //发送邮件 (Resend)
    const { Resend } = await import('resend');
    const resend = new Resend(context.env.RESEND_API_KEY);
    const sendResult = await resend.emails.send({
      from: 'guoyisprings.com 通知 <notify@guoyisprings.com>',
      to: ['1926375372cgy@gmail.com'],
      subject: `新留言 - 来自 ${body.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; line-height: 1.6;">
          <h2 style="color: #1a1a1a;">收到新留言</h2>
          <p><strong>姓名：</strong> ${body.name}</p>
          <p><strong>电话：</strong> ${body.phone}</p>
          ${body.email ? `<p><strong>邮箱：</strong> ${body.email}</p>` : ''}
          <p><strong>留言内容：</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0; color: #444;">
            ${body.message.replace(/\n/g, '<br>')}
          </blockquote>
          <p style="font-size: 0.9em; color: #666;">
            提交时间：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
          </p>
        </div>
      `,
      reply_to: body.email ? [body.email] : undefined,
    });

    if (sendResult.error) {
      console.error('Resend 发送失败:', sendResult.error);
    }

    //微信推送
    const webhookUrl = context.env.WECHAT_WEBHOOK_URL;
    if (webhookUrl) {
      const wechatContent = `**网站新留言通知**
      ━━━━━━━━━━━━━━
      **姓名**：${body.name.trim()}
      **电话**：${body.phone.trim()}
      ${body.email ? `**邮箱**：${body.email.trim()}\n` : ''}
      **留言内容**：
      > ${body.message.trim().replace(/\n/g, '\n> ')}
      
      **提交时间**：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}`;

      try {
        const wechatRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            msgtype: 'markdown',
            markdown: {
              content: wechatContent
            }
          })
        });

        if (!wechatRes.ok) {
          console.error('微信推送失败:', await wechatRes.text());
        }
      } catch (wechatErr) {
        console.error('微信推送异常:', wechatErr);
      }
    } else {
      console.warn('缺少 WECHAT_WEBHOOK_URL 环境变量，跳过微信推送');
    }

    // === 成功后记录 KV，有效期 60 秒 ===
    await context.env['form-submit-limit'].put(limitKey, 'true', { expirationTtl: 60 });
    
    //成功or失败弹窗通知
    return new Response(
      JSON.stringify({ success: true, message: '留言提交成功，已收到通知' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('处理失败:', error);
    return new Response(
      JSON.stringify({ error: '服务器错误，请稍后重试' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
