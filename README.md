# Industrial Store - 工业品独立站

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.3-blue?logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-purple?logo=tailwindcss)](https://tailwindcss.com/)

一个基于 Next.js + Prisma + Tailwind CSS 的工业品独立站。

## 🌟 功能特性

- ✅ **首页展示**：导航栏、产品分类展示区域
- ✅ **分类页面**：显示分类下的所有产品
- ✅ **产品列表 & 详情页**：完整的产品信息展示（待实现）
- ✅ **购物车功能**：用户可添加/删除购物车商品（待实现）
- ✅ **订单系统**：完整的订单流程（待实现）
- ✅ **响应式设计**：完美适配 PC 和移动端

## 🛠️ 技术栈

- **前端框架**：Next.js 16 (App Router)
- **UI 框架**：Tailwind CSS 4
- **数据库**：SQLite (开发) / PostgreSQL (生产)
- **ORM**：Prisma 6
- **语言**：TypeScript

## 📦 项目结构

```
industrial_store/
├── app/                # Next.js App Router
│   ├── api/            # API routes
│   │   └── categories/
│   │       └── route.ts
│   └── categories/     # Category pages
│       └── [slug]/
│           └── page.tsx
├── prisma/             # Prisma schema + migrations
├── public/             # Static assets
├── package.json        # Dependencies
└── README.md           # This file
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/hyf715/industrial-store.git
cd industrial_store
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置数据库

```bash
npx prisma migrate dev
```

### 4. 添加种子数据

```bash
npm run prisma:seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📝 数据模型

- **Category**：产品分类
- **Product**：产品信息
- **Cart & CartItem**：购物车
- **Order & OrderItem**：订单

## 📄 License

MIT

## 👥 Authors

- [hyf715](https://github.com/hyf715)
