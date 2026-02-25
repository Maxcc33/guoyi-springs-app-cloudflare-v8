import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('提交成功', 'Submitted Successfully'),
      description: t('我们将尽快与您联系!', 'We will contact you soon!'),
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('公司地址', 'Address'),
      content: t('浙江省台州市路桥区新桥镇镇西路225号', 'No.225 Zhenxi Road, Xinqiao Town, Luqiao District, Taizhou City, Zhejiang Province, China'),
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('联系电话', 'Phone'),
      content: '+86 152-6766-9603',
      extra: '+86 139-0576-4828',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('电子邮箱', 'Email'),
      content: '1926375372cgy@gmail.com',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('工作时间', 'Working Hours'),
      content: t('周一至周六 8:00-18:00', 'Monday - Saturday 8:00-18:00'),
      extra: t('周日休息', 'Sunday Closed'),
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
              <h1 className="text-5xl font-bold mb-4">{t('联系我们', 'Contact Us')}</h1>
              <p className="text-xl text-white/90">
                {t('专业团队随时为您服务 | 3天快速打样 | 免费技术咨询', 'Professional Team at Your Service | 3-Day Quick Sampling | Free Technical Consultation')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-none">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-accent text-white rounded-full mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-industrial-dark mb-3">{info.title}</h3>
                  <p className="text-sm text-secondary mb-1">{info.content}</p>
                  {info.extra && <p className="text-sm text-secondary">{info.extra}</p>}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-industrial-dark mb-3">
                  {t('在线留言', 'Online Message')}
                </h2>
                <p className="text-secondary">
                  {t('请填写您的需求,我们将在24小时内回复', 'Please fill in your requirements, we will reply within 24 hours')}
                </p>
              </div>

              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base">
                        {t('姓名', 'Name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('请输入您的姓名', 'Please enter your name')}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base">
                        {t('联系电话', 'Phone')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('请输入您的联系电话', 'Please enter your phone number')}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base">
                        {t('电子邮箱', 'Email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('请输入您的邮箱', 'Please enter your email')}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base">
                        {t('留言内容', 'Message')} <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('请描述您的需求,如产品类型、规格、数量等', 'Please describe your requirements, such as product type, specifications, quantity, etc.')}
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-hover">
                      <MessageSquare className="mr-2 w-5 h-5" />
                      {t('提交留言', 'Submit Message')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & WeChat */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-industrial-dark mb-6">
                  {t('公司位置', 'Location')}
                </h2>
                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d121.4!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiAxMjHCsDI0JzAwLjAiRQ!5e0!3m2!1szh-CN!2scn!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t('公司地图', 'Company Map')}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-industrial-dark mb-1">
                          {t('台州市路桥国益弹簧制造有限公司', 'Taizhou Guoyi Spring Manufacturing Co., Ltd.')}
                        </p>
                        <p className="text-sm text-secondary">
                          {t('浙江省台州市路桥区新桥镇镇西路225号', 'No.225 Zhenxi Road, Xinqiao Town, Luqiao District, Taizhou City, Zhejiang Province')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-industrial-dark mb-4">
                    {t('微信咨询', 'WeChat Consultation')}
                  </h3>
                  <div className="inline-block p-4 bg-gray-100 rounded-lg mb-4">
                    <div className="w-48 h-48 bg-white flex items-center justify-center border-2 border-dashed border-gray-300">
                      <p className="text-sm text-gray-500">{t('微信二维码', 'WeChat QR Code')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary">
                    {t('扫描二维码添加微信,获取产品资料和报价', 'Scan QR code to add WeChat for product information and quotation')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-industrial-blue to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('立即联系我们', 'Contact Us Now')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('专业团队为您提供一对一服务 | 3天快速打样 | 工厂直供价格优势', 'Professional one-on-one service | 3-day quick sampling | Factory direct pricing advantage')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Phone className="mr-2 w-5 h-5" />
              +86 152-6766-9603
            </Button>
            <Button size="lg" variant="outline" className="!bg-white/10 !text-white border-white hover:!bg-white/20">
              <Mail className="mr-2 w-5 h-5" />
              1926375372cgy@gmail.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}