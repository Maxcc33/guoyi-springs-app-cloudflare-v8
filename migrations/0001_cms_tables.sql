-- ============================================================
-- 国益弹簧 CMS 数据库迁移
-- 包含：管理员、新闻、产品、轮播图
-- ============================================================

-- 管理员表
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 新闻/文章表
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  category_zh TEXT NOT NULL DEFAULT '公司新闻',
  category_en TEXT NOT NULL DEFAULT 'Company News',
  summary_zh TEXT NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL DEFAULT '',
  content_zh TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  description_zh TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  specs_zh TEXT NOT NULL DEFAULT '[]',
  specs_en TEXT NOT NULL DEFAULT '[]',
  applications_zh TEXT NOT NULL DEFAULT '',
  applications_en TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  material TEXT NOT NULL DEFAULT 'all',
  published INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 轮播图表
CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_zh TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  subtitle_zh TEXT NOT NULL DEFAULT '',
  subtitle_en TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL,
  link TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- 初始化数据：从现有硬编码数据迁移
-- ============================================================

-- 初始管理员（密码: admin123，bcrypt hash）
-- 注意：部署后请立即在后台修改密码
INSERT OR IGNORE INTO admins (username, password_hash) VALUES (
  'admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhy'
);

-- 初始轮播图
INSERT OR IGNORE INTO banners (title_zh, title_en, subtitle_zh, subtitle_en, image, sort_order) VALUES
(
  '20年专业制造经验',
  '20 Years of Professional Manufacturing',
  '值得信赖的不锈钢弹簧供应商',
  'Trusted Stainless Steel Spring Supplier',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png',
  1
),
(
  '304/316不锈钢材质',
  '304/316 Stainless Steel Material',
  '高品质材料 确保产品耐用性',
  'High-Quality Materials Ensure Durability',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/b311dc80-f618-4905-b8e2-236af21b0f0f.png',
  2
),
(
  '先进生产设备',
  'Advanced Production Equipment',
  '精密制造 品质保证',
  'Precision Manufacturing, Quality Assurance',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png',
  3
);

-- 初始产品
INSERT OR IGNORE INTO products (name_zh, name_en, description_zh, description_en, specs_zh, specs_en, applications_zh, applications_en, image, material, sort_order) VALUES
(
  '压簧系列',
  'Compression Springs',
  '承受压力的螺旋弹簧,广泛应用于各类机械设备',
  'Helical springs that resist compression, widely used in various machinery',
  '["线径范围: 0.2-8mm","外径范围: 2-80mm","自由高度: 5-300mm","材质: 304/316/631/65MN"]',
  '["Wire Diameter: 0.2-8mm","Outer Diameter: 2-80mm","Free Height: 5-300mm","Material: 304/316/631/65MN"]',
  '机械设备、汽车配件、电子产品、家电',
  'Machinery, Auto Parts, Electronics, Appliances',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/d31cc2d7-7d1d-45cb-afcc-16807cfc5305.png',
  'all',
  1
),
(
  '拉簧系列',
  'Extension Springs',
  '承受拉力的螺旋弹簧,两端带钩或环,用于需要拉伸力的场合',
  'Helical springs that resist extension, with hooks or loops at both ends',
  '["线径范围: 0.2-8mm","外径范围: 3-50mm","自由长度: 10-200mm","材质: 304/316/631/65MN"]',
  '["Wire Diameter: 0.2-8mm","Outer Diameter: 3-50mm","Free Length: 10-200mm","Material: 304/316/631/65MN"]',
  '门窗五金、健身器材、医疗设备、玩具',
  'Door Hardware, Fitness Equipment, Medical Devices, Toys',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/41516a01-fcc0-4c7e-8ea4-cfe7d4c49652.png',
  'all',
  2
),
(
  '扭簧系列',
  'Torsion Springs',
  '承受扭转力矩的螺旋弹簧,用于需要旋转或扭转力的应用',
  'Helical springs that resist twisting or rotational forces',
  '["线径范围: 0.2-8mm","外径范围: 3-60mm","臂长: 5-150mm","材质: 304/316/631/65MN"]',
  '["Wire Diameter: 0.2-8mm","Outer Diameter: 3-60mm","Arm Length: 5-150mm","Material: 304/316/631/65MN"]',
  '夹子、铰链、开关、鼠标',
  'Clips, Hinges, Switches, Computer Mouse',
  '/images/48d7dcab-6f1e-4e70-b52c-218ee13cb2cc.png',
  'all',
  3
),
(
  '卡簧系列',
  'Snap Rings',
  '用于轴或孔的固定和定位,安装拆卸方便',
  'Used for shaft or hole positioning, easy to install and remove',
  '["线径范围: 0.5-8mm","内径范围: 3-100mm","类型: 内卡簧/外卡簧","材质: 304/316/631/65MN"]',
  '["Wire Diameter: 0.5-8mm","Inner Diameter: 3-100mm","Type: Internal/External","Material: 304/316/631/65MN"]',
  '轴承固定、齿轮定位、机械装配',
  'Bearing Fixing, Gear Positioning, Mechanical Assembly',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/25a2d293-822a-4a81-bf5e-8fe489b7e0dd.png',
  'all',
  4
),
(
  '异形弹簧系列',
  'Special-Shaped Springs',
  '根据客户需求定制的非标准弹簧,形状多样,满足特殊应用需求',
  'Non-standard springs customized according to customer requirements, various shapes for special applications',
  '["线径范围: 0.1-12mm","材质: 304/316/631/65MN","支持完全定制","3天快速打样"]',
  '["Wire Diameter: 0.1-12mm","Material: 304/316/631/65MN","Fully Customizable","3-Day Quick Sampling"]',
  '特殊机械、精密仪器、定制设备',
  'Special Machinery, Precision Instruments, Custom Equipment',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/25a2d293-822a-4a81-bf5e-8fe489b7e0dd.png',
  'all',
  5
);

