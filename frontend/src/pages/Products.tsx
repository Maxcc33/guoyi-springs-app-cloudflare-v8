import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';

interface Product {
  id: number;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  specs_zh: string;
  specs_en: string;
  applications_zh: string;
  applications_en: string;
  image: string;
  material: string;
}

export default function Products() {
  const { language, t } = useLanguage();
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const materials = [
    { value: 'all', label: t('全部材质', 'All Materials') },
    { value: '304', label: '304' },
    { value: '316', label: '316' },
    { value: '631', label: '631' },
    { value: '65mn', label: t('65MN弹簧钢', '65MN Spring Steel') },
  ];

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${apiBase}/api/cms/products`)
      .then(r => r.json())
      .then(data => setProducts(data.list || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = selectedMaterial === 'all'
    ? products
    : products.filter(p => p.material === selectedMaterial || p.material === 'all');

  const parseSpecs = (specsStr: string): string[] => {
    try {
      const parsed = JSON.parse(specsStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return specsStr ? specsStr.split(',').map(s => s.trim()) : [];
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-industrial-blue to-accent">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/CompressionSprings.jpg)' }}
        />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white animate-fade-in">
              <h1 className="text-5xl font-bold mb-4">{t('产品中心', 'Products')}</h1>
              <p className="text-xl text-white/90">
                {t('304/316/631不锈钢 + 65MN弹簧钢 | 线径0.2-8mm | 3天快速打样', '304/316/631 Stainless Steel + 65MN Spring Steel | Wire Dia. 0.2-8mm | 3-Day Quick Sampling')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Material Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-industrial-dark">{t('材质筛选:', 'Filter by Material:')}</span>
            <div className="flex flex-wrap gap-2">
              {materials.map((material) => (
                <Button
                  key={material.value}
                  variant={selectedMaterial === material.value ? 'default' : 'outline'}
                  onClick={() => setSelectedMaterial(material.value)}
                  className={selectedMaterial === material.value ? 'bg-primary' : ''}
                >
                  {material.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-secondary py-20">{t('暂无产品', 'No products yet')}</p>
          ) : (
            <Tabs defaultValue={String(filteredProducts[0]?.id)} className="w-full">
              <TabsList className={`grid w-full mb-12 ${filteredProducts.length <= 2 ? 'grid-cols-2' : filteredProducts.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
                {filteredProducts.map((product) => (
                  <TabsTrigger key={product.id} value={String(product.id)}>
                    {language === 'zh' ? product.name_zh : (product.name_en || product.name_zh)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {filteredProducts.map((product) => {
                const name = language === 'zh' ? product.name_zh : (product.name_en || product.name_zh);
                const description = language === 'zh' ? product.description_zh : (product.description_en || product.description_zh);
                const specs = parseSpecs(language === 'zh' ? product.specs_zh : (product.specs_en || product.specs_zh));
                const applications = language === 'zh' ? product.applications_zh : (product.applications_en || product.applications_zh);

                return (
                  <TabsContent key={product.id} value={String(product.id)}>
                    <Card className="overflow-hidden border-none shadow-lg">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="relative h-[400px]">
                          {product.image ? (
                            <img src={product.image} alt={name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="text-gray-400">{t('暂无图片', 'No Image')}</span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-white text-lg px-4 py-2">{name}</Badge>
                          </div>
                        </div>

                        <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                          <h2 className="text-3xl font-bold text-industrial-dark mb-4">{name}</h2>
                          <p className="text-lg text-secondary mb-6">{description}</p>

                          <div className="space-y-6">
                            {specs.length > 0 && (
                              <div>
                                <h3 className="text-xl font-semibold text-industrial-dark mb-3">
                                  {t('产品规格', 'Specifications')}
                                </h3>
                                <ul className="space-y-2">
                                  {specs.map((spec, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                      <span className="text-secondary">{spec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {applications && (
                              <div>
                                <h3 className="text-xl font-semibold text-industrial-dark mb-3">
                                  {t('应用领域', 'Applications')}
                                </h3>
                                <p className="text-secondary">{applications}</p>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-4 pt-4">
                              <Link to="/contact">
                                <Button size="lg" className="bg-primary hover:bg-primary-hover">
                                  {t('立即咨询', 'Contact Now')}
                                </Button>
                              </Link>
                              <Link to="/contact">
                                <Button size="lg" variant="outline">
                                  {t('索取样品', 'Request Sample')}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-industrial-dark mb-4">
              {t('技术优势', 'Technical Advantages')}
            </h2>
            <p className="text-lg text-secondary">
              {t('专业制造 品质保证', 'Professional Manufacturing, Quality Assurance')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('精密加工', 'Precision Processing'), desc: t('±0.02mm公差控制', '±0.02mm Tolerance Control') },
              { title: t('材质保证', 'Material Assurance'), desc: t('304/316/631/65MN优质材料', '304/316/631/65MN Quality Materials') },
              { title: t('表面处理', 'Surface Treatment'), desc: t('抛光/电镀/喷涂多种工艺', 'Polishing/Plating/Coating Options') },
              { title: t('质量检测', 'Quality Testing'), desc: t('100小时盐雾测试', '100 Hours Salt Spray Test') },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-none">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-industrial-dark mb-2">{item.title}</h3>
                  <p className="text-secondary">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-industrial-blue to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{t('需要定制弹簧?', 'Need Custom Springs?')}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('提供图纸或样品,我们为您提供专业的定制方案', 'Provide drawings or samples, we offer professional custom solutions')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">{t('联系我们', 'Contact Us')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
