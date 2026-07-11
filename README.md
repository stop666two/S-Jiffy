# S-Jiffy · 即用即走工具集

> 轻量、瞬时的生产力工具，零登录零广告，打开即用，用完即走。
>
> 🌐 **GitHub**：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
>
> ⚠️ **免责声明**：所有操作均在浏览器本地完成，计算结果仅供参考。极少情况下可能出现兼容性或计算偏差，请自行校验结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)。

## 📦 项目概览

S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **211 个** 即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、网络计算、编程开发等多领域。所有工具均为单页 HTML，无需构建、无需服务端、无需注册。

## ✨ 核心特性

- **即用即走** — 无需安装、无需注册、无需广告
- **零框架依赖** — 纯 HTML + CSS + Vanilla JS，所有工具共享全局样式脚本
- **离线可用** — 全局资源极少 CDN 依赖，大部分工具完全离线可运行
- **极简商务风** — 基于 minimalist-ui 规范，等宽字体全局，纯黑/白/灰配色
- **分类过滤** — 25 个中文分类标签，点击筛选，再次点击取消
- **一键复制** — 所有结果区标配复制按钮
- **响应式** — 全工具集适配移动端

## 🗂️ 目录结构

```
s-jiffy/
├── index.html                    # 入口：工具导航页（含分类过滤系统）
├── assets/
│   ├── css/global.css            # 全局设计 Token + 组件样式
│   ├── js/global.js              # 全局工具函数
├── projects/                     # 211 个独立工具，每个一个文件夹
│   ├── base64/
│   ├── json-formatter/
│   ├── hash-generator/
│   ├── qr-code-generator/
│   ├── ...（总计 211 个）
├── server.js                     # 本地开发服务器
└── README.md
```

## 🎨 设计系统

### 色彩

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-text-primary` | `#111111` | 主文本 |
| `--color-text-secondary` | `#787774` | 次级文本/描述 |
| `--color-text-disabled` | `#AAAAAA` | 禁用状态 |
| `--color-bg` | `#FFFFFF` | 主背景 |
| `--color-bg-soft` | `#F7F6F3` | 输出区域背景 |
| `--color-border` | `#EAEAEA` | 边框/分割线 |
| `--color-accent` | `#111111` | 强调色（纯黑） |

### 排版

- 全局等宽字体：`'Geist Mono', 'SF Mono', 'JetBrains Mono', 'Fira Code', 'DengXian', monospace`
- 字号系统：12px / 13px / 16px / 20px / 24px
- 行高：1.6

### 间距

8px 基准系统：8 / 16 / 24 / 32 / 48px

## 🧰 工具总览（211 个）

### 编解码 (7)
Base64 · Base32 · Base36 · Base58 · Base62 · Base85 · Punycode

### 加密哈希 (10)
MD5 生成器 · SHA 计算器(SHA-1/224/256/384/512) · HMAC 生成器 · Hash 识别器 · 校验和计算器 · XOR 加密 · Atbash 密码 · Rail Fence 密码 · bcrypt · BIP39 助记词

### 文本处理 (14)
文本统计 · 文本重复器 · 文本反转器 · 文本排序器 · 文本去重 · 行号添加器 · 单词统计 · 字符级文本对比 · 文本清洁器 · 正则替换 · ASCII 文字画 · Lorem Ipsum 生成器 · 文字差异对比 · Numeronym 生成器

### 日期时间 (6)
年龄计算器 · 日期差计算 · 倒计时器 · 工作日计算器 · 番茄钟 · 时区转换

### 网络工具 (14)
API 请求测试器 · IP 段计算器 · 带宽计算器 · IPv4 子网计算 · IPv4 地址转换 · IPv4 范围展开 · IPv6 ULA 生成 · MAC 地址查找 · MAC 地址生成 · 我的 IP · IP 地理定位 · SSL 证书检测 · SafeLink 解码 · 在线率计算

### 颜色工具 (15)
颜色转换(HEX/RGB/HSL/CMYK/HSV) · HSL 取色器 · HSL 颜色选择 · 调色板生成 · 色轮工具 · 颜色命名 · RGB→HEX · HEX→RGB · HSL→HEX · HEX→HSL · CMYK 转换 · Alpha Hex 转换 · 色彩对比度 · 色盲模拟 · 图片取色器

### 数学计算 (6)
进制转换(2-36) · 通用进制转换 · 质数检测器 · 数学表达式计算 · ETA 计算器 · 百分比计算

