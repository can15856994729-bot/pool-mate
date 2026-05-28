# 🎱 球伴 CueMate

> 台球运动社交平台 — 找陪练 · 约球局 · 发现附近球房

## 技术栈

- **Next.js 16** App Router · TypeScript · Tailwind CSS v4
- 全部 Mock Data，无需数据库，无需环境变量

## 本地开发

```bash
npm install
npm run dev
# 访问 http://localhost:3000（推荐用手机尺寸预览）
```

## 页面路由

| 路由 | 页面 |
|------|------|
| `/` | 首页 |
| `/companions` | 球伴列表 |
| `/companions/[id]` | 球伴详情 |
| `/booking` | 预约下单（Mock 支付）|
| `/booking/success` | 预约成功 |
| `/games` | 球局广场 |
| `/games/create` | 发布球局 |
| `/venues` | 球房列表 |
| `/venues/[id]` | 球房详情 |
| `/orders` | 我的订单 |
| `/profile` | 我的页面 |
| `/join` | 成为陪练 |

## 部署

推送到 GitHub 后，在 [Vercel](https://vercel.com) 导入仓库即可自动部署，**无需配置任何环境变量**。

## 平台声明

本平台仅提供台球运动陪练、教学、组局等合法运动社交服务。
