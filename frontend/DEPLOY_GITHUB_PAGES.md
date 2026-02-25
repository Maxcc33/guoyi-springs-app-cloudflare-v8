# 部署到 GitHub Pages 指南

本文档说明如何将台州市路桥国益弹簧制造有限公司官网部署到 GitHub Pages。

## 📋 前提条件

- 已有 GitHub 账号
- 已安装 Git
- 项目代码已准备就绪

## 🚀 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub (https://github.com)
2. 点击右上角的 "+" 按钮,选择 "New repository"
3. 填写仓库信息:
   - **仓库名称**: 
     - 如果想使用 `username.github.io` 作为网址,仓库名必须是 `username.github.io` (将 username 替换为您的 GitHub 用户名)
     - 如果使用其他名称(如 `guoyi-spring`),网址将是 `username.github.io/guoyi-spring`
   - **可见性**: 选择 Public (公开)
   - 不要勾选 "Initialize this repository with a README"

### 2. 配置 base 路径 (重要!)

根据您的仓库名称,需要修改配置:

**情况A: 如果仓库名是 `username.github.io`**
- 无需修改配置,默认 base 路径 `/` 即可

**情况B: 如果仓库名是其他名称 (如 `guoyi-spring`)**
- 打开 `.github/workflows/deploy.yml` 文件
- 找到第 58-59 行:
  ```yaml
  # 如果您的仓库名不是 username.github.io,请取消注释下一行并修改仓库名
  # VITE_BASE_PATH: /your-repo-name/
  ```
- 取消注释并修改为您的仓库名:
  ```yaml
  VITE_BASE_PATH: /guoyi-spring/
  ```

### 3. 上传代码到 GitHub

在项目的 `frontend` 目录下执行以下命令:

```bash
# 初始化 Git 仓库 (如果还没有初始化)
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Guoyi Spring website"

# 添加远程仓库 (替换为您的仓库地址)
git remote add origin https://github.com/username/your-repo-name.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 4. 启用 GitHub Pages

1. 进入您的 GitHub 仓库页面
2. 点击 "Settings" (设置)
3. 在左侧菜单找到 "Pages"
4. 在 "Build and deployment" 部分:
   - **Source**: 选择 "GitHub Actions"
5. 保存设置

### 5. 等待部署完成

1. 进入仓库的 "Actions" 标签页
2. 您会看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行
3. 等待工作流完成 (通常需要 2-5 分钟)
4. 部署成功后,您会看到绿色的对勾 ✓

### 6. 访问您的网站

部署成功后,您可以通过以下地址访问网站:

- 如果仓库名是 `username.github.io`: https://username.github.io
- 如果仓库名是其他名称: https://username.github.io/your-repo-name

## 🔄 更新网站

每次修改代码后,只需执行:

```bash
git add .
git commit -m "更新描述"
git push
```

GitHub Actions 会自动重新构建和部署网站。

## ⚙️ 自定义域名 (可选)

如果您有自己的域名,可以配置自定义域名:

1. 在仓库的 "Settings" > "Pages" 中
2. 在 "Custom domain" 输入您的域名 (如 www.guoyispring.com)
3. 在您的域名提供商处添加 DNS 记录:
   - 类型: CNAME
   - 名称: www (或 @)
   - 值: username.github.io

## 📝 注意事项

1. **首次部署**: 首次部署可能需要等待几分钟才能访问
2. **缓存问题**: 如果看不到更新,请清除浏览器缓存或使用无痕模式
3. **HTTPS**: GitHub Pages 自动提供免费的 HTTPS 证书
4. **构建时间**: 每次推送代码后,构建通常需要 2-5 分钟

## 🐛 常见问题

### 问题1: 页面显示 404

**原因**: base 路径配置不正确

**解决方案**: 
- 检查 `.github/workflows/deploy.yml` 中的 `VITE_BASE_PATH` 是否与仓库名匹配
- 如果仓库名是 `username.github.io`,确保 `VITE_BASE_PATH` 未设置或为 `/`
- 如果仓库名是其他名称,确保 `VITE_BASE_PATH` 设置为 `/仓库名/`

### 问题2: 样式或图片无法加载

**原因**: 资源路径问题

**解决方案**: 
- 确保所有资源使用相对路径
- 检查 `VITE_BASE_PATH` 配置是否正确

### 问题3: Actions 构建失败

**原因**: 依赖安装或构建错误

**解决方案**: 
- 查看 Actions 日志中的错误信息
- 确保本地 `pnpm run build` 能成功执行
- 检查 `pnpm-lock.yaml` 文件是否已提交

## 📞 需要帮助?

如果遇到问题,可以:
1. 查看 GitHub Actions 的构建日志
2. 检查 GitHub Pages 设置是否正确
3. 参考 GitHub Pages 官方文档: https://docs.github.com/pages

---

**祝您部署顺利! 🎉**