# S-Jiffy · 即用即走工具集

> 轻量、瞬时的生产力工具，零登录零广告，打开即用，用完即走。
>
> 🌐 **GitHub**：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
>
> ⚠️ **免责声明**：所有操作均在浏览器本地完成，计算结果仅供参考。极少情况下可能出现兼容性或计算偏差，请自行校验结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)。

## 📦 项目概览

S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **461 个** 即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、网络计算、随机生成、代码生成、DevOps、编程辅助、安全工具等全领域。所有工具均为单页 HTML，无需构建、无需服务端、无需注册。

## ✨ 核心特性

- 即用即走 — 无需安装、无需注册、无广告
- 零框架依赖 — 纯 HTML + CSS + Vanilla JS
- 历史记录 — 自动记录使用历史（localStorage），支持管理/清除
- 智能搜索 — 按工具名称/描述/分类实时搜索
- 分类过滤 — 32 个分类，分类计数动态更新
- 一键复制 — 所有工具结果区标配复制按钮
- 一键启动 — 双击 `start.bat` 启动本地服务器

## 🚀 一键部署

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/stop666two/S-Jiffy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/stop666two/S-Jiffy)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/stop666two/S-Jiffy)
[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deploy-blue?logo=github)](https://pages.github.com/)

## 🚀 本地运行

```bash
# 方式一：双击 start.bat（自动打开浏览器）
start.bat

# 方式二：直接使用 Node.js
node server.js
# 访问 http://localhost:8080

# 方式三：使用任意静态服务器
npx serve .
```

## 📋 工具总览（461 个）

### 编解码 (20)
Base64 · Base32 · Base36 · Base45 · Base58 · Base62 · Base85 · Base91 · Base92 · Ascii85 · UUencode · Quoted-Printable · Bencode · Punycode · Morse 码 · Braille · Leetspeak · QR 码读取 · 图片转 Base64 · Data URI 生成

### 加密哈希 (22)
MD5 生成器 · SHA 计算器 · HMAC 生成器 · Hash 识别器 · 校验和计算器 · Hash 对比验证 · HMAC 验证 · RSA 密钥对生成 · BIP39 助记词 · 凯撒密码 · ROT13/47 · Atbash · XOR 加密 · Autokey · Playfair · Beaufort · Affine · Enigma 模拟 · SRI 哈希生成 · JWT 签名验证 · PGP 公钥解析 · X.509 证书解析

### 文本处理 (35)
文本统计 · 高级文本统计 · 字符频率分析 · 单词统计 · 文本对比 · 字符级对比 · 文本重复器 · 文本反转器 · 文本排序器 · 文本去重 · 行号添加 · 文本清洁器 · 文本对齐 · 文本换行 · 文本缩进 · 填充补齐 · 正则替换 · 文本摘要 · 字符串相似度 · 回文检测 · 变位词检测 · N-gram 生成 · ASCII 文字画 · Lorem Ipsum · Numeronym · 关键词提取 · 文本差异 · Markdown 转纯文本 · 查找替换 · 繁简体转换 · 中文数字转换 · 文字分栏 · 实时字数统计 · 文本规范化 · 引号转换

### 日期时间 (24)
年龄计算器 · 日期差计算 · 日期加减 · 工作日计算 · 工时计算 · 时间间隔 · 时间推算 · 年度进度 · 闰年检测 · 日期纪年 · ISO 周数 · 倒计时 · 番茄钟 · 计时器 · 间歇计时 · 时区转换 · 日出日落 · 月相 · 睡眠周期计算器 · 预产期计算 · 日期格式化器 · 星座查询 · 生肖年龄查询 · 目标心率计算器

### 网络工具 (26)
API 请求测试 · IP 段计算 · 带宽计算 · IPv4 子网 · IPv4 地址转换 · IPv4 范围展开 · IPv6 ULA 生成 · MAC 查找 · MAC 生成 · 我的 IP · IP 地理位置 · SSL 证书 · SafeLink 解码 · 在线率计算 · Gravatar · IP 随机生成 · 本机 IP 查询 · Nginx 配置生成 · WebSocket 测试 · GraphQL 查询构建 · CORS 检测 · HTTP 请求头构建 · Cookie 解析 · REST URI 模板 · DNS 查询 · 代理检测

### 颜色工具 (24)
颜色转换(HEX/RGB/HSL/CMYK/HSV/OKLCH/LAB) · HSL 取色 · HSL 选择 · 色轮 · 调色板 · 颜色混合 · 颜色和谐 · 色温(K→RGB) · 颜色命名 · 颜色提取 · 色彩对比度(WCAG) · 色盲模拟 · 颜色预览 · 高级取色器 · 色盲测试 · RGB→HEX · HEX→RGB · HSL→HEX · HEX→HSL · CMYK 转换 · Alpha Hex · 透明度取色器 · CSS 滤镜生成器 · 颜色 → Tailwind 色阶

### 数学计算 (31)
进制转换(2-36) · 通用进制 · 数学表达式 · ETA 计算 · 百分比 · 质数检测 · 质数生成 · 斐波那契 · 数值序列 · 统计计算器 · GCD/LCM · 组合/排列 · 模运算 · 对数 · 舍入工具 · 分数转换 · 比率计算 · 随机整数 · 随机浮点 · Dice D&D · BMI 计算器 · BMR 计算器 · 贷款计算器 · 投资回报计算器 · 折扣计算器 · 复利计算器 · 小费计算器 · 增值税计算器 · 理想体重计算器 · 体脂率估算 · 数字转英文

### 格式转换 (43)
JSON Formatter · JSON 压缩 · JSON 美化 · JSON 树查看 · JSON 对比 · JSON 合并 · JSON 排序 · JSON 扁平化 · JSONPath · JSON→CSV · JSON→XML · JSON→YAML · JSON→TOML · JSON→HTML 表格 · JSON→HTML 视图 · XML 格式化 · XML→JSON · YAML 查看 · YAML 验证 · YAML→JSON · YAML→TOML · TOML→JSON · TOML→YAML · CSV→JSON · CSV 美化 · CSV 验证 · CSV→Markdown · CSV→HTML · TSV 转换 · TSV→JSON · HTML→Markdown · HTML → JSX · HTML → Pug · Markdown → JSX · Markdown 表格 · CSS → Tailwind · CSS 内联样式 · CSS 前缀检查 · CSS → SCSS · SCSS → CSS 变量 · Properties → JSON · 环境变量转换 · 中文大写金额

### 序列生成 (10)
UUID v4 · UUID v1 · UUID v6 · ULID · NanoID · 自动递增序列 · API Key · UUID 生成器 · 序列生成器 · 安全令牌生成器

### 数据处理 (20)
JSON Schema 验证 · JSON 转 TypeScript · JSON → Go · JSON → Rust · JSON → Swift · JSON → Kotlin · JSON → Dart · JSON → Java · JSON → Python · JSON Schema → TS · 列表转换 · 数据存储 · 邮件规范化 · INI 转换 · SQL 查询生成 · SQL → MongoDB · HTML 表格提取 · XPath 查询 · Glob 模式匹配 · 文件魔术签名

### 代码生成 (20)
JSON → Go · JSON → Rust · JSON → Swift · JSON → Kotlin · JSON → Dart · JSON → Java · JSON → Python · HTML → JSX · CSS → Tailwind · Markdown → JSX · 内联样式转换 · CSS 前缀检查 · SCSS → CSS 变量 · JavaScript → TypeScript · HTML → Pug · SQL → MongoDB · CSS → SCSS · JSON Schema → TS · SVG → JSX · 颜色 → Tailwind 色阶

### 安全工具 (30)
HTML 净化器 · 基本认证生成 · Hash 对比 · 密码熵值 · 密码检测 · JWT 解析 · HMAC 验证 · CSP 策略构建 · CSP 策略验证 · CSP 报告生成 · XSS 编码器 · SQL 注入模式 · 安全头检测 · HSTS Preload · 点击劫持检测 · TOTP 验证码 · OAuth Token 解码 · OAuth2 流程 · CORS 检测 · TLS 密码套件 · PGP 公钥解析 · X.509 证书解析 · SSL 检查器 · Subresource Integrity · 信用卡验证 · IBAN 验证 · Chmod 计算 · SSH 密钥格式 · 哈希识别 · 熵值计算

### DevOps (15)
.gitignore 生成 · Dockerfile 生成 · docker-compose 片段 · K8s 资源生成 · Terraform 格式化 · CI/CD 配置助手 · Makefile 生成 · SemVer 版本递增 · Changelog 生成 · 分支名生成 · Dockerfile 检查 · package.json 分析 · 开源许可证生成 · 环境变量转换 · SSH 密钥格式

### 编程辅助 (15)
Big-O 速查表 · 位运算计算器 · 字节序转换 · 算法复杂度 · 字符码点查询 · 快捷键可视化 · 变量名生成器 · 代码注释去除 · 缩进转换 · 换行符转换 · 编码检测 · 布尔表达式简化 · IEEE 754 浮点数 · 补码计算器 · ANSI 转义码

### 随机生成 (22)
随机整数 · 随机浮点 · 随机选择 · 随机十六进制颜色 · 随机 RGB 颜色 · 随机日期 · 随机时间 · 随机 IP · 随机邮箱 · 随机姓名 · 随机用户名 · 随机句子 · 随机 Emoji · 列表随机化 · 掷骰子 · 抛硬币 · 彩票生成 · 决策助手 · 反应速度测试 · 记忆测试 · 打字速度测试 · 呼吸引导

### 密码管理 (9)
密码生成器 · 密码强度 · 密码检测 · Token 生成 · 记忆密码 · PIN 码 · API Key · 密码生成器 · OTP 生成器

### 前端开发 (24)
CSS 选择器 · 渐变生成 · Box Shadow · Text Shadow · Border 生成 · Flexbox 生成 · CSS 动画 · 字体测试 · CSS 单位 · HSL 取色 · SVG 编辑 · SVG 占位 · 颜色拾取 · 颜色提取 · HTML 实时预览 · LESS 编译 · CSS Grid 生成器 · CSS 滤镜生成器 · 缓动函数预览 · 透明度取色器 · CSS Transform 生成器 · Clip-Path 生成器 · 社交 Meta 预览 · 彩虹文字生成器

### 单位换算 (13)
温度(8 种) · 长度 · 重量 · 体积 · 面积 · 速度 · 数据存储 · 数字格式化 · 字节格式化 · CSS 单位 · 时间单位 · 油耗计算器 · 电费计算器

### 字符串 (12)
多语言字符串转义 · Unicode 归一化 · 缩写生成器 · 变量名生成 · 字符码点查询 · 编码检测 · 文字美化(小型大写/泡泡字/全角半角/Zalgo/翻转/删除线) · Unicode 转义 · Slug · 字符串相似度 · 数字转英文 · 列对齐

### 健康/生活 (14)
BMI 计算器 · BMR 计算器 · 理想体重计算器 · 体脂率估算 · 每日饮水计算 · 运动消耗计算 · 睡眠周期计算器 · 预产期计算 · 血液酒精估算 · 目标心率计算器 · 电费计算器 · 油耗计算器 · 星座查询 · 生肖年龄查询

### 待办/创意 (4)
简易待办清单 · 决策助手 · 彩虹文字生成器 · 呼吸引导

### 其他
Text 美化(小型大写/泡泡字/全角半角/Zalgo/翻转/删除线) · Unicode 转义 · HTML 标签去除 · Slug · Emoji · 颜色方案 · 字符映射 · ASCII 表 · Unicode 查询 · 灰度 · 占位图 · 差异百分比 · 列表合并 · 文本表格 · 缩写生成

## 🏗 项目结构

```
S-Jiffy/
├── index.html          # 首页（工具总览/搜索/分类）
├── assets/
│   ├── css/global.css  # 全局样式
│   └── js/global.js    # 全局 JS（工具函数/弹窗/历史记录）
├── projects/           # 461 个工具，每个独立目录
│   ├── age-calculator/
│   ├── base64/
│   ├── json-to-go/
│   ├── cicd-helper/
│   └── ...
├── start.bat           # 一键启动
├── server.js           # 开发服务器
├── netlify.toml        # Netlify 部署配置
└── README.md
```

## 🛠 添加新工具

每个工具是一个独立目录下的 `index.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>工具名 - S-Jiffy</title>
  <link rel="stylesheet" href="../../assets/css/global.css">
  <style>/* 工具专属样式 */</style>
</head>
<body>
  <header class="global-header">...</header>
  <main class="tool-workspace">...</main>
  <footer class="global-footer">...</footer>
  <script src="../../assets/js/global.js"></script>
  <script>(function(){ /* 工具逻辑 */ })();</script>
</body>
</html>
```

然后在 `index.html` 的 `tools` 数组中添加条目即可。

## ⚠️ 免责声明

所有工具的操作和计算均在浏览器本地完成，不会向任何服务器传输数据。由于浏览器环境差异和实现复杂度，极少情况下可能出现计算偏差或兼容性问题，请在使用后自行校验关键结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)，感谢配合！

## 📄 许可证

MIT License - 仓库地址：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
