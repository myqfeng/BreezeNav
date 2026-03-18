# 清风个人导航站

一个基于 Vue 3 + Vite 构建的美观、可定制的个人导航站单页应用。

## 🌟 特性

- 🎨 毛玻璃(Glassmorphism)视觉效果，现代简约风格
- 🌙 深色/浅色/自动三种主题模式，状态持久化
- 📱 响应式设计，适配桌面端和移动端
- 🖼️ 自定义背景图片
- 🎯 支持 Lucide 图标和自定义图片图标

## 🚀 快速开始

### 环境要求

- Node.js 16+
- pnpm (推荐) 或 npm

## ⚙️ 配置说明

配置文件使用 TypeScript 编写，内有详细注释说明各字段用途。

### 📝 站点配置 (`src/config/site.ts`)

修改网站标题、作者信息、主题设置等。支持三种主题模式：
- `dark` - 深色模式
- `light` - 浅色模式  
- `auto` - 跟随系统

### 🔗 链接配置 (`src/config/links.ts`)

管理导航链接分类和具体链接项。图标支持两种格式：
- Lucide 图标：`lucide:icon-name`（可用图标见 https://lucide.dev/icons）
- 自定义图片：完整 URL 或相对路径

### 📄 页脚配置 (`src/config/footer.html`)

支持 HTML 格式的页脚内容，内容默认居中显示。

## 🎨 自定义资源

### 更换背景图片

将图片放入 `public/` 目录，在 `site.ts` 中修改 `theme.background` 路径。

### 更换 Logo

将图片放入 `public/` 目录，在 `site.ts` 中修改 `site.logo` 和 `site.avatar` 路径。

### 安装与运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📁 项目结构

```
navigation-site/
├── public/                  # 静态资源
│   ├── background.png      # 背景图片
│   ├── logo.png            # 网站Logo
│   └── icons/              # 图标资源
├── src/
│   ├── App.vue             # 根组件
│   ├── main.js             # 应用入口
│   ├── style.css           # 全局样式
│   ├── components/         # Vue组件
│   │   ├── Header.vue      # 页头（含主题切换）
│   │   ├── Footer.vue      # 页脚
│   │   ├── CategorySection.vue
│   │   └── LinkCard.vue
│   └── config/             # 配置文件
│       ├── site.ts         # 站点配置
│       ├── links.ts        # 链接数据
│       └── footer.html     # 页脚内容
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 部署

构建后将 `dist/` 目录部署到任意静态托管服务（Vercel、Netlify、GitHub Pages 等）。

## 📄 许可证
 Apache License 2.0
