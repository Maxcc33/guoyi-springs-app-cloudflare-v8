import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestGet: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const isAdmin = !!(await requireAdmin(request, env));
  const where = isAdmin ? '' : 'WHERE published = 1';

  const rows = await env.DB.prepare(
    `SELECT * FROM products ${where} ORDER BY sort_order ASC, created_at DESC`
  ).all();

  return jsonResponse({ list: rows.results }, 200, request);
};

export const onRequestPost: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const body = await request.json() as {
      name_zh: string; name_en?: string;
      description_zh?: string; description_en?: string;
      specs_zh?: string[]; specs_en?: string[];
      applications_zh?: string; applications_en?: string;
      image?: string; material?: string;
      published?: number; sort_order?: number;
    };

    if (!body.name_zh?.trim()) {
      return jsonResponse({ error: '产品名称不能为空' }, 400, request);
    }

    const result = await env.DB.prepare(
      `INSERT INTO products (name_zh, name_en, description_zh, description_en, specs_zh, specs_en, applications_zh, applications_en, image, material, published, sort_order, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    ).bind(
      body.name_zh.trim(),
      body.name_en?.trim() || '',
      body.description_zh?.trim() || '',
      body.description_en?.trim() || '',
      JSON.stringify(body.specs_zh || []),
      JSON.stringify(body.specs_en || []),
      body.applications_zh?.trim() || '',
      body.applications_en?.trim() || '',
      body.image?.trim() || '',
      body.material?.trim() || 'all',
      body.published ?? 1,
      body.sort_order ?? 0
    ).run();

    return jsonResponse({ success: true, id: result.meta.last_row_id }, 201, request);
  } catch (e) {
    return jsonResponse({ error: '创建失败' }, 500, request);
  }
};