### 格式转换 (18)
JSON Formatter · JSON 压缩 · JSON 树查看 · JSON 对比 · JSON 合并 · JSON 转 CSV · JSON 转 XML · JSON 转 YAML · JSON 转 TOML · XML 格式化 · XML 转 JSON · YAML 查看 · YAML 验证 · YAML 转 JSON · YAML 转 TOML · TOML 转 JSON · TOML 转 YAML · CSV 转 JSON

### 正则表达式 (4)
正则测试器 · 正则备忘 · 正则可视化 · 正则替换

### 序列生成 (3)
UUID 生成器 · ULID 生成器 · NanoID 生成器

### 数据处理 (6)
JSON Schema 验证 · HTML 净化器 · 列表转换器 · 数据存储转换 · 邮件规范化 · INI 转换

### 网址工具 (4)
URL 编解码 · URL 解析 · URL Slug 生成 · Basic Auth 生成

### 代码美化 (6)
命名风格转换 · CSS 格式化 · CSS 压缩 · JS 格式化 · JS 压缩 · SQL 格式化

### 字符串 (4)
ASCII 码表 · 字符映射表 · Unicode 查找 · 字符串混淆器

### 时间戳 (2)
时间戳转换 · Epoch 转换

### 随机生成 (6)
随机数 · 随机字符串 · 随机端口 · 列表随机化 · 抛硬币 · 掷骰子

### 密码管理 (4)
密码生成器 · 密码强度分析 · 密码检测器 · Token 生成器

### 安全工具 (4)
RSA 密钥对生成 · 加密工具(凯撒/ROT13) · HTML 净化器 · HTTPS 状态码

### 编程工具 (8)
Git 备忘 · Git 提交信息生成 · Docker Compose 转换 · SSH 密钥 · HTML WYSIWYG · SVG 编辑 · HTML 预览 · Markdown 预览

### 前端开发 (9)
CSS 选择器测试 · 渐变生成器 · Box Shadow 生成 · Text Shadow 生成 · Border 生成 · Flexbox 生成器 · CSS 动画生成 · 字体测试 · CSS 单位转换

### 单位换算 (9)
温度(8种温标) · 长度 · 重量 · 体积 · 面积 · 速度 · 数字格式化 · 字节格式化 · 数据存储

### 数据生成 (8)
QR 码生成 · Wi-Fi QR 码 · 条码生成 · SVG 占位图 · Emoji 选择器 · 电话号码生成 · 身份证校验 · IBAN 验证

### 文档工具 (3)
HTML 实体参考 · HTTP 状态码 · MIME 类型查询

### 网页工具 (5)
HTML 实体转义 · User-Agent 解析 · 设备信息 · Meta 标签生成 · 图片转 Base64

### 其他
Markdown 转 HTML · HTML 转 Markdown · SemVer 版本比较 · 信用卡验证 · 按键信息 · 性能测试 · 计时器 · Alpha Hex · DNA 工具 · LESS 编译

## 🚀 一键部署

