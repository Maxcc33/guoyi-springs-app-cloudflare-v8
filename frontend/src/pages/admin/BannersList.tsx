import { useState, useEffect } from 'react';
import { bannersApi, BannerItem } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, AlertCircle, Eye, EyeOff } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const emptyBanner = {
  title_zh: '', title_en: '',
  subtitle_zh: '', subtitle_en: '',
  image: '', link: '/contact',
  published: 1, sort_order: 0,
};

export default function BannersList() {
  const [list, setList] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyBanner);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await bannersApi.list();
      setList(data.list);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));

  const handleEdit = (item: BannerItem) => {
    setForm({
      title_zh: item.title_zh || '',
      title_en: item.title_en || '',
      subtitle_zh: item.subtitle_zh || '',
      subtitle_en: item.subtitle_en || '',
      image: item.image || '',
      link: item.link || '/contact',
      published: item.published ?? 1,
      sort_order: item.sort_order ?? 0,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleNew = () => {
    setForm(emptyBanner);
    setEditingId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyBanner);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) { setError('请上传轮播图图片'); return; }
    setError('');
    setSaving(true);
    try {
      if (editingId) {
        await bannersApi.update(editingId, form);
      } else {
        await bannersApi.create(form);
      }
      handleCancel();
      fetchList();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这张轮播图吗？')) return;
    try {
      await bannersApi.delete(id);
      fetchList();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '删除失败');
    }
  };

  const handleToggle = async (item: BannerItem) => {
    try {
      await bannersApi.update(item.id, { published: item.published ? 0 : 1 });
      fetchList();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '操作失败');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-industrial-dark">轮播图管理</h1>
          <p className="text-secondary mt-1">管理首页轮播图，共 {list.length} 张</p>
        </div>
        {!showForm && (
          <Button onClick={handleNew} className="bg-primary hover:bg-primary-hover gap-2">
            <Plus className="w-4 h-4" /> 添加轮播图
          </Button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {/* 编辑表单 */}
      {showForm && (
        <Card className="border-2 border-primary/20 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>{editingId ? '编辑轮播图' : '添加轮播图'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>轮播图图片 *</Label>
                <ImageUpload value={form.image} onChange={url => set('image', url)} label="轮播图" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>中文标题</Label>
                  <Input value={form.title_zh} onChange={e => set('title_zh', e.target.value)} placeholder="如：20年专业制造经验" />
                </div>
                <div className="space-y-2">
                  <Label>英文标题</Label>
                  <Input value={form.title_en} onChange={e => set('title_en', e.target.value)} placeholder="e.g. 20 Years of Experience" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>中文副标题</Label>
                  <Input value={form.subtitle_zh} onChange={e => set('subtitle_zh', e.target.value)} placeholder="副标题文字" />
                </div>
                <div className="space-y-2">
                  <Label>英文副标题</Label>
                  <Input value={form.subtitle_en} onChange={e => set('subtitle_en', e.target.value)} placeholder="Subtitle in English" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>点击跳转链接</Label>
                  <Input value={form.link} onChange={e => set('link', e.target.value)} placeholder="/contact 或 /products" />
                </div>
                <div className="space-y-2">
                  <Label>排序权重</Label>
                  <Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} className="w-32" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.published === 1} onCheckedChange={v => set('published', v ? 1 : 0)} />
                <Label>立即发布</Label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="bg-primary hover:bg-primary-hover gap-2" disabled={saving}>
                  <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>取消</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* 列表 */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary mb-4">暂无轮播图</p>
          <Button onClick={handleNew} className="bg-primary hover:bg-primary-hover gap-2">
            <Plus className="w-4 h-4" /> 添加第一张轮播图
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((item) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.title_zh} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">无图片</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.published ? '已发布' : '已隐藏'}
                    </span>
                    <span className="text-xs text-secondary">排序: {item.sort_order}</span>
                  </div>
                  <p className="font-medium text-industrial-dark">{item.title_zh || '（无标题）'}</p>
                  {item.subtitle_zh && <p className="text-sm text-secondary truncate">{item.subtitle_zh}</p>}
                  {item.link && <p className="text-xs text-primary mt-1">链接: {item.link}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => handleToggle(item)} className="text-gray-500 hover:text-primary">
                    {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>编辑</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
