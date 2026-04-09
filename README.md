# 林空鹿饮溪的博客 | DeerInForest's Blog

## 模板来源

https://github.com/yuzhouu/swallow

## 项目结构

```
├── data/
│   ├── blog/            # Markdown 博客文章
│   ├── images/          # 图片资源（头像、favicon 等）
│   └── meta.json        # 站点元数据（标题、作者、链接等）
├── site/                # Gatsby 应用目录
│   ├── gatsby-config.mjs    # Gatsby 主配置（ESM 格式）
│   ├── gatsby-node.js       # 页面生成、Schema 定义
│   ├── gatsby-browser.js    # 浏览器端全局样式/字体导入
│   ├── gatsby-ssr.js        # SSR 端全局样式/字体导入
│   └── src/
│       ├── components/      # React 组件
│       ├── pages/           # 页面路由
│       └── templates/       # 页面模板（如 tag 筛选页）
├── dev.sh               # 快速启动开发服务器
├── dev-clean.sh         # 清缓存后启动开发服务器
└── build.sh             # 完整构建 + 本地预览
```

## 技术栈与核心依赖

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | Gatsby | React 静态站点生成器 |
| UI | React + Emotion | CSS-in-JS 方案 |
| 内容 | MDX (gatsby-plugin-mdx) | Markdown 中支持 JSX 组件 |
| 数学公式 | remark-math + rehype-katex | LaTeX 公式渲染（构建时编译） |
| 表格/GFM | remark-gfm | 支持 GitHub 风格 Markdown（表格、删除线等） |
| 代码高亮 | PrismJS (gatsby-remark-prismjs) | 代码块语法高亮 |
| 字体 | @fontsource/nunito, @fontsource/ma-shan-zheng | 英文字体 + 中文书法字体 |
| 图标 | @tabler/icons-react | SVG 图标库 |
| 图片优化 | gatsby-plugin-image + gatsby-plugin-sharp | 响应式图片处理 |
| 部署 | gh-pages | 构建产物推送到 gh-pages 分支 |
| CI/CD | GitHub Actions | 推送 master 后自动构建部署 |

## 博客文章配置

在 `data/blog/` 下创建 `.md` 文件，frontmatter 支持以下字段：

```yaml
---
title: 文章标题
tags: [Tag1, Tag2]
date: 2026-01-01
top: 1          # 可选，置顶顺序（值越小越靠前，不设置则不置顶）
---
```

## 快速开始

适用于 Linux / WSL 环境。

**1. 安装 Node.js (>= 18) 和 Yarn**

```bash
# 安装 nvm（Node 版本管理器）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# 安装 Node.js 20 并启用 Yarn
nvm install 20
npm install -g yarn
```

**2. 克隆仓库并安装依赖**

```bash
cd site
yarn install
```

**3. 启动开发服务器**

```bash
cd ..
./dev.sh
```

浏览器访问 http://localhost:8000/ 即可预览。

## 本地开发

在根目录下提供了三个脚本：

- `./dev.sh` — 快速启动开发服务器，保留缓存，启动速度最快，支持热更新
- `./dev-clean.sh` — 清除缓存后启动开发服务器，遇到缓存导致的异常时使用
- `./build.sh` — 完整静态构建后启动本地预览服务，效果与线上部署一致

## Markdown 注意事项

由于使用 MDX v2 编译 Markdown，以下内容需要注意：

- **行内代码中的 HTML 标签**（如 `<script>`）需使用单反引号而非三反引号，否则 MDX 会将其解析为 JSX （建议直接避免使用 HTML 标签，或者自行添加兼容处理）
- **表格**由 remark-gfm 插件提供支持，使用标准 Markdown 表格语法即可
- **数学公式**使用 `$...$`（行内）和 `$$...$$`（块级），构建时由 KaTeX 渲染
