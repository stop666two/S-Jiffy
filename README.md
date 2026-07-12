# S-Jiffy · 即用即走工具集

> 轻量、瞬时的生产力工具，零登录零广告，打开即用，用完即走。
>
> 🌐 **GitHub**：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
>
> ⚠️ **免责声明**：所有操作均在浏览器本地完成，计算结果仅供参考。极少情况下可能出现兼容性或计算偏差，请自行校验结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)。

## 📦 项目概览

S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **311 个** 即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、网络计算、随机生成、编程开发等全领域。所有工具均为单页 HTML，无需构建、无需服务端、无需注册。

## ✨ 核心特性

- 即用即走 — 无需安装、无需注册、无广告
- 零框架依赖 — 纯 HTML + CSS + Vanilla JS
- 历史记录 — 自动记录使用历史（localStorage 持久化，网站更新不影响），支持全选/反选/单条删除/清空全部
- 智能搜索 — 按工具名称/描述/分类实时搜索，200ms 防抖，按匹配度排序
- 热门推荐 — 基于常见使用场景预置热门工具列表
- 全浏览器随机性 — 使用 `crypto.getRandomValues()` 实现密码学安全随机数
- 分类过滤 — 25 个中文分类，分类计数跟随当前视图动态更新
- 一键复制 — 所有工具结果区标配复制按钮
- 一键启动脚本 — 双击 `start-server.bat` 即可启动本地服务器并打开浏览器
- 极简商务风 — 等宽字体全局，纯黑/白/灰配色

## 🚀 一键部署

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/stop666two/S-Jiffy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/stop666two/S-Jiffy)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/stop666two/S-Jiffy)
[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deploy-blue?logo=github)](https://pages.github.com/)

## 📋 工具总览（311 个）

### 编解码 (17)
Base64 · Base32 · Base36 · Base45 · Base58 · Base62 · Base85 · Base91 · Base92 · Ascii85 · UUencode · Quoted-Printable · Bencode · Punycode · Morse 码 · Braille · Leetspeak

### 加密哈希 (16)
MD5 生成器 · SHA 计算器 · HMAC 生成器 · Hash 识别器 · 校验和计算器 · Hash 对比验证 · HMAC 验证 · RSA 密钥对生成 · BIP39 助记词 · 凯撒密码 · ROT13/47 · Atbash · XOR 加密 · Autokey · Playfair · Beaufort · Affine · Enigma 模拟

### 文本处理 (28)
文本统计 · 高级文本统计 · 字符频率分析 · 单词统计 · 文本对比 · 字符级对比 · 文本重复器 · 文本反转器 · 文本排序器 · 文本去重 · 行号添加 · 文本清洁器 · 文本对齐 · 文本换行 · 文本缩进 · 文本反缩进 · 填充补齐 · 正则替换 · 文本摘要 · 文本相似度 · 回文检测 · 变位词检测 · N-gram 生成 · ASCII 文字画 · Lorem Ipsum · Numeronym · 文本差异 · Markdown 转纯文本

### 日期时间 (18)
年龄计算器 · 日期差计算 · 日期加减 · 工作日计算 · 工时计算 · 时间间隔 · 时间推算 · 年度进度 · 闰年检测 · 日期纪年 · ISO 周数 · 倒计时 · 番茄钟 · 计时器 · 间歇计时 · 时区转换 · 日出日落 · 月相

### 网络工具 (16)
API 请求测试 · IP 段计算 · 带宽计算 · IPv4 子网 · IPv4 地址转换 · IPv4 范围展开 · IPv6 ULA 生成 · MAC 查找 · MAC 生成 · 我的 IP · IP 地理位置 · SSL 证书 · SafeLink 解码 · 在线率计算 · Gravatar · IP 随机生成

### 颜色工具 (22)
颜色转换(HEX/RGB/HSL/CMYK/HSV/OKLCH/LAB) · HSL 取色 · HSL 选择 · 色轮 · 调色板 · 颜色混合 · 颜色和谐 · 色温(K→RGB) · 颜色命名 · 颜色提取 · 色彩对比度(WCAG) · 色盲模拟 · 颜色预览 · 高级取色器 · 色盲测试 · RGB→HEX · HEX→RGB · HSL→HEX · HEX→HSL · CMYK 转换 · Alpha Hex

### 数学计算 (20)
进制转换(2-36) · 通用进制 · 数学表达式 · ETA 计算 · 百分比 · 质数检测 · 质数生成 · 斐波那契 · 数值序列 · 统计计算器 · GCD/LCM · 组合/排列 · 模运算 · 对数 · 舍入工具 · 分数转换 · 比率计算 · 随机整数 · 随机浮点 · Dice D&D

### 格式转换 (28)
JSON Formatter · JSON 压缩 · JSON 美化 · JSON 树查看 · JSON 对比 · JSON 合并 · JSON 排序 · JSON 扁平化 · JSONPath · JSON→CSV · JSON→XML · JSON→YAML · JSON→TOML · XML 格式化 · XML→JSON · YAML 查看 · YAML 验证 · YAML→JSON · YAML→TOML · TOML→JSON · TOML→YAML · CSV→JSON · CSV 美化 · CSV 验证 · CSV→Markdown · TSV 转换 · HTML→Markdown

### 序列生成 (7)
UUID v4 · UUID v1 · UUID v6 · ULID · NanoID · 自动递增序列 · API Key

### 数据处理 (10)
JSON Schema 验证 · JSON 转 TypeScript · HTML 净化 · 列表转换 · 数据存储 · 邮件规范化 · INI 转换 · SQL 查询生成 · HTML 表格提取 · XPath 查询

### 随机生成 (12)
随机整数 · 随机浮点 · 随机选择 · 随机十六进制颜色 · 随机 RGB 颜色 · 随机日期 · 随机时间 · 随机 IP · 随机邮箱 · 随机姓名 · 随机用户名 · 随机句子 · 随机 Emoji · 列表随机化 · 掷骰子 · 抛硬币 · 彩票生成

### 密码管理 (7)
密码生成器 · 密码强度 · 密码检测 · Token 生成 · 记忆密码 · PIN 码 · API Key

### 前端开发 (16)
CSS 选择器 · 渐变生成 · Box Shadow · Text Shadow · Border 生成 · Flexbox 生成 · CSS 动画 · 字体测试 · CSS 单位 · HSL 取色 · SVG 编辑 · SVG 占位 · 颜色拾取 · 颜色提取 · HTML 实时预览 · LESS 编译

### 单位换算 (12)
温度(8 种) · 长度 · 重量 · 体积 · 面积 · 速度 · 数据存储 · 数字格式化 · 字节格式化 · CSS 单位 · 时间单位

### 其他 Format/Utility
Text 美化(小型大写/泡泡字/全角半角/Zalgo/翻转/删除线) · Unicode 转义 · HTML 标签去除 · Slug · Emoji · 颜色方案 · 字符映射 · ASCII 表 · Unicode 查询 · 灰度 · 占位图

## 🚀 本地运行

```bash
node server.js
# 访问 http://localhost:8080
```

## ⚠️ 免责声明

所有工具的操作和计算均在浏览器本地完成，不会向任何服务器传输数据。由于浏览器环境差异和实现复杂度，极少情况下可能出现计算偏差或兼容性问题，请在使用后自行校验关键结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)，感谢配合！

## 📄 许可证

MIT License - 仓库地址：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
