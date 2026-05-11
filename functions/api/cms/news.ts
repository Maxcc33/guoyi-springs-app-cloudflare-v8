import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

// GET: 获取新闻列表（前台和后台都可用）
export const onRequestGet: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const isAdmin = !!(await requireAdmin(request, env));
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '20');
  const offset = (page - 1) * limit;

  // 后台显示全部，前台只显示已发布
  const where = isAdmin ? '' : 'WHERE published = 1';
  const rows = await env.DB.prepare(
    `SELECT id, title_zh, title_en, category_zh, category_en, summary_zh, summary_en, image, published, sort_order, created_at FROM news ${where} ORDER BY sort_order ASC, created_at DESC LIMIT ? OFFSET ?`
  ).bind(limit, offset).all();

  const total = await env.DB.prepare(`SELECT COUNT(*) as count FROM news ${where}`).first<{ count: number }>();

  return jsonResponse({ list: rows.results, total: total?.count || 0, page, limit }, 200, request);
};

// POST: 创建新闻（需要管理员权限）
export const onRequestPost: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const body = await request.json() as {
      title_zh: string; title_en?: string;
      category_zh?: string; category_en?: string;
      summary_zh?: string; summary_en?: string;
      content_zh?: string; content_en?: string;
      image?: string; published?: number; sort_order?: number;
    };

    if (!body.title_zh?.trim()) {
      return jsonResponse({ error: '标题不能为空' }, 400, request);
    }

    const result = await env.DB.prepare(
      `INSERT INTO news (title_zh, title_en, category_zh, category_en, summary_zh, summary_en, content_zh, content_en, image, published, sort_order, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    ).bind(
      body.title_zh.trim(),
      body.title_en?.trim() || '',
      body.category_zh?.trim() || '公司新闻',
      body.category_en?.trim() || 'Company News',
      body.summary_zh?.trim() || '',
      body.summary_en?.trim() || '',
      body.content_zh?.trim() || '',
      body.content_en?.trim() || '',
      body.image?.trim() || '',
      body.published ?? 1,
      body.sort_order ?? 0
    ).run();

    return jsonResponse({ success: true, id: result.meta.last_row_id }, 201, request);
  } catch (e) {
    return jsonResponse({ error: '创建失败' }, 500, request);
  }
};
