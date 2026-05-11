import { createToken, hashPassword, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

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

    // 支持初始 bcrypt hash（admin123）和 SHA-256 hash
    let passwordOk = false;
    const inputHash = await hashPassword(password);

    if (admin.password_hash.startsWith('$2a$')) {
      // 初始 bcrypt hash，只接受默认密码 admin123
      passwordOk = password === 'admin123';
      if (passwordOk) {
        // 自动升级为 SHA-256 hash
        await env.DB.prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
          .bind(inputHash, admin.id).run();
      }
    } else {
      passwordOk = inputHash === admin.password_hash;
    }

    if (!passwordOk) {
      return jsonResponse({ error: '用户名或密码错误' }, 401, request);
    }

    const token = await createToken({ id: admin.id, username: admin.username }, env.JWT_SECRET);
    return jsonResponse({ token, username: admin.username }, 200, request);
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: '服务器错误' }, 500, request);
  }
};
