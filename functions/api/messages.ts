interface Env {
  DB: D1Database;
}

// 处理 POST 请求 - 提交留言
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      name: string;
      phone: string;
      email?: string;
      message: string;
    };

    // 参数校验
    if (!body.name || !body.phone || !body.message) {
      return new Response(JSON.stringify({ error: '姓名、电话和留言内容为必填项' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 插入数据库
    await context.env.DB.prepare(
      'INSERT INTO messages (name, phone, email, message, created_at) VALUES (?, ?, ?, ?, datetime("now"))'
    ).bind(body.name, body.phone, body.email || '', body.message).run();

    return new Response(JSON.stringify({ success: true, message: '留言提交成功' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器错误，请稍后重试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// 处理 GET 请求 - 获取留言列表（可选，管理用）
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const result = await context.env.DB.prepare(
      'SELECT * FROM messages ORDER BY created_at DESC LIMIT 100'
    ).all();

    return new Response(JSON.stringify(result.results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '获取留言失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