点击下方按钮即可将 S-Jiffy 部署到免费平台：

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/stop666two/S-Jiffy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/stop666two/S-Jiffy)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/stop666two/S-Jiffy)
[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deploy-blue?logo=github)](https://pages.github.com/)

### Cloudflare Pages 部署步骤

1. Fork 本仓库到你的 GitHub 账户
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**
4. 选择你 fork 的仓库
5. **Build settings**：
   - Framework preset: **None**
   - Build command: 留空
   - Build output directory: 留空（默认即为根目录）
6. 点击 **Save and Deploy**，无需构建，直接部署纯静态站点

### Netlify 部署步骤

1. 点击上方 **Deploy to Netlify** 按钮
2. 授权 Netlify 访问你的 GitHub
3. 保持默认设置（Publish directory 留空），点击 **Deploy**
4. 部署完成后自动获得 `*.netlify.app` 域名

### Vercel 部署步骤

1. 点击上方 **Deploy to Vercel** 按钮
2. 授权 Vercel 访问你的 GitHub
3. 默认配置无需修改（Framework Preset: **Other**）
4. 点击 **Deploy**，等待完成

### GitHub Pages 部署

1. Fork 或 clone 本仓库
2. 进入仓库 Settings → **Pages**
3. Source 选择 **Deploy from a branch** → Branch 选择 **main** → **/(root)**
4. 点击 **Save**，等待 1-2 分钟即可通过 `https://<你的用户名>.github.io/S-Jiffy/` 访问

> 所有平台均支持自动部署：推送代码到 main 分支后自动更新站点。

## 🚀 本地运行

### 方式一：直接打开

直接双击 `index.html` 即可浏览使用（部分工具可能需要本地服务器以正确加载字体等资源）。

### 方式二：本地服务器（推荐）

```bash
# 使用 Node.js
node server.js

# 或使用 Python
python -m http.server 8080

# 或使用 npx
npx http-server -p 8080
```

然后访问 `http://localhost:8080`

## 🛠️ 开发新工具

### 模板

每个工具是一个独立 HTML 文件，位于 `projects/<name>/index.html`。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>工具名 - S-Jiffy</title>
  <link rel="stylesheet" href="../../assets/css/global.css">
</head>
<body>
  <header class="global-header">
    <a href="../../index.html" class="logo">S-Jiffy</a>
  </header>

  <main class="tool-workspace">
    <h1>工具名</h1>
    <p class="tool-desc">工具描述</p>

    <!-- 输入区 -->
    <div class="card">
      <textarea id="inputText" class="input textarea js-focus-input" placeholder="输入..."></textarea>
    </div>

    <!-- 操作区 -->
    <div class="action-bar" style="display:flex; gap:12px; margin-bottom:24px;">
      <button id="actionBtn" class="btn btn-primary">执行</button>
      <button id="clearBtn" class="btn btn-secondary">清空</button>
    </div>

    <!-- 输出区 -->
    <div class="output-box">
      <span id="outputText" style="display:block; padding-right:60px;"></span>
      <button class="copy-btn" id="copyBtn">复制</button>
    </div>
  </main>

  <!-- 底栏 -->
  <footer class="global-footer">
    <div class="tool-status" id="statusBar"></div>
    <div>S-Jiffy · 即用即走</div>
  </footer>

  <script src="../../assets/js/global.js"></script>
  <script>
    (function() {
      // 使用 var / getElementById / function() 模式
      // 使用全局函数: setStatus() / copyToClipboard()
    })();
  </script>
</body>
</html>
```

### 开发规范

- **IIFE 包裹**：所有逻辑包裹在 `(function() { ... })()` 中，避免全局污染
- **var 声明**：使用 `var` 而非 `const`/`let`
- **getElementById**：使用 `document.getElementById()` 而非 `querySelector`
- **全局函数**：使用 `setStatus()` 提示状态，`copyToClipboard()` 复制
- **CSS 类名**：使用 `global.css` 中定义的 `.card` / `.input` / `.btn` / `.output-box` / `.copy-btn`
- **自动聚焦**：输入框添加 `js-focus-input` 类将自动聚焦
- **错误处理**：使用 `setStatus('错误信息', 'error')` 显示错误（红色文字），不弹窗

### Checklist

1. 在 `projects/` 下新建文件夹
2. 复制模板到 `projects/<name>/index.html`
3. 修改标题、描述、输入输出区、业务逻辑
4. 在 `index.html` 的 `tools` 数组中添加条目
5. 测试：自动聚焦/键盘交互/复制反馈/错误样式/移动端

## 📐 全局 API

### `copyToClipboard(text, buttonEl)`

复制文本到剪贴板，按钮显示"已复制"并禁用 2 秒后恢复。

### `setStatus(message, type)`

在底栏状态区显示消息。`type='error'` 显示红色，其他为灰色且 3 秒后自动消失。

### `savePreference(key, value)` / `loadPreference(key, defaultValue)`

使用 `localStorage` 持久化工具偏好设置，键名自动加 `s-jiffy:` 前缀。

## 🔧 本地服务器

`server.js` 是一个极简 Node.js 静态文件服务器，支持目录默认页 `index.html`。

```javascript
node server.js  # 监听 http://localhost:8080
```

## 📋 分类系统

25 个中文分类：编解码 / 加密哈希 / 文本处理 / 日期时间 / 网络工具 / 颜色工具 / 数学计算 / 格式转换 / 正则表达式 / 序列生成 / 数据处理 / 网址工具 / 代码美化 / 进制转换 / 单位换算 / 字符串 / 时间戳 / 随机生成 / 密码管理 / 安全工具 / 编程工具 / 前端开发 / 数据生成 / 文档工具 / 网页工具

## 📄 许可证

## ⚠️ 免责声明

所有工具的操作和计算均在浏览器本地完成，不会向任何服务器传输数据。由于浏览器环境差异和实现复杂度，极少情况下可能出现计算偏差或兼容性问题，请在使用后自行校验关键结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)，感谢配合！

## 📄 许可证

MIT License - 自由使用、修改和分发。仓库地址：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
