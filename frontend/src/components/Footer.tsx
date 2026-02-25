import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-industrial-dark text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('台州市路桥国益弹簧制造有限公司', 'Taizhou Guoyi Spring Manufacturing Co., Ltd.')}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {t(
                '专业生产304/316不锈钢弹簧,20年制造经验,值得信赖的合作伙伴',
                'Professional manufacturer of 304/316 stainless steel springs with 20 years of experience'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('快速链接', 'Quick Links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-colors">
                  {t('公司介绍', 'About Us')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-accent transition-colors">
                  {t('产品中心', 'Products')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm hover:text-accent transition-colors">
                  {t('新闻动态', 'News')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-accent transition-colors">
                  {t('联系我们', 'Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('主营产品', 'Main Products')}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t('304/316不锈钢压簧', '304/316 Compression Springs')}</li>
              <li>{t('不锈钢拉簧', 'Extension Springs')}</li>
              <li>{t('不锈钢扭簧', 'Torsion Springs')}</li>
              <li>{t('不锈钢卡簧', 'Snap Rings')}</li>
              <li>{t('异形弹簧定制', 'Custom Springs')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('联系方式', 'Contact Info')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  {t('浙江省台州市路桥区新桥镇镇西路225号', 'No.225 Zhenxi Road, Xinqiao Town, Luqiao District, Taizhou City, Zhejiang Province, China')}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-sm">
                  <div>+86 152-6766-9603</div>
                  <div>+86 139-0576-4828</div>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm">1926375372cgy@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © 2024 {t('台州市路桥国益弹簧制造有限公司', 'Taizhou Guoyi Spring Manufacturing Co., Ltd.')} | {t('版权所有', 'All Rights Reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}