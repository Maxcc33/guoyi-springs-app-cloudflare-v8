import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

// GET: 获取单条新闻详情
export const onRequestGet: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;
  const isAdmin = !!(await requireAdmin(request, env));

  const row = await env.DB.prepare(
    `SELECT * FROM news WHERE id = ? ${isAdmin ? '' : 'AND published = 1'}`
  ).bind(id).first();

  if (!row) return jsonResponse({ error: '文章不存在' }, 404, request);
  return jsonResponse(row, 200, request);
};

// PUT: 更新新闻
export const onRequestPut: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  const id = params.id as string;
  try {
    const body = await request.json() as {
      title_zh?: string; title_en?: string;
      category_zh?: string; category_en?: string;
      summary_zh?: string; summary_en?: string;
      content_zh?: string; content_en?: string;
      image?: string; published?: number; sort_order?: number;
    };

    await env.DB.prepare(
      `UPDATE news SET
        title_zh = COALESCE(?, title_zh),
        title_en = COALESCE(?, title_en),
        category_zh = COALESCE(?, category_zh),
        category_en = COALESCE(?, category_en),
        summary_zh = COALESCE(?, summary_zh),
        summary_en = COALESCE(?, summary_en),
        content_zh = COALESCE(?, content_zh),
        content_en = COALESCE(?, content_en),
        image = COALESCE(?, image),
        published = COALESCE(?, published),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
       WHERE id = ?`
    ).bind(
      body.title_zh ?? null, body.title_en ?? null,
      body.category_zh ?? null, body.category_en ?? null,
      body.summary_zh ?? null, body.summary_en ?? null,
      body.content_zh ?? null, body.content_en ?? null,
      body.image ?? null,
      body.published ?? null, body.sort_order ?? null,
      id
    ).run();

    return jsonResponse({ success: true }, 200, request);
  } catch (e) {
    return jsonResponse({ error: '更新失败' }, 500, request);
  }
};

// DELETE: 删除新闻
export const onRequestDelete: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  await env.DB.prepare('DELETE FROM news WHERE id = ?').bind(params.id).run();
  return jsonResponse({ success: true }, 200, request);
};
