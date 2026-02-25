import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/LanguageContext';

export default function Products() {
  const { t } = useLanguage();
  const [selectedMaterial, setSelectedMaterial] = useState('all');

  const materials = [
    { value: 'all', label: t('全部材质', 'All Materials') },
    { value: '304', label: '304' },
    { value: '316', label: '316' },
    { value: '631', label: '631' },
    { value: '65mn', label: t('65MN弹簧钢', '65MN Spring Steel') },
  ];

  const productCategories = [
    {
      id: 'compression',
      name: t('压簧系列', 'Compression Springs'),
      description: t('承受压力的螺旋弹簧,广泛应用于各类机械设备', 'Helical springs that resist compression, widely used in various machinery'),
      image: '/images/CompressionSprings.jpg',
      specs: [
        t('线径范围: 0.2-8mm', 'Wire Diameter: 0.2-8mm'),
        t('外径范围: 2-80mm', 'Outer Diameter: 2-80mm'),
        t('自由高度: 5-300mm', 'Free Height: 5-300mm'),
        t('材质: 304/316/631/65MN', 'Material: 304/316/631/65MN'),
      ],
      applications: t('机械设备、汽车配件、电子产品、家电', 'Machinery, Auto Parts, Electronics, Appliances'),
    },
    {
      id: 'extension',
      name: t('拉簧系列', 'Extension Springs'),
      description: t('承受拉力的螺旋弹簧,两端带钩或环,用于需要拉伸力的场合', 'Helical springs that resist extension, with hooks or loops at both ends'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png',
      specs: [
        t('线径范围: 0.2-8mm', 'Wire Diameter: 0.2-8mm'),
        t('外径范围: 3-50mm', 'Outer Diameter: 3-50mm'),
        t('自由长度: 10-200mm', 'Free Length: 10-200mm'),
        t('材质: 304/316/631/65MN', 'Material: 304/316/631/65MN'),
      ],
      applications: t('门窗五金、健身器材、医疗设备、玩具', 'Door Hardware, Fitness Equipment, Medical Devices, Toys'),
    },
    {
      id: 'torsion',
      name: t('扭簧系列', 'Torsion Springs'),
      description: t('承受扭转力矩的螺旋弹簧,用于需要旋转或扭转力的应用', 'Helical springs that resist twisting or rotational forces'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/36fec825-a6f9-4300-b09d-09ffe15e87b9.png',
      specs: [
        t('线径范围: 0.2-8mm', 'Wire Diameter: 0.2-8mm'),
        t('外径范围: 3-60mm', 'Outer Diameter: 3-60mm'),
        t('臂长: 5-150mm', 'Arm Length: 5-150mm'),
        t('材质: 304/316/631/65MN', 'Material: 304/316/631/65MN'),
      ],
      applications: t('夹子、铰链、开关、鼠标', 'Clips, Hinges, Switches, Computer Mouse'),
    },
    {
      id: 'snap',
      name: t('卡簧系列', 'Snap Rings'),
      description: t('用于轴或孔的固定和定位,安装拆卸方便', 'Used for shaft or hole positioning, easy to install and remove'),
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png',
      specs: [
        t('线径范围: 0.5-8mm', 'Wire Diameter: 0.5-8mm'),
        t('内径范围: 3-100mm', 'Inner Diameter: 3-100mm'),
        t('类型: 内卡簧/外卡簧', 'Type: Internal/External'),
        t('材质: 304/316/631/65MN', 'Material: 304/316/631/65MN'),
      ],
      applications: t('轴承固定、齿轮定位、机械装配', 'Bearing Fixing, Gear Positioning, Mechanical Assembly'),
    },
  ];

  const filteredCategories = selectedMaterial === 'all' 
    ? productCategories 
    : productCategories;

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
          <Tabs defaultValue="compression" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
              {productCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {filteredCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[400px]">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white text-lg px-4 py-2">
                          {category.name}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl font-bold text-industrial-dark mb-4">{category.name}</h2>
                      <p className="text-lg text-secondary mb-6">{category.description}</p>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-industrial-dark mb-3">
                            {t('产品规格', 'Specifications')}
                          </h3>
                          <ul className="space-y-2">
                            {category.specs.map((spec, index) => (
                              <li key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-secondary">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-industrial-dark mb-3">
                            {t('应用领域', 'Applications')}
                          </h3>
                          <p className="text-secondary">{category.applications}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <Button size="lg" className="bg-primary hover:bg-primary-hover">
                            {t('立即咨询', 'Contact Now')}
                          </Button>
                          <Button size="lg" variant="outline">
                            {t('索取样品', 'Request Sample')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
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
              {
                title: t('精密加工', 'Precision Processing'),
                desc: t('±0.02mm公差控制', '±0.02mm Tolerance Control'),
              },
              {
                title: t('材质保证', 'Material Assurance'),
                desc: t('304/316/631/65MN优质材料', '304/316/631/65MN Quality Materials'),
              },
              {
                title: t('表面处理', 'Surface Treatment'),
                desc: t('抛光/电镀/喷涂多种工艺', 'Polishing/Plating/Coating Options'),
              },
              {
                title: t('质量检测', 'Quality Testing'),
                desc: t('100小时盐雾测试', '100 Hours Salt Spray Test'),
              },
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
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('需要定制弹簧?', 'Need Custom Springs?')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('提供图纸或样品,我们为您提供专业的定制方案', 'Provide drawings or samples, we offer professional custom solutions')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              {t('联系我们', 'Contact Us')}
            </Button>
            <Button size="lg" variant="outline" className="!bg-white/10 !text-white border-white hover:!bg-white/20">
              {t('下载产品手册', 'Download Catalog')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}