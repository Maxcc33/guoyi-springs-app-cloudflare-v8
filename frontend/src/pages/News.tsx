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

export default function News() {
  const { language, t } = useLanguage();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${apiBase}/api/cms/news?limit=50`)
      .then(r => r.json())
      .then(data => setNewsList(data.list || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

      {/* News List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : newsList.length === 0 ? (
            <p className="text-center text-secondary py-20">{t('暂无新闻', 'No news yet')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsList.map((news) => {
                const title = language === 'zh' ? news.title_zh : (news.title_en || news.title_zh);
                const category = language === 'zh' ? news.category_zh : (news.category_en || news.category_zh);
                const summary = language === 'zh' ? news.summary_zh : (news.summary_en || news.summary_zh);
                const date = news.created_at?.slice(0, 10) || '';

                return (
                  <Card
                    key={news.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none group"
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
                        <Badge variant="secondary">{category}</Badge>
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
