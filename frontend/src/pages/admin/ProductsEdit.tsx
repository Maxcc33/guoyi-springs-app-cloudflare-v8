import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productsApi, ProductItem } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, AlertCircle, Plus, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const emptyForm = {
  name_zh: '', name_en: '',
  description_zh: '', description_en: '',
  specs_zh: [] as string[], specs_en: [] as string[],
  applications_zh: '', applications_en: '',
  image: '',
  material: 'all',
  published: 1,
  sort_order: 0,
};

const MATERIALS = [
  { value: 'all', label: '通用' },
  { value: '304', label: '304 不锈钢' },
  { value: '316', label: '316 不锈钢' },
  { value: '631', label: '631 不锈钢' },
  { value: '65mn', label: '65MN 弹簧钢' },
];

export default function ProductsEdit() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    productsApi.get(Number(id))
      .then((data: ProductItem) => {
        let specsZh: string[] = [];
        let specsEn: string[] = [];
        try { specsZh = JSON.parse(data.specs_zh || '[]'); } catch { specsZh = []; }
        try { specsEn = JSON.parse(data.specs_en || '[]'); } catch { specsEn = []; }
        setForm({
          name_zh: data.name_zh || '',
          name_en: data.name_en || '',
          description_zh: data.description_zh || '',
          description_en: data.description_en || '',
          specs_zh: specsZh,
          specs_en: specsEn,
          applications_zh: data.applications_zh || '',
          applications_en: data.applications_en || '',
          image: data.image || '',
          material: data.material || 'all',
          published: data.published ?? 1,
          sort_order: data.sort_order ?? 0,
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));

  const addSpec = (lang: 'zh' | 'en') => {
    const key = lang === 'zh' ? 'specs_zh' : 'specs_en';
    setForm(f => ({ ...f, [key]: [...f[key], ''] }));
  };

  const updateSpec = (lang: 'zh' | 'en', index: number, value: string) => {
    const key = lang === 'zh' ? 'specs_zh' : 'specs_en';
    setForm(f => {
      const arr = [...f[key]];
      arr[index] = value;
      return { ...f, [key]: arr };
    });
  };

  const removeSpec = (lang: 'zh' | 'en', index: number) => {
    const key = lang === 'zh' ? 'specs_zh' : 'specs_en';
    setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name_zh.trim()) { setError('请填写中文产品名称'); return; }
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        specs_zh: JSON.stringify(form.specs_zh.filter(Boolean)),
        specs_en: JSON.stringify(form.specs_en.filter(Boolean)),
      };
      if (isNew) {
        await productsApi.create(payload);
      } else {
        await productsApi.update(Number(id), payload);
      }
      navigate('/admin/products');
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
        <Link to="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> 返回列表
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-industrial-dark">{isNew ? '添加产品' : '编辑产品'}</h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>基本信息</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>中文名称 *</Label>
                <Input value={form.name_zh} onChange={e => set('name_zh', e.target.value)} placeholder="如：不锈钢压簧" required />
              </div>
              <div className="space-y-2">
                <Label>英文名称</Label>
                <Input value={form.name_en} onChange={e => set('name_en', e.target.value)} placeholder="e.g. Compression Springs" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>材质分类</Label>
              <select
                value={form.material}
                onChange={e => set('material', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              >
                {MATERIALS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>中文描述</Label>
                <Textarea value={form.description_zh} onChange={e => set('description_zh', e.target.value)} placeholder="产品简介" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>英文描述</Label>
                <Textarea value={form.description_en} onChange={e => set('description_en', e.target.value)} placeholder="Product description" rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>产品图片</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload value={form.image} onChange={url => set('image', url)} label="产品图片" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>产品规格</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>中文规格参数</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addSpec('zh')} className="gap-1">
                  <Plus className="w-3 h-3" /> 添加
                </Button>
              </div>
              <div className="space-y-2">
                {form.specs_zh.map((spec, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={spec} onChange={e => updateSpec('zh', i, e.target.value)} placeholder="如：线径范围: 0.2-8mm" />
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeSpec('zh', i)} className="text-red-400 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {form.specs_zh.length === 0 && (
                  <p className="text-sm text-secondary">暂无规格，点击"添加"按钮添加</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>英文规格参数</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addSpec('en')} className="gap-1">
                  <Plus className="w-3 h-3" /> 添加
                </Button>
              </div>
              <div className="space-y-2">
                {form.specs_en.map((spec, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={spec} onChange={e => updateSpec('en', i, e.target.value)} placeholder="e.g. Wire Diameter: 0.2-8mm" />
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeSpec('en', i)} className="text-red-400 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>应用领域</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>中文应用领域</Label>
                <Textarea value={form.applications_zh} onChange={e => set('applications_zh', e.target.value)} placeholder="如：机械设备、汽车配件、电子产品" rows={2} />
              </div>
              <div className="space-y-2">
                <Label>英文应用领域</Label>
                <Textarea value={form.applications_en} onChange={e => set('applications_en', e.target.value)} placeholder="e.g. Machinery, Auto Parts, Electronics" rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>发布设置</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>发布状态</Label>
                <p className="text-sm text-secondary">关闭则不在前台显示</p>
              </div>
              <Switch checked={form.published === 1} onCheckedChange={v => set('published', v ? 1 : 0)} />
            </div>
            <div className="space-y-2">
              <Label>排序权重</Label>
              <Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} className="w-40" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="bg-primary hover:bg-primary-hover gap-2" disabled={saving}>
            <Save className="w-4 h-4" /> {saving ? '保存中...' : '保存产品'}
          </Button>
          <Link to="/admin/products">
            <Button type="button" variant="outline">取消</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
