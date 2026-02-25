import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, Shield, Zap, DollarSign, Award, 
  ChevronLeft, ChevronRight, ArrowRight,
  Factory, Wrench, Car, Stethoscope, Home
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function Index() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png',
      title: t('20年专业制造经验', '20 Years of Professional Manufacturing'),
      subtitle: t('值得信赖的不锈钢弹簧供应商', 'Trusted Stainless Steel Spring Supplier'),
    },
    {
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/b311dc80-f618-4905-b8e2-236af21b0f0f.png',
      title: t('304/316不锈钢材质', '304/316 Stainless Steel Material'),
      subtitle: t('高品质材料 确保产品耐用性', 'High-Quality Materials Ensure Durability'),
    },
    {
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png',
      title: t('先进生产设备', 'Advanced Production Equipment'),
      subtitle: t('精密制造 品质保证', 'Precision Manufacturing, Quality Assurance'),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: t('20年专业制造', '20 Years Experience'),
      desc: t('丰富的行业经验', 'Rich Industry Experience'),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('304/316不锈钢', '304/316 Stainless Steel'),
      desc: t('优质材料保证', 'Quality Material Guarantee'),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('3天快速打样', '3-Day Quick Sampling'),
      desc: t('快速响应需求', 'Fast Response'),
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('盐雾测试1000小时+', '1000+ Hours Salt Spray Test'),
      desc: t('严格质量检测', 'Strict Quality Testing'),
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: t('工厂直供', 'Factory Direct Supply'),
      desc: t('价格优势明显', 'Competitive Pricing'),
    },
  ];

  const products = [
    {
      name: t('不锈钢压簧', 'Compression Springs'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/d31cc2d7-7d1d-45cb-afcc-16807cfc5305.png',
      specs: t('线径: 0.2-12mm | 材质: 304/316', 'Wire Dia: 0.2-12mm | Material: 304/316'),
    },
    {
      name: t('不锈钢拉簧', 'Extension Springs'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/41516a01-fcc0-4c7e-8ea4-cfe7d4c49652.png',
      specs: t('线径: 0.2-12mm | 材质: 304/316', 'Wire Dia: 0.2-12mm | Material: 304/316'),
    },
    {
      name: t('不锈钢扭簧', 'Torsion Springs'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/48d7dcab-6f1e-4e70-b52c-218ee13cb2cc.png',
      specs: t('线径: 0.2-12mm | 材质: 304/316', 'Wire Dia: 0.2-12mm | Material: 304/316'),
    },
    {
      name: t('不锈钢卡簧', 'Snap Rings'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/25a2d293-822a-4a81-bf5e-8fe489b7e0dd.png',
      specs: t('线径: 0.2-12mm | 材质: 304/316', 'Wire Dia: 0.2-12mm | Material: 304/316'),
    },
  ];

  const industries = [
    { icon: <Factory className="w-10 h-10" />, name: t('机械制造', 'Machinery') },
    { icon: <Wrench className="w-10 h-10" />, name: t('五金工具', 'Hardware Tools') },
    { icon: <Car className="w-10 h-10" />, name: t('汽车配件', 'Auto Parts') },
    { icon: <Stethoscope className="w-10 h-10" />, name: t('医疗器械', 'Medical Devices') },
    { icon: <Home className="w-10 h-10" />, name: t('家电行业', 'Home Appliances') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
            </div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white animate-fade-in">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact">
                      <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
                        {t('立即咨询', 'Contact Now')}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/products">
                      <Button size="lg" variant="outline" className="!bg-white/10 !text-white border-white hover:!bg-white/20">
                        {t('查看产品', 'View Products')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-industrial-dark mb-4">
              {t('核心优势', 'Core Advantages')}
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              {t('专业品质 值得信赖', 'Professional Quality, Trustworthy Partner')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent text-white rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-industrial-dark mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-industrial-dark mb-4">
              {t('热门产品', 'Featured Products')}
            </h2>
            <p className="text-lg text-secondary">
              {t('304/316不锈钢弹簧 线径0.2-12mm', '304/316 Stainless Steel Springs, Wire Diameter 0.2-12mm')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-industrial-dark mb-2">{product.name}</h3>
                  <p className="text-sm text-secondary mb-4">{product.specs}</p>
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      {t('查看详情', 'View Details')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary-hover">
                {t('查看全部产品', 'View All Products')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-br from-industrial-blue to-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('服务行业', 'Industries We Serve')}
            </h2>
            <p className="text-lg text-white/90">
              {t('为多个行业提供专业的弹簧解决方案', 'Professional Spring Solutions for Multiple Industries')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center text-white mb-3">
                  {industry.icon}
                </div>
                <p className="text-white font-medium">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-industrial-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('需要定制弹簧?', 'Need Custom Springs?')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('3天快速打样 专业技术团队为您提供一对一服务', '3-Day Quick Sampling, Professional Team Provides One-on-One Service')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                {t('免费打样', 'Free Sampling')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="!bg-white/10 !text-white border-white hover:!bg-white/20">
                {t('在线咨询', 'Online Inquiry')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}