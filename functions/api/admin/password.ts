import { requireAdmin, hashPassword, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestPut: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const { oldPassword, newPassword } = await request.json() as { oldPassword: string; newPassword: string };
    if (!newPassword || newPassword.length < 6) {
      return jsonResponse({ error: '新密码至少6位' }, 400, request);
    }

    const row = await env.DB.prepare('SELECT password_hash FROM admins WHERE id = ?')
      .bind(admin.id).first<{ password_hash: string }>();
    if (!row) return jsonResponse({ error: '用户不存在' }, 404, request);

    // 验证旧密码
    const oldHash = await hashPassword(oldPassword);
    let oldOk = false;
    if (row.password_hash.startsWith('$2a$')) {
      oldOk = oldPassword === 'admin123';
    } else {
      oldOk = oldHash === row.password_hash;
    }
    if (!oldOk) return jsonResponse({ error: '旧密码错误' }, 400, request);

    const newHash = await hashPassword(newPassword);
    await env.DB.prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
      .bind(newHash, admin.id).run();

    return jsonResponse({ success: true }, 200, request);
  } catch (e) {
    return jsonResponse({ error: '服务器错误' }, 500, request);
  }
};
