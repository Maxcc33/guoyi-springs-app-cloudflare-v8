// 后台 API 工具函数

const getApiBase = () => import.meta.env.VITE_API_BASE_URL || '';

export function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_username');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${getApiBase()}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearToken();
    window.location.href = '/admin/login';
    throw new Error('未授权');
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data as T;
}

// 登录
export async function login(username: string, password: string) {
  const data = await request<{ token: string; username: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  localStorage.setItem('admin_username', data.username);
  return data;
}

// 图片上传
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const data = await request<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });
  return data.url;
}

// 新闻 API
export const newsApi = {
  list: (page = 1, limit = 20) =>
    request<{ list: NewsItem[]; total: number }>(`/api/cms/news?page=${page}&limit=${limit}`),
  get: (id: number) => request<NewsItem>(`/api/cms/news/${id}`),
  create: (data: Partial<NewsItem>) => request('/api/cms/news', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<NewsItem>) => request(`/api/cms/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request(`/api/cms/news/${id}`, { method: 'DELETE' }),
};

// 产品 API
export const productsApi = {
  list: () => request<{ list: ProductItem[] }>('/api/cms/products'),
  get: (id: number) => request<ProductItem>(`/api/cms/products/${id}`),
  create: (data: Partial<ProductItem>) => request('/api/cms/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<ProductItem>) => request(`/api/cms/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request(`/api/cms/products/${id}`, { method: 'DELETE' }),
};

// 轮播图 API
export const bannersApi = {
  list: () => request<{ list: BannerItem[] }>('/api/cms/banners'),
  create: (data: Partial<BannerItem>) => request('/api/cms/banners', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<BannerItem>) => request(`/api/cms/banners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request(`/api/cms/banners/${id}`, { method: 'DELETE' }),
};

// 修改密码
export const changePassword = (oldPassword: string, newPassword: string) =>
  request('/api/admin/password', { method: 'PUT', body: JSON.stringify({ oldPassword, newPassword }) });

// 类型定义
export interface NewsItem {
  id: number;
  title_zh: string;
  title_en: string;
  category_zh: string;
  category_en: string;
  summary_zh: string;
  summary_en: string;
  content_zh: string;
  content_en: string;
  image: string;
  published: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductItem {
  id: number;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  specs_zh: string;
  specs_en: string;
  applications_zh: string;
  applications_en: string;
  image: string;
  material: string;
  published: number;
  sort_order: number;
}

export interface BannerItem {
  id: number;
  title_zh: string;
  title_en: string;
  subtitle_zh: string;
  subtitle_en: string;
  image: string;
  link: string;
  published: number;
  sort_order: number;
}
