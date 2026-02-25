import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function News() {
  const { t } = useLanguage();

  const newsItems = [
    {
      title: t('国益弹簧参加2024年上海国际工业博览会', 'Guoyi Spring Participated in 2024 Shanghai International Industry Fair'),
      date: '2024-11-15',
      category: t('展会活动', 'Exhibition'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png',
      summary: t(
        '我公司携最新研发的高精度不锈钢弹簧产品亮相上海工博会,吸引了众多国内外客户前来咨询洽谈,展会期间达成多项合作意向。',
        'Our company showcased the latest high-precision stainless steel spring products at Shanghai Industry Fair, attracting numerous domestic and international customers for consultation and negotiation, reaching multiple cooperation intentions during the exhibition.'
      ),
    },
    {
      title: t('新增自动化生产线投入使用 产能提升30%', 'New Automated Production Line Put into Use, Capacity Increased by 30%'),
      date: '2024-10-20',
      category: t('公司新闻', 'Company News'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png',
      summary: t(
        '为满足市场日益增长的需求,公司投资引进了两条全自动弹簧生产线,大幅提升了生产效率和产品质量,年产能突破6000万件。',
        'To meet the growing market demand, the company invested in two fully automated spring production lines, significantly improving production efficiency and product quality, with annual capacity exceeding 60 million pieces.'
      ),
    },
    {
      title: t('国益弹簧获得ISO9001质量管理体系认证', 'Guoyi Spring Obtained ISO9001 Quality Management System Certification'),
      date: '2024-09-10',
      category: t('企业荣誉', 'Company Honor'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/36fec825-a6f9-4300-b09d-09ffe15e87b9.png',
      summary: t(
        '经过严格的审核和评估,我公司顺利通过ISO9001质量管理体系认证,标志着公司质量管理水平达到国际标准,为客户提供更可靠的产品保障。',
        'After rigorous auditing and evaluation, our company successfully passed ISO9001 quality management system certification, marking that the company\'s quality management level has reached international standards, providing more reliable product assurance for customers.'
      ),
    },
    {
      title: t('不锈钢弹簧在医疗器械领域的应用案例分享', 'Application Cases of Stainless Steel Springs in Medical Device Field'),
      date: '2024-08-25',
      category: t('行业资讯', 'Industry News'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/d31cc2d7-7d1d-45cb-afcc-16807cfc5305.png',
      summary: t(
        '本文详细介绍了304/316不锈钢弹簧在医疗器械中的应用,包括手术器械、注射器、医疗床等,分析了不锈钢弹簧在医疗领域的优势和技术要求。',
        'This article introduces in detail the application of 304/316 stainless steel springs in medical devices, including surgical instruments, syringes, medical beds, etc., analyzing the advantages and technical requirements of stainless steel springs in the medical field.'
      ),
    },
    {
      title: t('如何选择合适的不锈钢弹簧材质?', 'How to Choose the Right Stainless Steel Spring Material?'),
      date: '2024-07-15',
      category: t('技术文章', 'Technical Article'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/41516a01-fcc0-4c7e-8ea4-cfe7d4c49652.png',
      summary: t(
        '304和316不锈钢是最常用的弹簧材质,本文从耐腐蚀性、机械性能、成本等方面对比分析,帮助客户根据使用环境选择最合适的材质。',
        '304 and 316 stainless steel are the most commonly used spring materials. This article compares and analyzes from the aspects of corrosion resistance, mechanical properties, and cost to help customers choose the most suitable material according to the usage environment.'
      ),
    },
    {
      title: t('国益弹簧成功交付大型汽车配件订单', 'Guoyi Spring Successfully Delivered Large Auto Parts Order'),
      date: '2024-06-30',
      category: t('客户案例', 'Customer Case'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/48d7dcab-6f1e-4e70-b52c-218ee13cb2cc.png',
      summary: t(
        '我公司为某知名汽车零部件企业定制生产的100万件高强度压簧顺利交付,产品质量获得客户高度认可,为后续长期合作奠定了良好基础。',
        'Our company successfully delivered 1 million high-strength compression springs customized for a well-known auto parts company. The product quality was highly recognized by the customer, laying a good foundation for long-term cooperation.'
      ),
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none group"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{news.category}</Badge>
                    <div className="flex items-center text-sm text-secondary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {news.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-industrial-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-secondary mb-4 line-clamp-3">{news.summary}</p>
                  <button className="flex items-center text-primary hover:text-primary-hover font-medium text-sm group">
                    {t('阅读更多', 'Read More')}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}