import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface NewsItem {
  id: number;
  title_zh: string;
  title_en: string;
  category_zh: string;
  category_en: string;
  summary_zh: string;
  summary_en: string;
  image: string;
  created_at: string;
}

// 固定的3个分类，按展示顺序排列
const CATEGORIES = [
  { zh: '全部', en: 'All', value: 'all' },
  { zh: '技术文章', en: 'Technical Article', value: '技术文章' },
  { zh: '公司动态', en: 'Company News', value: '公司动态' },
  { zh: '客户案例', en: 'Customer Case', value: '客户案例' },
];

export default function News() {
  const { language, t } = useLanguage();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${apiBase}/api/cms/news?limit=100`)
      .then(r => r.json())
      .then(data => setNewsList(data.list || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 按分类筛选
  const filteredNews = activeCategory === 'all'
    ? newsList
    : newsList.filter(n => n.category_zh === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-industrial-blue to-accent">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png)' }}
        />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white animate-fade-in">
              <h1 className="text-5xl font-bold mb-4">{t('新闻动态', 'News')}</h1>
              <p className="text-xl text-white/90">
                {t('了解国益弹簧最新动态和行业资讯', 'Stay Updated with Guoyi Spring News and Industry Information')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {CATEGORIES.map(cat => {
              const label = language === 'zh' ? cat.zh : cat.en;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {label}
                  {cat.value !== 'all' && (
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {newsList.filter(n => n.category_zh === cat.value).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary text-lg">{t('该分类暂无文章', 'No articles in this category')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => {
                const title = language === 'zh' ? news.title_zh : (news.title_en || news.title_zh);
                const category = language === 'zh' ? news.category_zh : (news.category_en || news.category_zh);
                const summary = language === 'zh' ? news.summary_zh : (news.summary_en || news.summary_zh);
                const date = news.created_at?.slice(0, 10) || '';

                // 分类对应颜色
                const categoryColor =
                  news.category_zh === '技术文章' ? 'bg-blue-100 text-blue-700' :
                  news.category_zh === '公司动态' ? 'bg-green-100 text-green-700' :
                  news.category_zh === '客户案例' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-600';

                return (
                  <Card
                    key={news.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none group bg-white"
                  >
                    <Link to={`/news/${news.id}`}>
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        {news.image ? (
                          <img
                            src={news.image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">{t('暂无图片', 'No Image')}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColor}`}>
                          {category}
                        </span>
                        <div className="flex items-center text-sm text-secondary">
                          <Calendar className="w-4 h-4 mr-1" />
                          {date}
                        </div>
                      </div>
                      <Link to={`/news/${news.id}`}>
                        <h3 className="text-xl font-semibold text-industrial-dark mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                          {title}
                        </h3>
                      </Link>
                      <p className="text-sm text-secondary mb-4 line-clamp-3">{summary}</p>
                      <Link
                        to={`/news/${news.id}`}
                        className="flex items-center text-primary hover:text-primary-hover font-medium text-sm group"
                      >
                        {t('阅读更多', 'Read More')}
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
