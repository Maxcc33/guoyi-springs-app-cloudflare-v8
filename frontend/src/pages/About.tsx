import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Factory, Users, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const milestones = [
    { year: '2004', event: t('公司成立,开始不锈钢弹簧生产', 'Company established, started stainless steel spring production') },
    { year: '2008', event: t('引进先进自动化生产设备', 'Introduced advanced automated production equipment') },
    { year: '2012', event: t('通过ISO9001质量管理体系认证', 'Obtained ISO9001 quality management certification') },
    { year: '2016', event: t('产能扩大,年产量突破5000万件', 'Capacity expanded, annual output exceeded 50 million pieces') },
    { year: '2020', event: t('建立质量检测中心', 'Established quality testing center') },
    { year: '2024', event: t('服务客户超过500家,产品远销海外', 'Serving over 500 customers, products exported overseas') },
  ];

  const strengths = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: t('现代化工厂', 'Modern Factory'),
      desc: t('5000平方米生产车间,配备先进的弹簧生产设备和检测仪器', '5000㎡ production workshop with advanced spring manufacturing and testing equipment'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('专业团队', 'Professional Team'),
      desc: t('50+专业技术人员,20年平均从业经验,提供专业技术支持', '50+ professional technicians with 20 years average experience, providing expert technical support'),
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('质量保证', 'Quality Assurance'),
      desc: t('ISO9001认证,严格的质量控制体系,盐雾测试100小时+', 'ISO9001 certified, strict quality control system, 100+ hours salt spray test'),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('持续创新', 'Continuous Innovation'),
      desc: t('不断引进新技术新设备,优化生产工艺,提升产品质量', 'Continuously introducing new technologies and equipment, optimizing production processes'),
    },
  ];

  const certifications = [
    { name: 'ISO 9001', desc: t('质量管理体系认证', 'Quality Management System') },
    { name: t('检测报告', 'Test Report'), desc: t('第三方权威检测', 'Third-party Testing') },
    { name: t('环保认证', 'Environmental Certification'), desc: t('绿色生产标准', 'Green Production Standards') },
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
              <h1 className="text-5xl font-bold mb-4">{t('关于我们', 'About Us')}</h1>
              <p className="text-xl text-white/90">
                {t('台州市路桥国益弹簧制造有限公司 - 20年专业不锈钢弹簧制造经验', 'Taizhou Guoyi Spring Manufacturing Co., Ltd. - 20 Years of Professional Experience')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-industrial-dark mb-4">{t('公司简介', 'Company Profile')}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                {t(
                  '台州市路桥国益弹簧制造有限公司成立于2004年,是一家专业从事不锈钢弹簧研发、生产和销售的现代化企业。公司位于浙江省台州市路桥区新桥镇镇西路225号,拥有5000平方米的现代化生产车间和完善的质量检测中心。',
                  'Taizhou Guoyi Spring Manufacturing Co., Ltd., established in 2004, is a modern enterprise specializing in R&D, production and sales of stainless steel springs. Located at No.225 Zhenxi Road, Xinqiao Town, Luqiao District, Taizhou City, Zhejiang Province, the company has a 5000㎡ modern production workshop and a complete quality testing center.'
                )}
              </p>
              <p className="text-lg mb-6">
                {t(
                  '公司主要生产304/316/631不锈钢压簧、拉簧、扭簧、卡簧及各类异形弹簧,同时提供65MN弹簧钢产品,线径范围0.2-8mm,产品广泛应用于机械制造、五金工具、汽车配件、医疗器械、家电等行业。凭借20年的制造经验和专业的技术团队,我们为国内外500多家企业提供优质的弹簧产品和解决方案。',
                  'The company mainly produces 304/316/631 stainless steel compression springs, extension springs, torsion springs, snap rings and various custom springs, as well as 65MN spring steel products with wire diameter ranging from 0.2-8mm. Products are widely used in machinery manufacturing, hardware tools, auto parts, medical devices, home appliances and other industries. With 20 years of manufacturing experience and professional technical team, we provide quality spring products and solutions to over 500 domestic and international enterprises.'
                )}
              </p>
              <p className="text-lg">
                {t(
                  '我们始终坚持"质量第一、客户至上"的经营理念,通过ISO9001质量管理体系认证,建立了严格的质量控制流程。所有产品均经过严格的盐雾测试(100小时+)和性能检测,确保产品质量稳定可靠。我们承诺3天快速打样,为客户提供及时、专业的技术支持和服务。',
                  'We always adhere to the business philosophy of "Quality First, Customer First", and have passed ISO9001 quality management system certification, establishing strict quality control procedures. All products undergo rigorous salt spray testing (100+ hours) and performance testing to ensure stable and reliable product quality. We promise 3-day quick sampling and provide timely, professional technical support and services to customers.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Strength */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-industrial-dark mb-4">{t('工厂实力', 'Factory Strength')}</h2>
            <p className="text-lg text-secondary">{t('专业设备 精密制造', 'Professional Equipment, Precision Manufacturing')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {strengths.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-none">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent text-white rounded-full mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-industrial-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png"
                alt={t('生产车间', 'Production Workshop')}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-lg">{t('生产车间', 'Production Workshop')}</h4>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png"
                alt={t('生产设备', 'Production Equipment')}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-lg">{t('生产设备', 'Production Equipment')}</h4>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/36fec825-a6f9-4300-b09d-09ffe15e87b9.png"
                alt={t('质量检测', 'Quality Testing')}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-lg">{t('质量检测', 'Quality Testing')}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-industrial-dark mb-4">{t('企业资质', 'Certifications')}</h2>
            <p className="text-lg text-secondary">{t('权威认证 品质保障', 'Authorized Certifications, Quality Assurance')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                <CardContent className="pt-8 pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-industrial-dark mb-2">{cert.name}</h3>
                  <p className="text-secondary">{cert.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-20 bg-gradient-to-br from-industrial-blue to-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t('发展历程', 'Development History')}</h2>
            <p className="text-lg text-white/90">{t('20年砥砺前行 铸就品质传奇', '20 Years of Excellence')}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Badge className="bg-white text-primary text-lg font-bold px-4 py-2 flex-shrink-0">
                    {milestone.year}
                  </Badge>
                  <p className="text-white text-lg pt-1">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}