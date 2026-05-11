import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestGet: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const isAdmin = !!(await requireAdmin(request, env));
  const where = isAdmin ? '' : 'WHERE published = 1';
  const rows = await env.DB.prepare(
    `SELECT * FROM banners ${where} ORDER BY sort_order ASC, created_at ASC`
  ).all();
  return jsonResponse({ list: rows.results }, 200, request);
};

export const onRequestPost: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const body = await request.json() as {
      title_zh?: string; title_en?: string;
      subtitle_zh?: string; subtitle_en?: string;
      image: string; link?: string;
      published?: number; sort_order?: number;
    };

    if (!body.image?.trim()) {
      return jsonResponse({ error: '图片不能为空' }, 400, request);
    }

    const result = await env.DB.prepare(
      `INSERT INTO banners (title_zh, title_en, subtitle_zh, subtitle_en, image, link, published, sort_order, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    ).bind(
      body.title_zh?.trim() || '',
      body.title_en?.trim() || '',
      body.subtitle_zh?.trim() || '',
      body.subtitle_en?.trim() || '',
      body.image.trim(),
      body.link?.trim() || '',
      body.published ?? 1,
      body.sort_order ?? 0
    ).run();

    return jsonResponse({ success: true, id: result.meta.last_row_id }, 201, request);
  } catch (e) {
    return jsonResponse({ error: '创建失败' }, 500, request);
  }
};
