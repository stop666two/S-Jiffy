# S-Jiffy · 即用即走工具集

> 轻量、瞬时的生产力工具，零登录零广告，打开即用，用完即走。
>
> 🌐 **GitHub**：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
>
> ⚠️ **免责声明**：所有操作均在浏览器本地完成，计算结果仅供参考。极少情况下可能出现兼容性或计算偏差，请自行校验结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)。

## 📦 项目概览

S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **591 个** 即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、数学计算、网络工具、随机生成、代码生成、DevOps、安全工具等 **34 个分类**。所有工具均为单页 HTML，无需构建、无需服务端、无需注册，打开即用。

## ✨ 核心特性

- 即用即走 — 无需安装、无需注册、无广告
- 零框架依赖 — 纯 HTML + CSS + Vanilla JS（ES5），无构建步骤
- 历史记录 — 自动记录使用历史（localStorage），支持管理/清除
- 智能搜索 — 按工具名称/描述/分类实时搜索，相关性排序
- 分类过滤 — 34 个分类，分类计数动态更新
- 一键复制 — 所有工具结果区标配复制按钮
- 六语言界面 — English / 简体中文 / 繁體中文（台灣）/ 繁體中文（香港）/ Español / 日本語，页面右上角随时切换，选择持久化，首次访问自动跟随浏览器语言
- 数学符号渲染 — 全局字体栈包含 Segoe UI Symbol / Cambria Math，公式符号（√∑π×÷≤≥±∞）在 Windows/macOS 均正确显示
- 一键启动 — 双击 `start.bat` 启动本地服务器

