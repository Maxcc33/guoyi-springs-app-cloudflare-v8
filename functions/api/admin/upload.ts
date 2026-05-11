import { requireAdmin, corsHeaders, jsonResponse, AdminEnv } from '../../_shared/auth';

export const onRequestOptions: PagesFunction<AdminEnv> = async ({ request }) => {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
};

export const onRequestPost: PagesFunction<AdminEnv> = async (context) => {
  const { request, env } = context;
  const admin = await requireAdmin(request, env);
  if (!admin) return jsonResponse({ error: '未授权' }, 401, request);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) return jsonResponse({ error: '未找到文件' }, 400, request);

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return jsonResponse({ error: '仅支持 JPG/PNG/WebP/GIF 格式' }, 400, request);
    }

    // 限制文件大小 5MB
    if (file.size > 5 * 1024 * 1024) {
      return jsonResponse({ error: '文件大小不能超过 5MB' }, 400, request);
    }

    // 生成唯一文件名
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const key = `cms/${timestamp}-${random}.${ext}`;

    // 上传到 R2
    await env.R2.put(key, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    const publicUrl = `${env.R2_PUBLIC_URL}/${key}`;
    return jsonResponse({ url: publicUrl, key }, 200, request);
  } catch (e) {
    console.error('上传失败:', e);
    return jsonResponse({ error: '上传失败，请重试' }, 500, request);
  }
};
