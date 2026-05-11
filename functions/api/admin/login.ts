import { createToken, verifyPassword, hashPassword, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestPost: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  try {
    const { username, password } = await request.json() as { username: string; password: string };
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
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: '服务器错误' }, 500, request);
  }
};
