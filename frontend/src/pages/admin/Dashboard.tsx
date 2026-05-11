import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsApi, productsApi, bannersApi } from '@/lib/adminApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, Package, Image, MessageSquare, Plus, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ news: 0, products: 0, banners: 0 });
  const [recentNews, setRecentNews] = useState<{ id: number; title_zh: string; created_at: string; published: number }[]>([]);

  useEffect(() => {
    Promise.all([
      newsApi.list(1, 5),
      productsApi.list(),
      bannersApi.list(),
    ]).then(([newsData, productsData, bannersData]) => {
      setStats({
        news: newsData.total,
        products: productsData.list.length,
        banners: bannersData.list.length,
      });
      setRecentNews(newsData.list.slice(0, 5) as { id: number; title_zh: string; created_at: string; published: number }[]);
    }).catch(console.error);
  }, []);

  const statCards = [
    { title: '新闻文章', value: stats.news, icon: Newspaper, color: 'from-blue-500 to-blue-600', link: '/admin/news' },
    { title: '产品展示', value: stats.products, icon: Package, color: 'from-green-500 to-green-600', link: '/admin/products' },
    { title: '首页轮播图', value: stats.banners, icon: Image, color: 'from-purple-500 to-purple-600', link: '/admin/banners' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-industrial-dark">仪表盘</h1>
        <p className="text-secondary mt-1">欢迎回来，这里是您的网站内容概览</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <Link key={card.title} to={card.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary mb-1">{card.title}</p>
                    <p className="text-4xl font-bold text-industrial-dark">{card.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                    <card.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-lg">快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/news/new">
              <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4" /> 发布新文章
              </Button>
            </Link>
            <Link to="/admin/products/new">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4" /> 添加新产品
              </Button>
            </Link>
            <Link to="/admin/banners/new">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4" /> 添加轮播图
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">最近文章</CardTitle>
            <Link to="/admin/news" className="text-sm text-primary hover:underline flex items-center gap-1">
              查看全部 <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentNews.length === 0 ? (
              <p className="text-secondary text-sm text-center py-4">暂无文章</p>
            ) : (
              <div className="space-y-3">
                {recentNews.map((news) => (
                  <div key={news.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-industrial-dark truncate">{news.title_zh}</p>
                      <p className="text-xs text-secondary">{news.created_at?.slice(0, 10)}</p>
                    </div>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${news.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {news.published ? '已发布' : '草稿'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