-- 初始新闻（从现有硬编码数据迁移）
INSERT OR IGNORE INTO news (title_zh, title_en, category_zh, category_en, summary_zh, summary_en, content_zh, content_en, image, sort_order) VALUES
(
  '国益弹簧参加2024年上海国际工业博览会',
  'Guoyi Spring Participated in 2024 Shanghai International Industry Fair',
  '展会活动',
  'Exhibition',
  '我公司携最新研发的高精度不锈钢弹簧产品亮相上海工博会,吸引了众多国内外客户前来咨询洽谈,展会期间达成多项合作意向。',
  'Our company showcased the latest high-precision stainless steel spring products at Shanghai Industry Fair, attracting numerous domestic and international customers.',
  '["2024年11月，国益弹簧携最新研发的高精度不锈钢弹簧产品参加了在上海举办的国际工业博览会。","本次展会上，我们重点展示了304/316不锈钢压簧、拉簧、扭簧等系列产品，以及最新研发的微型精密弹簧。","展会期间，来自德国、日本、美国等国家的采购商对我们的产品表现出浓厚兴趣。","通过此次展会，我们与多家国际知名企业达成了初步合作意向，进一步拓展了海外市场。"]',
  '["In November 2024, Guoyi Spring participated in the International Industry Fair held in Shanghai.","We showcased 304/316 stainless steel compression, extension, and torsion springs, as well as newly developed micro precision springs.","Buyers from Germany, Japan, and the United States showed strong interest in our products.","We reached preliminary cooperation intentions with several internationally renowned companies."]',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png',
  1
),
(
  '公司通过ISO 9001:2015质量管理体系认证',
  'Company Passed ISO 9001:2015 Quality Management System Certification',
  '公司动态',
  'Company News',
  '经过严格的审核流程，我公司正式通过ISO 9001:2015质量管理体系认证，标志着公司质量管理水平迈上新台阶。',
  'After a rigorous review process, our company officially passed the ISO 9001:2015 Quality Management System certification.',
  '["近日，我公司正式通过了ISO 9001:2015质量管理体系认证，这是公司质量管理工作的重要里程碑。","ISO 9001:2015是国际通用的质量管理体系标准，获得该认证意味着我们的产品质量和服务水平得到了国际权威机构的认可。","此次认证涵盖了从原材料采购、生产制造到成品检验的全流程质量管理。","未来，我们将继续坚持质量第一的原则，为客户提供更优质的产品和服务。"]',
  '["Recently, our company officially passed the ISO 9001:2015 Quality Management System certification, marking an important milestone.","ISO 9001:2015 is an internationally recognized quality management standard, confirming our product quality and service level.","This certification covers the entire quality management process from raw material procurement to finished product inspection.","We will continue to uphold quality first and provide better products and services."]',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/b311dc80-f618-4905-b8e2-236af21b0f0f.png',
  2
),
(
  '新型精密微型弹簧研发成功',
  'New Precision Micro Spring Successfully Developed',
  '产品研发',
  'Product Development',
  '经过研发团队数月的努力，我公司成功研发出线径0.1mm的超细精密微型弹簧，填补了国内该领域的技术空白。',
  'After months of effort by our R&D team, we successfully developed ultra-fine precision micro springs with a wire diameter of 0.1mm.',
  '["经过研发团队数月的攻关，我公司成功研发出线径0.1mm的超细精密微型弹簧。","该产品采用进口316L不锈钢丝制造，具有优异的耐腐蚀性和弹性稳定性。","产品主要应用于医疗器械、精密仪器、微型电子设备等高端领域。","目前该产品已通过多家客户的测试验证，即将正式投入批量生产。"]',
  '["After months of R&D efforts, our company successfully developed ultra-fine precision micro springs with a wire diameter of 0.1mm.","Made from imported 316L stainless steel wire, featuring excellent corrosion resistance and elastic stability.","The product is mainly used in medical devices, precision instruments, and micro electronic equipment.","The product has passed testing by multiple customers and is about to enter mass production."]',
  'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png',
  3
);