## 🚀 一键部署

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/stop666two/S-Jiffy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/stop666two/S-Jiffy)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/stop666two/S-Jiffy)
[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deploy-blue?logo=github)](https://pages.github.com/)

## 🚀 本地运行

```bash
# 方式一：双击 start.bat（自动启动服务器并打开浏览器）
start.bat

# 方式二：直接使用 Node.js
node server.js
# 访问 http://localhost:8080

# 方式三：使用任意静态服务器
npx serve .
```

## 🛡 技术架构与安全

- **纯静态零依赖** — 全部工具为单文件 HTML，无第三方框架、无运行时依赖；仅少数工具按需引用 CDN 白名单库（cdnjs / jsDelivr）
- **XSS 防护** — 全局 `htmlEscape()` 对所有用户输入渲染转义；动态 DOM 优先使用 `textContent` / `createElement`，不用 `innerHTML` 拼接
- **内容安全策略** — `netlify.toml` 配置 CSP（`default-src 'self'` + 白名单），生产环境启用 `upgrade-insecure-requests`，全站无混合内容
- **安全响应头** — `X-Content-Type-Options: nosniff`、`X-Frame-Options: DENY`、`Referrer-Policy: no-referrer`
- **本地服务器防护** — `server.js` 含路径穿越校验与畸形 URL 容错（非法编码返回 400，不崩溃）
- **数据隐私** — 所有计算均在浏览器本地完成，无任何数据上传；外部 API 调用仅限用户主动触发的少数工具（如「我的 IP」）
- **无障碍基础** — 语义化 HTML5 标签、键盘可聚焦控件、可见的 :focus 样式

## 📋 工具总览（591 个 / 34 类）

> 分类计数与工具清单由首页注册数据自动生成。

| 分类 | 数量 |
|---|---|---|---|
| 编程工具 | 116 | 数据处理 | 93 |
| 格式转换 | 84 | 数学计算 | 81 |
| 网页工具 | 73 | 安全工具 | 64 |
| 文档工具 | 58 | 文本处理 | 57 |
| 数据生成 | 57 | 网络工具 | 55 |
| 字符串 | 51 | 前端开发 | 49 |
| 日期时间 | 35 | 生活 | 35 |
| 代码生成 | 33 | 颜色工具 | 27 |
| 加密哈希 | 26 | 编解码 | 25 |
| 随机生成 | 25 | 传统文化 | 23 |
| DevOps | 20 | 代码美化 | 13 |
| 进制转换 | 11 | 单位换算 | 11 |
| 健康 | 11 | 序列生成 | 10 |
| 密码管理 | 9 | 网址工具 | 8 |
| 正则表达式 | 6 | 金融 | 5 |
| 游戏 | 4 | 时间戳 | 3 |
| 动画 | 3 | 购物 | 1 |
### 编程工具 (116)
.gitignore 生成 · 按键信息 · 本地存储查看器 · 编码检测 · 变量名生成器 · 补码计算器 · 布尔表达式简化 · 查找替换 · 大整数计算器 · 代码片段库 · 代码审查清单 · 代码语言检测器 · 代码注释去除 · 代码注释生成器 · 多语言字符串转义 · 分支名生成 · 复数计算器 · 换行符转换 · 矩阵计算器 · 开源许可证生成 · 快捷键可视化 · 浏览器特性检测 · 浏览器性能测试 · 内容协商测试 · 设备信息 · 算法复杂度 · 缩进转换 · 位运算计算器 · 文本对比 · 文本对比工具 · 行号添加器 · 正则表达式可视化 · 正则测试器 · 正则构建器 · 正则转义 · 字符级文本对比 · 字节序转换 · AI 提示词模板 · ANSI 转义码 · API 请求测试器 · Big-O 速查表 · Cache-Control 分析 · Changelog 生成 · Chmod 计算器 · CI/CD 配置助手 · Conventional Commits 速查 · Cron 表达式解析 · Cron 表达式验证 · CSP 报告配置生成 · CSP 策略验证 · CSS 选择器权重计算器 · CSV 验证器 · DNS 查询 · Docker Compose 转换器 · docker-compose 片段 · Dockerfile 检查 · Dockerfile 生成 · Git 备忘录 · Git 别名生成器 · Git 分支清理器 · Git 速查表 · Git 提交信息生成器 · Glob 模式匹配 · GraphQL 查询构建 · GraphQL Schema 转 TypeScript · HTTP 方法测试 · HTTP 请求头构建 · IEEE 754 浮点数 · JavaScript 格式化 · JavaScript 转 TypeScript · JS 数组方法速查 · JS 压缩 · JSON → Dart 类 · JSON → Go 结构体 · JSON → Kotlin 数据类 · JSON → Python 数据类 · JSON → Rust 结构体 · JSON → Swift 结构体 · JSON 扁平化 · JSON 对比 · JSON 合并 · JSON 键排序器 · JSON 验证器 · JSON 转 C# 类 · JSON 转 Java POJO · JSON 转 TypeScript · JSON Schema 验证器 · JSON Schema 转 TypeScript · JSONPath 提取 · K8s 资源生成 · LESS 变量替换 · Makefile 生成 · MongoDB 聚合管道构建器 · MySQL 函数速查 · Nginx 配置生成 · npm 版本范围解释器 · package.json 分析 · PostgreSQL 类型速查 · Python 速查卡 · REST URI 模板测试 · SemVer 版本比较 · SemVer 版本递增 · SQL 查询生成 · SQL 数据生成器 · SQL 语法检查 · SQL 注入模式参考 · SQL 转 Prisma · SQLite PRAGMA 速查 · SSH 密钥格式 · Terraform 格式化 · TypeScript 速查卡 · URL 模式匹配 · WebSocket 测试 · XPath 查询测试 · XSS 编码器 · YAML 验证器

### 数据处理 (93)
代码语言检测器 · 电话号码解析 · 分隔符检测器 · 加权平均计算器 · 剪贴板格式化器 · 列表合并工具 · 列表随机化 · 敏感信息扫描器 · 拍照工具 · 取整工具 · 日志分析器 · 十六进制查看器 · 实时字数统计 · 数据脱敏器 · 随机手机号生成 · 随机选择器 · 统计计算器 · 图片尺寸计算器 · 图片取色器 · 图片转 Base64 · 文本差异对比 · 文本排序器 · 文本统计 · 文本摘要生成器 · 文件魔术签名 · 线性回归计算器 · 信用卡号验证 · 印尼地区编码查询 · 邮箱地址规范化 · 在线录音 · 字符/词频分析器 · 字节格式化 · API Key 识别器 · ASCII 表格生成 · Base64 转图片 · Cookie 解析 · CSV → HTML 表格 · CSV 表格美化 · CSV 验证器 · CSV JSON 互转 · DNA 工具 · EXIF 查看器 · GCD/LCM 计算器 · Git 仓库健康检查 · Glob 模式匹配 · HTML 表格提取 · IBAN 验证器 · INI JSON 互转 · IP 地理定位 · JSON → HTML 表格 · JSON → HTML 视图 · JSON 扁平化 · JSON 查看器 · JSON 对比 · JSON 高级压缩 · JSON 格式化器 · JSON 合并 · JSON 键排序器 · JSON 美化 · JSON 压缩 · JSON 验证器 · JSON 转 CSV · JSON 转 TOML · JSON 转 XML · JSON 转 YAML · JSON Schema 验证器 · JSONPath 提取 · MAC 地址查询 · Markdown 表格生成 · N-gram 生成器 · package.json 分析 · Properties 转 JSON · SQL 查询生成 · SQL 格式化 · SQL 美化 · SQL 语法检查 · SQL 转 MongoDB · TOML 转 JSON · TOML 转 YAML · TSV · CSV · JSON · TSV 转 JSON · ULID 生成器 · Unicode 长度计算器 · UUID 生成器 · UUID v1 生成器 · UUID v6 生成器 · XML 格式化器 · XML 转 JSON · XPath 查询测试 · YAML 查看器 · YAML 验证器 · YAML 转 JSON · YAML 转 TOML

### 格式转换 (84)
编码转换器 · 分数转换器 · 环境变量转换 · 换行符转换 · 列表格式转换 · 罗马数字转换器 · 盲文转换 · 面积单位转换 · 命名风格转换器 · 配置格式互转 · 全角半角转换 · 日期格式化器 · 色温 · 时间戳格式化工具 · 时间戳转换器 · 时区转换 · 视频剪切 · 数据存储单位转换 · 数字格式化器 · 速度单位转换 · 缩进转换 · 体积单位转换 · 温度转换器 · 文本与 Unicode 互转 · 文本转北约音标字母 · 小型大写 · 颜色转换器 · 长度单位转换 · 重量单位转换 · Alpha Hex 转换 · Ascii85 编解码 · Base32 编解码 · Base45 编解码 · Base58 编解码 · Base64 编解码 · Base85 编解码 · Base91 编解码 · Base92 编解码 · Bencode 编解码 · CMYK 转换器 · CSS 转 SCSS · CSV → HTML 表格 · CSV 表格美化 · CSV 转 Markdown · CSV JSON 互转 · Docker Compose 转换器 · GraphQL Schema 转 TypeScript · gRPC JSON 互转 · HEX 转 HSL · HEX 转 RGB · HSL 转 HEX · HTML 实体 · HTML 转 Markdown · HTML 转 Pug · INI JSON 互转 · JSON → HTML 表格 · JSON 转 C# 类 · JSON 转 CSV · JSON 转 TOML · JSON 转 TypeScript · JSON 转 XML · JSON 转 YAML · Markdown 表格格式化器 · Markdown 转 HTML · Markdown 转纯文本 · MessagePack 编解码 · Properties 转 JSON · Protobuf JSON 互转 · Quoted-Printable 编解码 · RGB 转 HEX · SCSS → CSS 变量 · SQL 转 MongoDB · SQL 转 Prisma · TOML 转 JSON · TOML 转 YAML · TSV · CSV · JSON · TSV 转 JSON · Unicode 归一化 · Unicode 转义 · URL 编码/解码 · UUencode 编解码 · XML 转 JSON · YAML 转 JSON · YAML 转 TOML

### 数学计算 (81)
百分比计算器 · 比例计算器 · 补码计算器 · 布尔表达式简化 · 差异百分比 · 大整数计算器 · 带宽计算器 · 贷款计算器 · 电费计算器 · 对数计算器 · 斐波那契数列生成器 · 分数转换器 · 复利计算器 · 复数计算器 · 工时计算 · 工作日计算器 · 计时器 · 加权平均计算器 · 加权随机选择器 · 进制转换 · 进制转换进阶 · 矩阵计算器 · 距离计算器 · 科学计数法转换器 · 理想体重计算器 · 列表合并工具 · 浏览器性能测试 · 密码破解时间估算 · 模运算计算器 · 目标心率计算器 · 年龄计算器 · 排序算法可视化 · 抛硬币 · 取整工具 · 日期差计算 · 日期计算 · 日期纪年 · 闰年检测 · 时间间隔 · 数列生成器 · 数学计算器 · 数字格式化器 · 数字转英文 · 算法复杂度 · 随机浮点数生成器 · 随机数生成器 · 随机整数生成器 · 体脂率估算 · 通用进制转换 · 统计计算器 · 投资回报计算器 · 位运算计算器 · 线性回归计算器 · 小费计算器 · 性能预算计算器 · 油耗计算器 · 运动消耗计算 · 在线率计算器 · 增值税计算器 · 折扣计算器 · 正态分布计算器 · 质数检测器 · 质数生成器 · 质因数分解器 · 掷骰子 · 中文数字转换 · 子网计算器 · 字符串相似度 · 组合与排列 · BMI 计算器 · BMR 计算器 · D&D 骰子 · ETA 计算器 · GCD/LCM 计算器 · IEEE 754 浮点数 · IP 段计算器 · IPv4 范围展开 · IPv4 子网计算器 · ISO 周数 · SemVer 版本比较 · SemVer 版本递增

### 网页工具 (73)
按键信息 · 百分比计算器 · 本地存储查看器 · 比例计算器 · 车牌号归属地查询 · 打字速度测试 · 代理检测 · 倒计时器 · 对数计算器 · 番茄钟 · 反应速度测试 · 高级拾色器 · 呼吸引导 · 计时器与秒表 · 记忆测试 · 间歇计时器 · 简易待办清单 · 浏览器特性检测 · 模运算计算器 · 摩斯音频 · 年度进度 · 拍照工具 · 屏幕分辨率速查 · 日出日落时间 · 色彩对比度 · 色轮工具 · 色盲测试图 · 色盲模拟器 · 设备信息 · 社交 Meta 预览 · 视口尺寸工具 · 数学计算器 · 条码生成器 · 我的 IP · 星座查询 · 颜色混合器 · 月相 · 在线画板 · 在线录音 · 在线闹钟 · 质数检测器 · 字体测试 · ANSI 转义码 · CSS 选择器测试 · CSS 选择器生成器 · Data URI 生成 · Emoji 搜索 · Emoji 选择器 · EXIF 查看器 · Gravatar 生成器 · HSL 取色器 · HSL 颜色选择器 · HTML 编辑器 · HTML 标签去除 · HTML 表格提取 · HTML 净化器 · HTML 实时预览 · HTML 实体 · HTML 实体参考 · HTML 实体查询 · HTML 转 Markdown · JSON → HTML 视图 · JSON 查看器 · Markdown 预览 · Meta 标签生成器 · QR 码读取器 · QR 码生成器 · SSE 事件流测试器 · SVG 编辑器 · URL 解析器 · User Agent · User-Agent 解析器 · YAML 查看器

### 安全工具 (64)
2FA 备份码生成器 · 安全令牌生成器 · 安全头检测 · 点击劫持检测 · 哈希对比 · 哈希生成器 · 加密便签 · 加密工具 · 加密算法对比 · 密码检测器 · 密码破解时间估算 · 密码强度分析 · 敏感信息扫描器 · 熵值计算 · 数据脱敏器 · 数字签名验证 · 校验和计算器 · 信用卡号验证 · 字符串混淆器 · Affine 密码 · API Key 生成器 · API Key 识别器 · Atbash 密码 · Autokey 密码 · Basic Auth 生成器 · Beaufort 密码 · BIP39 助记词生成器 · Chmod 计算器 · CORS 检测 · CSP 报告配置生成 · CSP 策略构建器 · CSP 策略验证 · CSRF 防护生成器 · Enigma 模拟器 · Hash 识别器 · hashcat 模式速查 · HMAC 生成器 · HMAC 验证器 · HSTS Preload 检查 · HTML 净化器 · IBAN 验证器 · JWT 解析器 · JWT 签名验证 · MD5 生成器 · OAuth Token 解码 · OAuth2 授权流程 · OTP 生成器 · PGP 公钥解析 · Playfair 密码 · Rail Fence 密码 · ROT 密码 · RSA 密钥对生成器 · Safelink 解码 · SQL 注入模式参考 · SRI 哈希生成 · SSH 密钥格式 · SSL 证书检测 · TLS 密码套件查询 · TOTP 验证码生成 · URL 跟踪参数清理器 · Vigenère 密码 · X.509 证书解析 · XOR 加密 · XSS 编码器

### 文档工具 (58)
.gitignore 生成 · 部署检查清单 · 常用端口速查 · 代码审查清单 · 单词统计器 · 分支名生成 · 高级文本统计 · 关键词提取 · 加密算法对比 · 开发者每日清单 · 开源许可证生成 · 快捷键可视化 · 论语全文 · 名人名言 · 数字签名验证 · 文件魔术签名 · 文字分栏 · 无障碍检查清单 · 歇后语大全 · 演讲时长估算 · 正则表达式备忘录 · 周易六十四卦 · 字符码点查询 · 字符映射表 · AI 提示词模板 · ASCII 表 · Big-O 速查表 · Changelog 生成 · Conventional Commits 速查 · CSS 颜色名称 · CSV 转 Markdown · Git 备忘录 · Git 速查表 · Git 提交信息生成器 · hashcat 模式速查 · HTML 实体参考 · HTML 实体查询 · HTTP 状态码 · JS 数组方法速查 · Markdown 表格格式化器 · Markdown 表格生成 · Markdown 目录生成器 · Markdown 速查卡 · Markdown 预览 · Markdown 转 HTML · Markdown 转纯文本 · MIME 类型 · MIME 类型查询 · MySQL 函数速查 · npm 版本范围解释器 · OpenAPI 查看器 · PostgreSQL 类型速查 · Python 速查卡 · README 生成器 · Redis 命令速查 · SQLite PRAGMA 速查 · TypeScript 速查卡 · Unicode 查找

### 文本处理 (57)
变位词检测器 · 部首查字 · 查找替换 · 差异百分比 · 代码注释去除 · 单词统计器 · 电话号码解析 · 繁简体转换 · 高级文本统计 · 关键词提取 · 汉字偏旁查询 · 回文检测器 · 剪贴板格式化器 · 列表格式转换 · 列对齐工具 · 模板替换器 · 摩斯密码 · 实时字数统计 · 缩写生成器 · 文本差异对比 · 文本对比 · 文本对比工具 · 文本反转器 · 文本分块器 · 文本规范化 · 文本换行工具 · 文本换行器 · 文本解包器 · 文本排序器 · 文本清理器 · 文本去重 · 文本缩进器 · 文本填充器 · 文本统计 · 文本摘要生成器 · 文本重复器 · 文件名重命名器 · 文字分栏 · 行编辑器 · 行号添加器 · 演讲时长估算 · 引号转换 · 邮箱地址规范化 · 正则替换 · 字符/词频分析器 · 字符串相似度 · 字符级文本对比 · ASCII 表格生成 · ASCII 文字画 · DNA 工具 · HTML 标签去除 · Lorem Ipsum 按词生成 · Lorem Ipsum 生成器 · Markdown 目录生成器 · Markdown 速查卡 · N-gram 生成器 · Numeronym 生成器

### 数据生成 (57)
安全令牌生成器 · 变量名生成器 · 变位词检测器 · 彩虹文字生成器 · 彩票号码生成器 · 调色板生成器 · 翻转文本 · 徽章生成器 · 渐变生成器 · 密码生成器 · 泡泡字 · 配色方案生成 · 日历生成器 · 删除线生成 · 随机 Emoji 生成器 · 随机句子生成器 · 随机日期生成器 · 随机时间生成器 · 随机手机号生成 · 随机姓名生成器 · 随机用户名生成器 · 随机邮箱生成器 · 条码生成器 · 图标生成器 · 颜色和谐配色 · 易记密码生成器 · 正态分布计算器 · API Key 生成器 · ASCII 文字画 · Border 生成器 · Box Shadow 生成器 · Clip-Path 生成器 · Crontab 生成器 · CSS 动画生成器 · CSS 滤镜生成器 · CSS Grid 生成器 · CSS Transform 生成器 · Flexbox 生成器 · HTML 表格生成 · IPv6 ULA 生成器 · Leet 语转换 · Lorem Ipsum 按词生成 · Lorem Ipsum 生成器 · Lorem Pixel 占位图 · MAC 地址生成器 · Meta 标签生成器 · NanoID 生成器 · Numeronym 生成器 · OG 分享图生成器 · PIN 码生成器 · QR 码生成器 · SQL 数据生成器 · SVG 占位图生成器 · Text Shadow 生成器 · Webhook 负载生成器 · WiFi QR 码生成器 · Zalgo 文本

### 网络工具 (55)
安全头检测 · 常用端口速查 · 代理检测 · 带宽计算器 · 点击劫持检测 · 内容协商测试 · 随机 IP 生成器 · 随机端口生成器 · 我的 IP · 印尼地区编码查询 · 子网计算器 · API 请求测试器 · API 请求签名器 · Basic Auth 生成器 · Cache-Control 分析 · Cookie 解析 · CORS 检测 · CSP 策略构建器 · DNS 查询 · GraphQL 查询构建 · Gravatar 生成器 · gRPC JSON 互转 · HSTS Preload 检查 · HTTP 方法测试 · HTTP 请求头构建 · HTTP 状态码 · IP 地理定位 · IP 段计算器 · IP 格式转换 · IPv4 地址转换器 · IPv4 范围展开 · IPv4 子网计算器 · IPv6 ULA 生成器 · MAC 地址查询 · MAC 地址生成器 · MIME 类型 · MIME 类型查询 · Mock API 设计器 · Nginx 配置生成 · OAuth Token 解码 · OAuth2 授权流程 · OpenAPI 查看器 · Redis 命令速查 · REST CRUD 脚手架 · REST URI 模板测试 · SSE 事件流测试器 · SSL 证书检测 · TLS 密码套件查询 · URL 查询参数构建器 · URL 模式匹配 · User Agent · User-Agent 解析器 · Webhook 负载生成器 · WebSocket 测试 · WiFi QR 码生成器

### 字符串 (51)
编码检测 · 彩虹文字生成器 · 多语言字符串转义 · 翻转文本 · 繁简体转换 · 回文检测器 · 列对齐工具 · 罗马数字转换器 · 盲文转换 · 命名风格转换器 · 模板替换器 · 泡泡字 · 全角半角转换 · 删除线生成 · 数字转英文 · 随机字符串生成器 · 缩写生成器 · 文本反转器 · 文本分块器 · 文本规范化 · 文本换行工具 · 文本换行器 · 文本解包器 · 文本清理器 · 文本去重 · 文本缩进器 · 文本填充器 · 文本与 Unicode 互转 · 文本与二进制互转 · 文本重复器 · 文本转北约音标字母 · 文件名重命名器 · 小型大写 · 行编辑器 · 引号转换 · 中文大写金额 · 中文数字转换 · 字符串混淆器 · 字符串转 Slug · 字符码点查询 · 字符映射表 · ASCII 表 · Emoji 搜索 · Emoji 选择器 · Leet 语转换 · Unicode 查找 · Unicode 归一化 · Unicode 长度计算器 · Unicode 转义 · URL Slug 生成 · Zalgo 文本

### 前端开发 (49)
缓动函数预览 · 徽章生成器 · 媒体查询生成器 · 屏幕分辨率速查 · 社交 Meta 预览 · 视口尺寸工具 · 透明度取色器 · 图标生成器 · 图片尺寸计算器 · 无障碍检查清单 · 性能预算计算器 · 颜色 → Tailwind 色阶 · 字体测试 · Border 生成器 · Box Shadow 生成器 · Clip-Path 生成器 · CSS 变量提取器 · CSS 单位转换 · CSS 动画生成器 · CSS 格式化 · CSS 滤镜生成器 · CSS 内联样式转换 · CSS 前缀检查器 · CSS 选择器测试 · CSS 选择器权重计算器 · CSS 选择器生成器 · CSS 压缩 · CSS 遮罩生成器 · CSS 转 SCSS · CSS 转 Tailwind · CSS Grid 生成器 · CSS Transform 生成器 · Flexbox 生成器 · HTML 编辑器 · HTML 表格生成 · HTML 实时预览 · HTML 压缩 · HTML 转 JSX · HTML 转 Pug · LESS 变量替换 · Lorem Pixel 占位图 · Markdown 转 JSX · OG 分享图生成器 · SCSS → CSS 变量 · SVG 编辑器 · SVG 占位图生成器 · SVG 转 JSX · Tailwind 配置生成器 · Text Shadow 生成器

### 日期时间 (35)
倒计时器 · 番茄钟 · 工时计算 · 工作日计算器 · 计时器 · 计时器与秒表 · 间歇计时器 · 跨时区会议安排器 · 老黄历 · 年度进度 · 年龄计算器 · 日出日落时间 · 日历生成器 · 日期差计算 · 日期格式化器 · 日期计算 · 日期纪年 · 日期序列生成器 · 闰年检测 · 生肖年龄查询 · 时间单位转换器 · 时间间隔 · 时间推算 · 时区转换 · 万年历 · 预产期计算 · 月相 · 在线率计算器 · 在线闹钟 · 中国节假日速查 · Cron 表达式解析 · Cron 表达式验证 · Crontab 生成器 · ETA 计算器 · ISO 周数

### 生活 (35)
部首查字 · 财神灵签 · 车公灵签 · 车牌号归属地查询 · 答案之书 · 电费计算器 · 电子木鱼 · 佛祖灵签 · 关帝灵签 · 观音灵签 · 汉字偏旁查询 · 黄大仙灵签 · 简易待办清单 · 决策助手 · 开发者每日清单 · 跨时区会议安排器 · 六爻排盘 · 吕祖灵签 · 每日饮水计算 · 生肖年龄查询 · 世界各国国旗 · 视频剪切 · 睡眠周期计算器 · 土地公灵签 · 王公灵签 · 小费计算器 · 星座查询 · 血液酒精估算 · 油耗计算器 · 玉帝灵签 · 月老灵签 · 在线鼓机 · 在线画板 · 中国节假日速查 · 周公灵签

### 代码生成 (33)
.htaccess 生成器 · 代码片段库 · 代码注释生成器 · 媒体查询生成器 · Ansible Playbook 生成器 · Caddy 配置生成器 · CSRF 防护生成器 · CSS 内联样式转换 · CSS 前缀检查器 · CSS 遮罩生成器 · CSS 转 Tailwind · EditorConfig 生成器 · Git 别名生成器 · HTML 转 JSX · JavaScript 转 TypeScript · JSON → Dart 类 · JSON → Go 结构体 · JSON → Kotlin 数据类 · JSON → Python 数据类 · JSON → Rust 结构体 · JSON → Swift 结构体 · JSON 转 Java POJO · JSON Schema 转 TypeScript · Markdown 转 JSX · Mock API 设计器 · MongoDB 聚合管道构建器 · Prometheus 构建器 · README 生成器 · REST CRUD 脚手架 · SVG 转 JSX · systemd 单元生成器 · systemd 定时器生成器 · Tailwind 配置生成器

### 颜色工具 (27)
调色板生成器 · 高级拾色器 · 渐变生成器 · 配色方案生成 · 色彩对比度 · 色轮工具 · 色盲测试图 · 色盲模拟器 · 色温 · 随机 Hex 颜色生成器 · 随机 RGB 颜色生成器 · 透明度取色器 · 图片取色器 · 颜色 → Tailwind 色阶 · 颜色和谐配色 · 颜色混合器 · 颜色转换器 · Alpha Hex 转换 · CMYK 转换器 · CSS 颜色名称 · HEX 转 HSL · HEX 转 RGB · Hex RGB Decimal 转换 · HSL 取色器 · HSL 颜色选择器 · HSL 转 HEX · RGB 转 HEX

### 加密哈希 (26)
哈希对比 · 哈希生成器 · 加密工具 · 校验和计算器 · Affine 密码 · API 请求签名器 · Atbash 密码 · Autokey 密码 · Beaufort 密码 · BIP39 助记词生成器 · Enigma 模拟器 · Hash 识别器 · HMAC 生成器 · HMAC 验证器 · JWT 解析器 · JWT 签名验证 · MD5 生成器 · PGP 公钥解析 · Playfair 密码 · Rail Fence 密码 · ROT 密码 · RSA 密钥对生成器 · SRI 哈希生成 · Vigenère 密码 · X.509 证书解析 · XOR 加密

### 编解码 (25)
编码转换器 · 分隔符检测器 · 摩斯密码 · 摩斯音频 · 十六进制查看器 · 图片转 Base64 · Ascii85 编解码 · Base32 编解码 · Base36 编解码 · Base45 编解码 · Base58 编解码 · Base62 编解码 · Base64 编解码 · Base64 转图片 · Base85 编解码 · Base91 编解码 · Base92 编解码 · Bencode 编解码 · Data URI 生成 · MessagePack 编解码 · Protobuf JSON 互转 · Punycode 转换 · QR 码读取器 · Quoted-Printable 编解码 · UUencode 编解码

### 随机生成 (25)
2FA 备份码生成器 · 彩票号码生成器 · 加权随机选择器 · 决策助手 · 列表随机化 · 抛硬币 · 随机 Emoji 生成器 · 随机 Hex 颜色生成器 · 随机 IP 生成器 · 随机 RGB 颜色生成器 · 随机端口生成器 · 随机浮点数生成器 · 随机句子生成器 · 随机日期生成器 · 随机时间生成器 · 随机数生成器 · 随机姓名生成器 · 随机选择器 · 随机用户名生成器 · 随机邮箱生成器 · 随机整数生成器 · 随机字符串生成器 · 掷骰子 · 组合与排列 · D&D 骰子

### 传统文化 (23)
财神灵签 · 车公灵签 · 答案之书 · 电子木鱼 · 佛祖灵签 · 关帝灵签 · 观音灵签 · 黄大仙灵签 · 老黄历 · 六爻排盘 · 吕祖灵签 · 论语全文 · 名人名言 · 世界各国国旗 · 土地公灵签 · 万年历 · 王公灵签 · 歇后语大全 · 旋转太极图 · 玉帝灵签 · 月老灵签 · 周公灵签 · 周易六十四卦

### DevOps (20)
.htaccess 生成器 · 部署检查清单 · 环境变量转换 · 配置格式互转 · 日志分析器 · Ansible Playbook 生成器 · Caddy 配置生成器 · CI/CD 配置助手 · docker-compose 片段 · Dockerfile 检查 · Dockerfile 生成 · EditorConfig 生成器 · Git 仓库健康检查 · Git 分支清理器 · K8s 资源生成 · Makefile 生成 · Prometheus 构建器 · systemd 单元生成器 · systemd 定时器生成器 · Terraform 格式化

### 代码美化 (13)
CSS 变量提取器 · CSS 格式化 · CSS 压缩 · HTML 压缩 · JavaScript 格式化 · JS 压缩 · JSON 高级压缩 · JSON 格式化器 · JSON 美化 · JSON 压缩 · SQL 格式化 · SQL 美化 · XML 格式化器

### 进制转换 (11)
进制转换 · 进制转换进阶 · 科学计数法转换器 · 通用进制转换 · 文本与二进制互转 · 字节序转换 · Base36 编解码 · Base62 编解码 · Hex RGB Decimal 转换 · IP 格式转换 · IPv4 地址转换器

### 单位换算 (11)
距离计算器 · 面积单位转换 · 时间单位转换器 · 数据存储单位转换 · 速度单位转换 · 体积单位转换 · 温度转换器 · 长度单位转换 · 重量单位转换 · 字节格式化 · CSS 单位转换

### 健康 (11)
呼吸引导 · 理想体重计算器 · 每日饮水计算 · 目标心率计算器 · 睡眠周期计算器 · 体脂率估算 · 血液酒精估算 · 预产期计算 · 运动消耗计算 · BMI 计算器 · BMR 计算器

### 序列生成 (10)
斐波那契数列生成器 · 日期序列生成器 · 数列生成器 · 质数生成器 · 质因数分解器 · NanoID 生成器 · ULID 生成器 · UUID 生成器 · UUID v1 生成器 · UUID v6 生成器

### 密码管理 (9)
加密便签 · 密码检测器 · 密码强度分析 · 密码生成器 · 熵值计算 · 易记密码生成器 · OTP 生成器 · PIN 码生成器 · TOTP 验证码生成

### 网址工具 (8)
字符串转 Slug · Punycode 转换 · Safelink 解码 · URL 编码/解码 · URL 查询参数构建器 · URL 跟踪参数清理器 · URL 解析器 · URL Slug 生成

### 正则表达式 (6)
正则表达式备忘录 · 正则表达式可视化 · 正则测试器 · 正则构建器 · 正则替换 · 正则转义

### 金融 (5)
贷款计算器 · 复利计算器 · 投资回报计算器 · 增值税计算器 · 中文大写金额

### 游戏 (4)
打字速度测试 · 反应速度测试 · 记忆测试 · 在线鼓机

### 时间戳 (3)
时间戳格式化工具 · 时间戳转换器 · 时间推算

### 动画 (3)
缓动函数预览 · 排序算法可视化 · 旋转太极图

### 购物 (1)
折扣计算器

## 🚀 新增 31 个工具（2026-08）

本批次新增传统文化与实用工具，按主题分为 5 组：

### 传统文化·灵签
月老灵签 · 财神灵签 · 黄大仙灵签 · 吕祖灵签 · 关帝灵签 · 周公灵签 · 观音灵签 · 车公灵签 · 土地公灵签 · 王公灵签 · 玉帝灵签 · 佛祖灵签

### 文化阅读
论语全文 · 歇后语大全 · 名人名言 · 世界各国国旗 · 答案之书 · 周易六十四卦

### 历法
万年历 · 老黄历

### 玄学
六爻排盘 · 旋转太极图 · 电子木鱼

### 实用
在线闹钟 · 在线画板 · 汉字偏旁查询 · 部首查字 · 在线鼓机 · 视频剪切

## 🚀 新增 100 个工具（2026-08）

本批次新增 100 个程序员高频工具，按主题分为 10 组：

### 前端开发
图标生成器 · OG 分享图生成器 · CSS 遮罩生成器 · CSS 选择器权重计算器 · CSS 变量提取器 · 媒体查询生成器 · CSS 选择器生成器 · Tailwind 配置生成器 · 性能预算计算器 · 无障碍检查清单

### API 与网络
OpenAPI 查看器 · REST CRUD 脚手架 · gRPC JSON 互转 · API 请求签名器 · Webhook 负载生成器 · Mock API 设计器 · GraphQL 转 TS · 常用端口速查 · SSE 事件流测试 · URL 查询参数构建

### 后端与数据库
Redis 命令速查 · MongoDB 聚合管道构建器 · Protobuf JSON 互转 · MessagePack 编解码 · SQL 转 Prisma · PostgreSQL 类型速查 · MySQL 函数速查 · SQLite PRAGMA 速查 · SQL 数据生成器 · 配置格式互转

### DevOps 与基础设施
systemd 单元生成器 · systemd 定时器生成器 · Caddy 配置生成器 · .htaccess 生成器 · EditorConfig 生成器 · 徽章生成器 · Ansible Playbook 生成器 · Prometheus 构建器 · 部署检查清单 · 日志分析器

### Git 与协作
Git 别名生成器 · Markdown 目录生成器 · README 生成器 · 代码注释生成器 · 代码审查清单 · npm 版本范围解释器 · Git 仓库健康检查 · Git 分支清理器 · Conventional Commits 速查 · Markdown 表格格式化

### 安全
hashcat 模式速查 · 密码破解时间估算 · 敏感信息扫描器 · 2FA 备份码生成器 · URL 跟踪参数清理器 · CSRF 防护生成器 · 加密算法对比 · API Key 识别器 · 数据脱敏器 · 加密便签

### 文本与编码
十六进制查看器 · 行编辑器 · 文件名重命名器 · 代码语言检测器 · 演讲时长估算 · 文本分块器 · 分隔符检测器 · 编码转换器 · 模板替换器 · Unicode 长度计算器

### 数学
正态分布计算器 · 矩阵计算器 · 复数计算器 · 大整数计算器 · 线性回归计算器 · 科学计数法转换器 · 加权平均计算器 · 加权随机选择器 · 质因数分解器 · 距离计算器

### 时间与效率
日历生成器 · 时间单位转换器 · 日期序列生成器 · 中国节假日速查 · 跨时区会议安排器 · Markdown 速查卡 · JS 数组方法速查 · TypeScript 速查卡 · Python 速查卡 · AI 提示词模板

### 浏览器与杂项
本地存储查看器 · 浏览器特性检测 · 视口尺寸工具 · 屏幕分辨率速查 · 排序算法可视化 · 代码片段库 · 图片尺寸计算器 · EXIF 查看器 · 剪贴板格式化器 · 开发者每日清单

项目结构

```
S-Jiffy/
├── index.html          # 首页（工具总览/搜索/分类，591 个工具注册）
├── favicon.svg         # 站点图标
├── assets/
│   ├── css/global.css  # 全局样式（CSS 变量主题/组件类/数学符号字体栈）
│   └── js/global.js    # 全局 JS（htmlEscape/弹窗/复制/历史记录）
├── projects/           # 591 个工具，每个独立目录
│   ├── age-calculator/
│   ├── base64/
│   ├── json-to-go/
│   └── ...
├── start.bat           # 一键启动（自动打开浏览器）
├── server.js           # 开发服务器（路径穿越校验/畸形 URL 容错）
├── netlify.toml        # Netlify 部署配置（CSP/安全响应头）
├── .gitignore          # 忽略规则（临时脚本/DB/IDE 等）
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
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
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

新工具开发规范：

- **零依赖** — 不引入框架；如需库，仅限 CDN 白名单（cdnjs / jsDelivr）并内置降级提示
- **六语言界面** — 界面文案、状态提示、错误信息默认使用中文（技术缩写如 Base64/JSON 可保留）；如需接入多语言，页面元素加 `data-i18n` 属性并提供 `assets/i18n/<lang>/<slug>.json` 词典，未本地化的页面自动保留中文原文
- **XSS 防护** — 用户输入渲染一律经 `htmlEscape()` 或 `textContent`
- **ES5 兼容** — 不使用箭头函数/模板字符串等 ES6+ 语法，保持零构建直接运行
- **数学符号** — 公式中的特殊符号（√∑π×÷≤≥）依赖全局字体栈，无需额外处理；长根号需使用覆盖线结构（参照 distance-calculator）
- **注册** — 在 `index.html` 的 `tools` 数组（含 name/desc/link/cats）与 `categories` 数组（如需新分类）中添加条目，name 须与页面 `<title>` 一致

## 📜 更新日志

所有重要变更记录在 [CHANGELOG.md](CHANGELOG.md)。

## ⚠️ 免责声明

所有工具的操作和计算均在浏览器本地完成，不会向任何服务器传输数据。由于浏览器环境差异和实现复杂度，极少情况下可能出现计算偏差或兼容性问题，请在使用后自行校验关键结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)，感谢配合！

## 📄 许可证

MIT License - 仓库地址：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
