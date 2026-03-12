import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { newsData } from '@/data/news';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const news = newsData.find((item) => item.id === id);

  if (!news) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-industrial-dark mb-4">
            {t('文章未找到', 'Article Not Found')}
          </h1>
          <p className="text-secondary mb-8">
            {t('抱歉，您访问的文章不存在或已被删除。', 'Sorry, the article you are looking for does not exist or has been deleted.')}
          </p>
          <Link to="/news">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('返回新闻列表', 'Back to News')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'zh' ? news.title.zh : news.title.en;
  const category = language === 'zh' ? news.category.zh : news.category.en;
  const content = language === 'zh' ? news.content.zh : news.content.en;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-industrial-blue to-accent">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${news.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl text-white animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-none">
                  {category}
                </Badge>
                <div className="flex items-center text-sm text-white/80">
                  <Calendar className="w-4 h-4 mr-1" />
                  {news.date}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/news" className="inline-flex items-center text-primary hover:text-primary-hover mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('返回新闻列表', 'Back to News')}
            </Link>

            {/* Featured Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-10 shadow-lg">
              <img
                src={news.image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              {content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-secondary">
                  <Share2 className="w-5 h-5" />
                  <span>{t('分享这篇文章', 'Share this article')}</span>
                </div>
                <Link to="/news">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('返回新闻列表', 'Back to News')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-industrial-dark mb-8">
                {t('相关文章', 'Related Articles')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsData
                  .filter((item) => item.id !== id)
                  .slice(0, 2)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={language === 'zh' ? item.title.zh : item.title.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-industrial-dark group-hover:text-primary transition-colors line-clamp-2">
                          {language === 'zh' ? item.title.zh : item.title.en}
                        </h3>
                        <p className="text-sm text-secondary mt-2">{item.date}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}