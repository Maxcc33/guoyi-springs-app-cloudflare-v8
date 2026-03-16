interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;   // 必须声明这个环境变量
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      name: string;
      phone: string;
      email?: string;
      message: string;
    };

    // 必填校验（可按需加强，例如 phone 格式、email 合法性。）
    if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
      return new Response(
        JSON.stringify({ error: '姓名、电话和留言内容为必填项' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 存入 D1
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

    // ─────────────── 发送邮件 ───────────────
    // 先导入 Resend（需项目已安装 npm install resend）
    const { Resend } = await import('resend');

    const resend = new Resend(context.env.RESEND_API_KEY);

    const sendResult = await resend.emails.send({
      from: 'guoyisprings.com 通知 <notify@guoyisprings.com>',   // ← 改成你已验证的域名！不能用 @gmail.com
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
      // 可选：添加 reply_to，让你能直接点回复邮件联系客户
      reply_to: body.email ? [body.email] : undefined,
    });

    // 如果邮件发送失败，只记录日志，不影响用户看到“成功”
    if (sendResult.error) {
      console.error('Resend 发送失败:', sendResult.error);
      // 可选：你可以在生产环境接上 Cloudflare Logpush 或 Sentry 监控
    }

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
          const errorText = await wechatRes.text();
          console.error('微信推送失败:', wechatRes.status, errorText);
        }
      } catch (wechatErr) {
        console.error('微信推送异常:', wechatErr);
      }
    } else {
      console.warn('缺少 WECHAT_WEBHOOK_URL 环境变量，跳过微信推送');
    }

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

// GET 部分不变，可保留用于后台查看留言
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const result = await context.env.DB.prepare(
      'SELECT * FROM messages ORDER BY created_at DESC LIMIT 100'
    ).all();
    return new Response(JSON.stringify(result.results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: '获取留言失败' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

