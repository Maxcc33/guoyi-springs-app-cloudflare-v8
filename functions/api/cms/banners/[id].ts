import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestPut: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, params } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const body = await request.json() as {
      title_zh?: string; title_en?: string;
      subtitle_zh?: string; subtitle_en?: string;
      image?: string; link?: string;
      published?: number; sort_order?: number;
    };

    await env.DB.prepare(
      `UPDATE banners SET
        title_zh = COALESCE(?, title_zh),
        title_en = COALESCE(?, title_en),
        subtitle_zh = COALESCE(?, subtitle_zh),
        subtitle_en = COALESCE(?, subtitle_en),
        image = COALESCE(?, image),
        link = COALESCE(?, link),
        published = COALESCE(?, published),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
       WHERE id = ?`
    ).bind(
      body.title_zh ?? null, body.title_en ?? null,
      body.subtitle_zh ?? null, body.subtitle_en ?? null,
      body.image ?? null, body.link ?? null,
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
  await env.DB.prepare('DELETE FROM banners WHERE id = ?').bind(params.id).run();
  return jsonResponse({ success: true }, 200, request);
};
