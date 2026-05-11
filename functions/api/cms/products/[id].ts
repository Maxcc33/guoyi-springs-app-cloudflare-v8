import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestGet: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const isAdmin = !!(await requireAdmin(request, env));
  const row = await env.DB.prepare(
    `SELECT * FROM products WHERE id = ? ${isAdmin ? '' : 'AND published = 1'}`
  ).bind(params.id).first();
  if (!row) return jsonResponse({ error: '产品不存在' }, 404, request);
  return jsonResponse(row, 200, request);
};

export const onRequestPut: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const body = await request.json() as {
      name_zh?: string; name_en?: string;
      description_zh?: string; description_en?: string;
      specs_zh?: string[]; specs_en?: string[];
      applications_zh?: string; applications_en?: string;
      image?: string; material?: string;
      published?: number; sort_order?: number;
    };

    await env.DB.prepare(
      `UPDATE products SET
        name_zh = COALESCE(?, name_zh),
        name_en = COALESCE(?, name_en),
        description_zh = COALESCE(?, description_zh),
        description_en = COALESCE(?, description_en),
        specs_zh = COALESCE(?, specs_zh),
        specs_en = COALESCE(?, specs_en),
        applications_zh = COALESCE(?, applications_zh),
        applications_en = COALESCE(?, applications_en),
        image = COALESCE(?, image),
        material = COALESCE(?, material),
        published = COALESCE(?, published),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
       WHERE id = ?`
    ).bind(
      body.name_zh ?? null, body.name_en ?? null,
      body.description_zh ?? null, body.description_en ?? null,
      body.specs_zh ? JSON.stringify(body.specs_zh) : null,
      body.specs_en ? JSON.stringify(body.specs_en) : null,
      body.applications_zh ?? null, body.applications_en ?? null,
      body.image ?? null, body.material ?? null,
      body.published ?? null, body.sort_order ?? null,
      params.id
    ).run();

    return jsonResponse({ success: true }, 200, request);
  } catch (e) {
    return jsonResponse({ error: '更新失败' }, 500, request);
  }
};

export const onRequestDelete: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);
  await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(params.id).run();
  return jsonResponse({ success: true }, 200, request);
};
