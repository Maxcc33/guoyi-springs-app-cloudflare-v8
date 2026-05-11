import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsApi, ProductItem } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function ProductsList() {
  const [list, setList] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await productsApi.list();
      setList(data.list);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`确定要删除产品「${name}」吗？`)) return;
    try {
      await productsApi.delete(id);
      fetchList();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '删除失败');
    }
  };

  const handleToggle = async (item: ProductItem) => {
    try {
      await productsApi.update(item.id, { published: item.published ? 0 : 1 });
      fetchList();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '操作失败');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-industrial-dark">产品管理</h1>
          <p className="text-secondary mt-1">共 {list.length} 个产品</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="bg-primary hover:bg-primary-hover gap-2">
            <Plus className="w-4 h-4" /> 添加产品
          </Button>
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary mb-4">暂无产品</p>
          <Link to="/admin/products/new">
            <Button className="bg-primary hover:bg-primary-hover gap-2">
              <Plus className="w-4 h-4" /> 添加第一个产品
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name_zh} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">暂无图片</div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-industrial-dark truncate">{item.name_zh}</p>
                    {item.name_en && <p className="text-sm text-secondary truncate">{item.name_en}</p>}
                  </div>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.published ? '已发布' : '草稿'}
                  </span>
                </div>
                {item.material && (
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{item.material}</span>
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggle(item)}
                    className="text-gray-500 hover:text-primary"
                  >
                    {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Link to={`/admin/products/${item.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Edit className="w-3 h-3" /> 编辑
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id, item.name_zh)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
