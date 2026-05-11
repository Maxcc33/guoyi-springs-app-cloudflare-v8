import { createToken, verifyPassword, hashPassword, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestPost: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  try {
    // 检查必要的环境变量
    if (!env.JWT_SECRET) {
      console.error('ADMIN_JWT_SECRET 环境变量未设置');
      return jsonResponse({ error: 'JWT_SECRET 未配置', detail: 'ADMIN_JWT_SECRET environment variable is missing' }, 500, request);
    }

    if (!env.DB) {
      console.error('DB 绑定未设置');
      return jsonResponse({ error: 'DB 未绑定', detail: 'D1 database binding is missing' }, 500, request);
    }

    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return jsonResponse({ error: '用户名和密码不能为空' }, 400, request);
    }

    const admin = await env.DB.prepare('SELECT id, username, password_hash FROM admins WHERE username = ?')
      .bind(username.trim())
      .first<{ id: number; username: string; password_hash: string }>();

    if (!admin) {
      return jsonResponse({ error: '用户名或密码错误' }, 401, request);
    }

    const passwordOk = await verifyPassword(password, admin.password_hash);

    if (!passwordOk) {
      return jsonResponse({ error: '用户名或密码错误' }, 401, request);
    }

    // 如果是旧的 bcrypt hash，自动升级为 SHA-256
    if (admin.password_hash.startsWith('$2a$')) {
      const newHash = await hashPassword(password);
      await env.DB.prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
        .bind(newHash, admin.id).run();
    }

    const token = await createToken({ id: admin.id, username: admin.username }, env.JWT_SECRET);
    return jsonResponse({ token, username: admin.username }, 200, request);
  } catch (e: unknown) {
    const errMsg = e instanceof Error ? e.message : String(e);
    console.error('登录错误:', errMsg);
    return jsonResponse({ error: '服务器错误', detail: errMsg }, 500, request);
  }
};
