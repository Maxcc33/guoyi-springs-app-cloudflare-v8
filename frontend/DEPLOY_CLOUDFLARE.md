# Cloudflare Pages 部署指南

## 前提条件

- 一个 [Cloudflare](https://dash.cloudflare.com/) 账号
- 项目代码已推送到 GitHub 或 GitLab 仓库

## 部署步骤

### 1. 创建 Cloudflare Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Pages**
3. 点击 **Create a project** > **Connect to Git**
4. 选择你的 GitHub/GitLab 仓库并授权

### 2. 配置构建设置

在 Cloudflare Pages 的构建配置中填写以下信息：

| 配置项 | 值 |
|--------|-----|
| **Framework preset** | None |
| **Build command** | `cd frontend && pnpm run build` |
| **Build output directory** | `frontend/dist` |
| **Root directory** | `app` |

> **注意**：如果你的仓库根目录就是 `frontend` 文件夹，则：
> - Build command: `pnpm run build`
> - Build output directory: `dist`
> - Root directory: （留空）

### 3. 环境变量配置

在 **Settings** > **Environment variables** 中添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NODE_VERSION` | `18` | 指定 Node.js 版本 |
| `VITE_API_BASE_URL` | `https://your-api-domain.com` | 后端 API 地址（必填） |

> **重要**：`VITE_API_BASE_URL` 需要设置为你的后端服务实际部署地址。如果后端也部署在 Cloudflare Workers 上，填写对应的 Workers URL。

### 4. 部署

点击 **Save and Deploy**，Cloudflare 会自动拉取代码、安装依赖、构建并部署。

部署完成后，你会获得一个 `*.pages.dev` 的域名。

### 5. 自定义域名（可选）

1. 进入项目的 **Custom domains** 页面
2. 点击 **Set up a custom domain**
3. 输入你的域名（例如 `www.example.com`）
4. 按照提示在 Cloudflare DNS 中添加 CNAME 记录
5. 等待 DNS 生效，SSL 证书会自动配置

## 项目适配说明

本项目已针对 Cloudflare Pages 做了以下适配：

### SPA 路由支持
- `public/_redirects` 文件确保所有路由请求都重定向到 `index.html`，使 React Router 的客户端路由正常工作。

### 静态资源缓存与安全头
- `public/_headers` 文件为 `/assets/*` 下的静态资源设置了长期缓存策略，并为所有页面添加了安全响应头。

### 构建配置
- `vite.config.ts` 中 `base` 默认为 `/`，适配 Cloudflare Pages 根路径部署。
- 无需设置 `VITE_BASE_PATH` 环境变量（该变量仅用于 GitHub Pages 子路径部署）。

## 常见问题

### Q: 页面刷新后出现 404？
A: 确认 `public/_redirects` 文件存在且内容为 `/* /index.html 200`。

### Q: API 请求失败？
A: 检查 `VITE_API_BASE_URL` 环境变量是否正确设置，以及后端服务是否已配置 CORS 允许你的 Cloudflare Pages 域名。

### Q: 如何触发重新部署？
A: 推送新的 commit 到关联的 Git 分支即可自动触发部署，也可以在 Cloudflare Dashboard 中手动触发。

### Q: 如何查看部署日志？
A: 在 Cloudflare Pages 项目的 **Deployments** 页面，点击对应的部署记录即可查看详细日志。