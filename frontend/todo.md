# 台州市路桥国益弹簧制造有限公司官网 - 开发计划

## 设计指南

### 设计参考
- **工业制造类网站**: Bosch, Siemens工业网站 - 专业、可信赖
- **风格**: 现代工业风 + B2B专业感 + 金属质感
- **色调**: 冷静、专业、科技感

### 配色方案
- Primary: #1E40AF (科技蓝 - 主要CTA按钮、标题强调)
- Secondary: #64748B (工业银灰 - 次要文字、边框)
- Accent: #0EA5E9 (亮蓝 - 悬停效果、图标)
- Background: #F8FAFC (浅灰白 - 页面背景)
- Dark: #0F172A (深蓝灰 - 页脚、深色区域)
- Metal: #94A3B8 (金属灰 - 不锈钢质感元素)
- Success: #10B981 (绿色 - 成功提示)
- Text Primary: #1E293B (深灰 - 主要文字)
- Text Secondary: #64748B (中灰 -次要文字)

### 字体方案
- Heading1: Noto Sans SC font-weight 700 (36px) - 页面主标题
- Heading2: Noto Sans SC font-weight 600 (28px) - 区块标题
- Heading3: Noto Sans SC font-weight 600 (20px) - 卡片标题
- Body/Normal: Noto Sans SC font-weight 400 (16px) - 正文
- Body/Emphasis: Noto Sans SC font-weight 500 (16px) - 强调文字
- Navigation: Noto Sans SC font-weight 500 (15px) - 导航菜单

### 关键组件样式
- **按钮**: 蓝色背景(#1E40AF), 白色文字, 8px圆角, 悬停: 加深10%
- **卡片**: 白色背景, 1px边框(#E2E8F0), 12px圆角, 悬停: 上升4px + 阴影
- **表单**: 白色输入框, 底部边框, 聚焦: 蓝色强调
- **导航**: 固定顶部, 半透明背景(backdrop-blur), 阴影

### 布局与间距
- Hero区域: 全视口高度, 大图背景, 居中内容
- 产品网格: 3列桌面, 2列平板, 1列手机, 24px间距
- 区块内边距: 80px垂直
- 卡片悬停: 上升4px, 平滑阴影, 300ms过渡

### 需要生成的图片
1. **hero-factory-workshop.jpg** - 工厂车间全景,现代化生产设备,明亮整洁 (风格: photorealistic, 工业感)
2. **hero-stainless-springs.jpg** - 304不锈钢弹簧特写,金属光泽,高清细节 (风格: photorealistic, 产品摄影)
3. **factory-equipment.jpg** - 弹簧生产设备,自动化机械,工业场景 (风格: photorealistic)
4. **quality-testing.jpg** - 质量检测室,精密仪器,专业人员检测 (风格: photorealistic)
5. **compression-spring.jpg** - 压簧产品展示,不锈钢材质,专业产品照 (风格: photorealistic, 产品摄影)
6. **extension-spring.jpg** - 拉簧产品展示,精密制造,清晰细节 (风格: photorealistic, 产品摄影)
7. **torsion-spring.jpg** - 扭簧产品展示,工业用途,高质量 (风格: photorealistic, 产品摄影)
8. **wire-spring.jpg** - 卡簧/线成型弹簧,精密加工 (风格: photorealistic, 产品摄影)

---

## 开发任务

### 1. 项目配置与基础设置
- 更新 index.html (标题、描述、favicon)
- 配置 tailwind.config.ts (添加自定义颜色)
- 更新 src/index.css (全局样式、字体)

### 2. 生成所有图片资源
- 使用 ImageCreator.generate_images 批量生成8张图片

### 3. 创建共享组件
- src/components/Navbar.tsx (导航栏,中英文切换)
- src/components/Footer.tsx (页脚,版权信息)
- src/components/LanguageContext.tsx (语言切换上下文)

### 4. 创建页面组件
- src/pages/Index.tsx (首页 - 轮播、卖点、产品展示)
- src/pages/About.tsx (公司介绍)
- src/pages/Products.tsx (产品中心)
- src/pages/News.tsx (新闻动态)
- src/pages/Contact.tsx (联系我们)

### 5. 更新路由
- src/App.tsx (添加所有页面路由)

### 6. 样式优化与响应式
- 确保所有页面手机端适配
- 添加过渡动画效果
- 优化加载性能

### 7. 测试与构建
- 运行 pnpm run lint 检查代码
- 运行 pnpm run build 构建项目
- 使用 CheckUI.run 验证UI渲染质量