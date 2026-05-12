import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { newsApi, NewsItem } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

// 固定的3个分类（不允许手动输入）
const NEWS_CATEGORIES = [
  { zh: '技术文章', en: 'Technical Article' },
  { zh: '公司动态', en: 'Company News' },
  { zh: '客户案例', en: 'Customer Case' },
];

const emptyForm = {
  title_zh: '', title_en: '',
  category_zh: '技术文章', category_en: 'Technical Article',
  summary_zh: '', summary_en: '',
  content_zh: '', content_en: '',
  image: '',
  published: 1,
  sort_order: 0,
};

export default function NewsEdit() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    newsApi.get(Number(id))
      .then((data: NewsItem) => {
        setForm({
          title_zh: data.title_zh || '',
          title_en: data.title_en || '',
          category_zh: data.category_zh || '',
          category_en: data.category_en || '',
          summary_zh: data.summary_zh || '',
          summary_en: data.summary_en || '',
          content_zh: Array.isArray(JSON.parse(data.content_zh || '[]'))
            ? JSON.parse(data.content_zh || '[]').join('\n\n')
            : data.content_zh || '',
          content_en: (() => {
            try {
              const p = JSON.parse(data.content_en || '[]');
              return Array.isArray(p) ? p.join('\n\n') : data.content_en || '';
            } catch { return data.content_en || ''; }
          })(),
          image: data.image || '',
          published: data.published ?? 1,
          sort_order: data.sort_order ?? 0,
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (key: string, value: string | number) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title_zh.trim()) { setError('请填写中文标题'); return; }
    setError('');
    setSaving(true);
    try {
      // 将正文按段落分割存储为 JSON 数组
      const payload = {
        ...form,
        content_zh: JSON.stringify(form.content_zh.split('\n\n').filter(Boolean)),
        content_en: form.content_en ? JSON.stringify(form.content_en.split('\n\n').filter(Boolean)) : '',
      };
      if (isNew) {
        await newsApi.create(payload);
      } else {
        await newsApi.update(Number(id), payload);
      }
      navigate('/admin/news');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/news">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> 返回列表
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-industrial-dark">{isNew ? '发布新文章' : '编辑文章'}</h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>基本信息</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>中文标题 *</Label>
                <Input value={form.title_zh} onChange={e => set('title_zh', e.target.value)} placeholder="请输入中文标题" required />
              </div>
              <div className="space-y-2">
                <Label>英文标题</Label>
                <Input value={form.title_en} onChange={e => set('title_en', e.target.value)} placeholder="English title (optional)" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>文章分类 *</Label>
              <select
                value={form.category_zh}
                onChange={e => {
                  const cat = NEWS_CATEGORIES.find(c => c.zh === e.target.value);
                  if (cat) {
                    set('category_zh', cat.zh);
                    set('category_en', cat.en);
                  }
                }}
                className="w-full md:w-64 h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {NEWS_CATEGORIES.map(cat => (
                  <option key={cat.zh} value={cat.zh}>{cat.zh} / {cat.en}</option>
                ))}
              </select>
              <p className="text-xs text-secondary">当前英文分类：{form.category_en}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>中文摘要</Label>
                <Textarea value={form.summary_zh} onChange={e => set('summary_zh', e.target.value)} placeholder="简短描述，显示在列表页" rows={2} />
              </div>
              <div className="space-y-2">
                <Label>英文摘要</Label>
                <Textarea value={form.summary_en} onChange={e => set('summary_en', e.target.value)} placeholder="Short description in English" rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 封面图片 */}
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>封面图片</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload value={form.image} onChange={url => set('image', url)} label="封面图片" />
          </CardContent>
        </Card>

        {/* 正文内容 */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>正文内容</CardTitle>
            <p className="text-sm text-secondary">用空行（回车两次）分隔段落</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>中文正文 *</Label>
              <Textarea
                value={form.content_zh}
                onChange={e => set('content_zh', e.target.value)}
                placeholder="请输入文章正文内容，用空行分隔段落..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>英文正文</Label>
              <Textarea
                value={form.content_en}
                onChange={e => set('content_en', e.target.value)}
                placeholder="English content (optional)..."
                rows={8}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* 发布设置 */}
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>发布设置</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>发布状态</Label>
                <p className="text-sm text-secondary">关闭则保存为草稿，不在前台显示</p>
              </div>
              <Switch
                checked={form.published === 1}
                onCheckedChange={v => set('published', v ? 1 : 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>排序权重</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={e => set('sort_order', Number(e.target.value))}
                placeholder="数字越大越靠前，默认 0"
                className="w-40"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="bg-primary hover:bg-primary-hover gap-2" disabled={saving}>
            <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存文章'}
          </Button>
          <Link to="/admin/news">
            <Button type="button" variant="outline">取消</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
