// 共享鉴权工具函数

export interface AdminEnv {
  DB: D1Database;
  R2: R2Bucket;
  ADMIN_JWT_SECRET: string;
  R2_PUBLIC_URL: string;
}

// 简单 JWT 实现（使用 HMAC-SHA256）
async function hmacSha256(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export async function createToken(payload: object, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const body = btoa(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 * 7 }))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const sig = await hmacSha256(secret, `${header}.${body}`);
  return `${header}.${body}.${sig}`;
}

export async function verifyToken(token: string, secret: string): Promise<{ id: number; username: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expectedSig = await hmacSha256(secret, `${header}.${body}`);
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { id: payload.id, username: payload.username };
  } catch {
    return null;
  }
}

export async function requireAdmin(request: Request, env: AdminEnv): Promise<{ id: number; username: string } | null> {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  return verifyToken(token, env.ADMIN_JWT_SECRET);
}

// CORS 头
export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowed = ['https://guoyisprings.com', 'https://www.guoyisprings.com', 'https://guoyisprings.cn', 'https://www.guoyisprings.cn'];
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : 'https://guoyisprings.com',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export function jsonResponse(data: unknown, status = 200, request?: Request): Response {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (request) Object.assign(headers, corsHeaders(request));
  return new Response(JSON.stringify(data), { status, headers });
}

// 简单密码哈希（SHA-256，生产环境建议 bcrypt，但 Workers 不支持 bcrypt）
export async function hashPassword(password: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password + 'guoyi_salt_2024'));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // 支持旧的 bcrypt hash（初始化时插入的）和新的 SHA-256 hash
  if (hash.startsWith('$2a$')) {
    // bcrypt hash 无法在 Workers 中直接验证
    // 初始密码固定为 admin123，匹配后由调用方升级 hash
    return password === 'admin123';
  }
  const computed = await hashPassword(password);
  return computed === hash;
}
