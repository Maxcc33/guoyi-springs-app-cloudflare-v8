import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsApi, NewsItem } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function NewsList() {
  const [list, setList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 15;

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await newsApi.list(page, limit);
      setList(data.list);
      setTotal(data.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, [page]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`确定要删除「${title}」吗？此操作不可撤销。`)) return;
    try {
      await newsApi.delete(id);
      fetchList();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '删除失败');
    }
  };

  const handleTogglePublish = async (item: NewsItem) => {
    try {
      await newsApi.update(item.id, { published: item.published ? 0 : 1 });
      fetchList();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '操作失败');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-industrial-dark">新闻管理</h1>
          <p className="text-secondary mt-1">共 {total} 篇文章</p>
        </div>
        <Link to="/admin/news/new">
          <Button className="bg-primary hover:bg-primary-hover gap-2">
            <Plus className="w-4 h-4" /> 发布新文章
          </Button>
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary mb-4">暂无文章</p>
              <Link to="/admin/news/new">
                <Button className="bg-primary hover:bg-primary-hover gap-2">
                  <Plus className="w-4 h-4" /> 发布第一篇文章
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {list.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  {item.image && (
                    <img src={item.image} alt={item.title_zh} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.published ? '已发布' : '草稿'}
                      </span>
                      {item.category_zh && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{item.category_zh}</span>
                      )}
                    </div>
                    <p className="font-medium text-industrial-dark truncate">{item.title_zh}</p>
                    {item.summary_zh && (
                      <p className="text-sm text-secondary truncate mt-0.5">{item.summary_zh}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{item.created_at?.slice(0, 10)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublish(item)}
                      title={item.published ? '设为草稿' : '发布'}
                      className="text-gray-500 hover:text-primary"
                    >
                      {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Link to={`/admin/news/${item.id}`}>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.title_zh)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>上一页</Button>
          <span className="flex items-center px-4 text-sm text-secondary">{page} / {totalPages}</span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>下一页</Button>
        </div>
      )}
    </div>
  );
}
