# S-Jiffy · 即用即走工具集

> 轻量、瞬时的生产力工具，零登录零广告，打开即用，用完即走。
>
> 🌐 **GitHub**：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
>
> ⚠️ **免责声明**：所有操作均在浏览器本地完成，计算结果仅供参考。极少情况下可能出现兼容性或计算偏差，请自行校验结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)。

## 📦 项目概览

S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **550 个** 即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、数学计算、网络工具、随机生成、代码生成、DevOps、安全工具、图片处理、音频处理等 **36 个分类**。所有工具均为单页 HTML，无需构建、无需服务端、无需注册，打开即用。

## ✨ 核心特性

- 即用即走 — 无需安装、无需注册、无广告
- 零框架依赖 — 纯 HTML + CSS + Vanilla JS（ES5），无构建步骤
- 历史记录 — 自动记录使用历史（localStorage），支持管理/清除
- 智能搜索 — 按工具名称/描述/分类实时搜索，相关性排序
- 分类过滤 — 36 个分类，分类计数动态更新
- 相似工具整合 — 功能相近的工具已融合为多功能合一工具（如 Base64 编解码内含 10 种编码、灵签工具内含 11 位神祇、图片批量格式转换内含 12 种互转方向），被合并工具地址自动 301 跳转至对应保留工具
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

- **纯静态零依赖** — 全部工具为单文件 HTML，无第三方框架、无运行时依赖；所需的重量级库（pdf-lib / docx / tesseract / heic2any 等 14 个）已自托管于 `assets/vendor/`，全站不依赖外部 CDN
- **XSS 防护** — 全局 `htmlEscape()` 对所有用户输入渲染转义；动态 DOM 优先使用 `textContent` / `createElement`，不用 `innerHTML` 拼接
- **内容安全策略** — `netlify.toml` 配置 CSP（`default-src 'self'` + 白名单），生产环境启用 `upgrade-insecure-requests`，全站无混合内容
- **安全响应头** — `X-Content-Type-Options: nosniff`、`X-Frame-Options: DENY`、`Referrer-Policy: no-referrer`
- **本地服务器防护** — `server.js` 含路径穿越校验与畸形 URL 容错（非法编码返回 400，不崩溃）
- **数据隐私** — 所有计算均在浏览器本地完成，无任何数据上传；外部 API 调用仅限用户主动触发的少数工具（如「我的 IP」）
- **无障碍基础** — 语义化 HTML5 标签、键盘可聚焦控件、可见的 :focus 样式

## 📋 工具总览（550 个 / 36 类）

> 共 **550 个**工具，覆盖 **36 个分类**。分类计数与工具清单由首页注册数据自动生成。

| 分类 | 数量 |
|---|---|
| 编程工具 | 94 |
| 数据处理 | 82 |
| 数学计算 | 77 |
| 格式转换 | 70 |
| 网页工具 | 65 |
| 文档工具 | 65 |
| 安全工具 | 61 |
| 数据生成 | 55 |
| 网络工具 | 51 |
| 文本处理 | 51 |
| 前端开发 | 49 |
| 字符串 | 48 |
| 日期时间 | 26 |
| 生活 | 25 |
| 加密哈希 | 24 |
| 颜色工具 | 23 |
| 随机生成 | 23 |
| 代码生成 | 23 |
| DevOps | 17 |
| 编解码 | 14 |
| 传统文化 | 13 |
| 图片处理 | 12 |
| 健康 | 11 |
| 代码美化 | 10 |
| 单位换算 | 9 |
| 进制转换 | 9 |
| 密码管理 | 9 |
| 网址工具 | 7 |
| 序列生成 | 7 |
| 金融 | 7 |
| 游戏 | 7 |
| 正则表达式 | 6 |
| 音频处理 | 6 |
| 动画 | 4 |
| 时间戳 | 2 |
| 购物 | 1 |

### 编程工具 (94)
API 请求测试器 · Git 提交信息生成器 · JSON Schema 验证器 · SemVer 版本比较 · 正则表达式可视化 · 性能测试 · Chmod 计算器 · 设备信息 · Docker Run→Compose · Git 备忘录 · JS 格式化 · JS 压缩 · JSON 对比 · JSON验证器 · 按键信息 · LESS 编译器 · 行号添加器 · 正则表达式测试器 · SQL 校验器 · 文本对比 · JSON 合并 · YAML 验证器 · CSV 验证器 · JSON 扁平化 · JSONPath 查询 · JSON 排序工具 · JSON 转代码 · 正则转义工具 · SQL 查询构造器 · XPath 查询工具 · 查找替换 · 正则构建器 · 开发者速查表 · Nginx 配置生成 · WebSocket 测试 · GraphQL 查询构建 · HTTP 请求头构建 · Cache-Control 分析 · 内容协商测试 · REST URI 模板测试 · HTTP 方法速查表 · URL 模式匹配 · DNS 查询 · XSS 编码器 · SQL 注入模式参考 · CSP 报告配置生成 · 多语言字符串转义 · Glob 模式匹配 · .gitignore 生成 · Dockerfile 生成 · K8s 资源生成 · Terraform 格式化 · SemVer 版本递增 · Changelog 生成 · 分支名生成 · CI/CD 配置助手 · Makefile 生成 · SSH 密钥格式 · package.json 分析 · 开源许可证生成 · Big-O 速查表 · 字节序转换 · 算法复杂度 · 快捷键可视化 · 代码注释去除 · 缩进转换 · 换行符转换 · 布尔表达式简化 · IEEE 754 浮点数 · 补码计算器 · ANSI 转义码 · CSS 选择器权重计算器 · MongoDB 聚合管道构建器 · SQL 转 Prisma · PostgreSQL 类型速查 · MySQL 函数速查 · SQLite PRAGMA 速查 · SQL 数据生成器 · Git 别名生成器 · 代码注释生成器 · 代码审查清单 · npm 版本范围解释器 · Git 分支清理器 · Conventional Commits 速查 · 代码语言检测器 · 矩阵计算器 · 复数计算器 · 大整数计算器 · JS 数组方法速查 · AI 提示词模板 · 本地存储查看器 · 浏览器特性检测 · 代码片段库 · Markdown编辑器

### 数据处理 (82)
JSON Schema 验证器 · 在线录音 · Base64 与图片互转 · 字节格式化 · 拍照工具 · 信用卡号验证 · CSV JSON 互转 · DNA 互补链 · 邮箱规范化 · IBAN 验证器 · 印尼区号查询 · INI JSON 互转 · JSON 对比 · JSON格式化器 · JSON 转 CSV · JSON 转 TOML · JSON 转 XML · JSON 转 YAML · JSON验证器 · JSON 查看器 · 列表随机化 · 电话号码生成 · 电话号码解析 · SQL 格式化 · SQL 校验器 · 文本排序器 · TOML → JSON · TOML → YAML · ULID 生成器 · UUID生成器 · XML格式化器 · XML → JSON · YAML → JSON · YAML → TOML · YAML Viewer · JSON 合并 · YAML 验证器 · 图片颜色提取 · CSV 美化器 · CSV 验证器 · GCD/LCM 计算 · JSON 扁平化 · JSON 高级压缩 · JSONPath 查询 · JSON 排序工具 · 随机选择器 · 数值取整工具 · SQL 查询构造器 · 统计计算器 · N-Gram 分析 · 文本摘要工具 · TSV 转换器 · XPath 查询工具 · 实时字数统计 · SQL 转 MongoDB · Cookie 解析 · JSON → HTML 表格 · Glob 模式匹配 · 文件魔术签名 · 列表合并工具 · CSV → HTML 表格 · Markdown 表格生成 · TSV → JSON · Properties 转 JSON · JSON → HTML 视图 · package.json 分析 · 日志分析器 · Git 仓库健康检查 · 敏感信息扫描器 · 数据脱敏器 · 十六进制查看器 · 代码语言检测器 · 分隔符检测器 · Unicode 长度计算器 · 线性回归计算器 · 加权平均计算器 · 图片尺寸计算器 · EXIF 查看器 · 剪贴板格式化器 · PDF转CSV · CSV格式化器 · YAML格式化器

### 数学计算 (77)
年龄计算器 · SemVer 版本比较 · 性能测试 · 抛硬币 · ETA 计算器 · IPv4 范围展开 · IPv4 子网计算 · 数学表达式计算 · 数字格式化 · 百分比计算器 · 随机数生成器 · 子网计算器 · 运行时间计算 · 工作日计算器 · 带宽计算器 · 营业时间计算 · 排列组合计算 · DND 骰子 · 斐波那契数列 · 分数转换器 · GCD/LCM 计算 · IP 段计算器 · 闰年判断 · 对数计算器 · 模运算计算器 · 进制转换与二进制计算 · 素数检测器 · 素数生成器 · 随机小数生成 · 随机整数生成 · 比例计算器 · 数值取整工具 · 序列生成器 · 统计计算器 · 时间段计算 · 周数计算器 · BMI 计算器 · BMR 计算器 · 贷款/房贷计算器 · 投资回报计算器 · 折扣计算器 · 复利计算器 · 小费计算器 · 增值税计算器 · 中文数字转换 · 电费计算器 · 油耗计算器 · 目标心率计算器 · 理想体重计算器 · 体脂率估算 · 运动消耗计算 · 通用进制转换 · 字符串相似度 · 数字转英文 · 列表合并工具 · SemVer 版本递增 · 算法复杂度 · 布尔表达式简化 · IEEE 754 浮点数 · 补码计算器 · 性能预算计算器 · 密码破解时间估算 · 正态分布计算器 · 矩阵计算器 · 复数计算器 · 大整数计算器 · 线性回归计算器 · 科学计数法转换器 · 加权平均计算器 · 加权随机选择器 · 质因数分解器 · 距离计算器 · 排序算法可视化 · 布尔逻辑计算器 · 位运算计算器 · IP/子网计算器 · 日期计算器

### 格式转换 (70)
Alpha Hex 转换 · Base64 编解码 · Bencode 编解码 · 命名风格转换 · CMYK 转换 · 颜色转换 · CSV JSON 互转 · 数据存储单位转换 · Docker Run→Compose · 时间戳转换 · HTML 实体转义 · HTML 转 Markdown · INI JSON 互转 · JSON 转 CSV · JSON 转 TOML · JSON 转 XML · JSON 转 YAML · 单位转换器 · 列表格式转换 · Markdown 转 HTML · 数字格式化 · 罗马数字转换 · 温度单位转换 · Text to NATO · 文本与 Unicode 互转 · TOML → JSON · TOML → YAML · URL 编解码 · 重量单位转换 · XML → JSON · YAML → JSON · YAML → TOML · 盲文转换器 · 色温转换 · CSV 美化器 · CSV 转 Markdown · 分数转换器 · 全角半角转换 · JSON 转代码 · Markdown 转纯文本 · QP 编解码 · 小型大写字母 · 时区转换器 · TSV 转换器 · Unicode 转义 · UUencode 编解码 · 日期格式化器 · SCSS → CSS 变量 · HTML 转 Pug · SQL 转 MongoDB · CSS → SCSS · Unicode 归一化 · JSON → HTML 表格 · CSV → HTML 表格 · TSV → JSON · Properties 转 JSON · 环境变量转换 · 缩进转换 · 换行符转换 · gRPC JSON 互转 · Protobuf JSON 互转 · MessagePack 编解码 · SQL 转 Prisma · 配置格式互转 · Markdown 表格格式化器 · 视频剪切 · 视频转GIF工具 · MP4转GIF工具 · 音频转换器 · 图片批量格式转换

### 网页工具 (65)
CSS 选择器测试 · HTML 净化器 · 在线录音 · 条码生成器 · 拍照工具 · 车牌号归属地查询 · 色盲测试图 · 色盲模拟器 · 色彩对比检查 · 在线闹钟 · 设备信息 · Emoji 搜索 · HSL 拾色器 · HTML 实体转义 · HTML 实时预览 · HTML 参考手册 · HTML 转 Markdown · HTML 编辑器 · JSON 查看器 · 按键信息 · Markdown 预览 · 数学表达式计算 · Meta 标签生成器 · 百分比计算器 · 番茄钟 · QR 码工具 · SVG 编辑器 · 字体排版测试 · URL 解析器 · User-Agent 解析器 · YAML Viewer · HSL 颜色选择器 · 颜色混合器 · 高级拾色器 · 色环工具 · Gravatar 查询 · HTML 标签去除 · 对数计算器 · 模运算计算器 · 月相查询 · 摩斯音频播放 · 素数检测器 · 比例计算器 · 日出日落时间 · 秒表计时器 · 年度进度 · 社交 Meta 预览 · 星座查询 · 打字速度测试 · 反应时间测试 · 记忆测试 · 呼吸引导 · 简易待办清单 · 代理检测 · Data URI 生成 · JSON → HTML 视图 · ANSI 转义码 · CSS 选择器生成器 · SSE 事件流测试器 · 本地存储查看器 · 浏览器特性检测 · 视口尺寸工具 · 屏幕分辨率速查 · EXIF 查看器 · 二维码生成器

### 文档工具 (65)
Git 提交信息生成器 · ASCII 码表 · 字符映射表 · 颜色名称查询 · Git 备忘录 · HTML 参考手册 · HTTP 状态码 · Markdown 预览 · Markdown 转 HTML · MIME 类型查询 · 数字签名解析 · 正则备忘录 · Unicode 查询 · 字数统计 · CSV 转 Markdown · Markdown 转纯文本 · 高级文本统计 · 文字分栏 · 开发者速查表 · 关键词提取 · 文件魔术签名 · Markdown 表格生成 · .gitignore 生成 · Changelog 生成 · 分支名生成 · 开源许可证生成 · Big-O 速查表 · 字符码点查询 · 快捷键可视化 · 无障碍检查清单 · OpenAPI 查看器 · 常用端口速查 · Redis 命令速查 · PostgreSQL 类型速查 · MySQL 函数速查 · SQLite PRAGMA 速查 · 部署检查清单 · Markdown 目录生成器 · README 生成器 · 代码审查清单 · npm 版本范围解释器 · Conventional Commits 速查 · Markdown 表格格式化器 · 加密算法对比 · 演讲时长估算 · JS 数组方法速查 · AI 提示词模板 · 开发者每日清单 · 论语全文 · 歇后语大全 · 名人名言 · 周易六十四卦 · 图片转PDF · PDF合并 · PDF分割 · PDF压缩 · PDF加密 · PDF解密 · PDF水印 · PDF转文本 · PDF转CSV · PDF 转 Word · Word 转 PDF · Markdown编辑器 · 图片文字识别

### 安全工具 (61)
HTML 净化器 · Basic Auth 生成 · BIP39 助记词 · 校验和计算器 · Chmod 计算器 · 维吉尼亚密码 · 信用卡号验证 · 加密工具 · 哈希生成器 · Hash 识别 · HMAC 生成/验证器 · IBAN 验证器 · JWT 解析器 · MD5 生成器 · OTP 生成器 · 密码检测 · 密码强度分析 · 数字签名解析 · RSA 密钥对生成器 · SafeLink 解码 · SSL 检查器 · 字符串混淆器 · XOR 加密 · Atbash 密码 · Rail Fence 密码 · 仿射密码 · API 密钥生成器 · 自动密钥密码 · 博福特密码 · Enigma 模拟器 · Playfair 密码 · ROT13 密码 · 安全令牌生成器 · OAuth Token 解码 · CORS 检测 · TLS 密码套件查询 · TOTP 验证码生成 · CSP 策略构建器 · 安全头检测 · XSS 编码器 · SQL 注入模式参考 · 熵值计算 · JWT 签名验证 · SRI 哈希生成 · PGP 公钥解析 · OAuth2 授权流程 · 点击劫持检测 · HSTS Preload 检查 · X.509 证书解析 · CSP 报告配置生成 · SSH 密钥格式 · 密码破解时间估算 · 敏感信息扫描器 · 2FA 备份码生成器 · URL 跟踪参数清理器 · CSRF 防护生成器 · 加密算法对比 · 数据脱敏器 · 加密便签 · PDF加密 · PDF解密

### 数据生成 (55)
ASCII 文字画 · 条码生成器 · CSS Border 生成器 · Box Shadow 生成器 · 调色板生成器 · 配色方案 · Crontab 生成器 · CSS 动画生成器 · Flexbox 生成器 · 渐变生成器 · IPv6 ULA 生成器 · Lorem Ipsum 生成器 · MAC 地址生成器 · Meta 标签生成器 · Numeronym 生成器 · 密码生成器 · 电话号码生成 · QR 码工具 · SVG 占位图 · Text Shadow 生成器 · NanoID 生成器 · API 密钥生成器 · 气泡文字 · 色彩和谐搭配 · 翻转文字 · HTML 表格生成 · Leet 语转换 · Lorem Pixel 图 · 彩票号码生成 · 可记忆密码 · PIN 码生成器 · 随机日期生成 · 随机邮箱生成 · 随机姓名生成 · 随机句子生成 · 随机时间生成 · 随机用户名生成 · 删除线文字 · 字谜生成器 · Zalgo 文字 · CSS Grid 生成器 · CSS 滤镜生成器 · Clip-Path 生成器 · CSS Transform 生成器 · 彩虹文字生成器 · 安全令牌生成器 · 图标生成器 · OG 分享图生成器 · Webhook 负载生成器 · SQL 数据生成器 · 徽章生成器 · 正态分布计算器 · 日历生成器 · 二维码生成器 · 美国地址生成器

### 网络工具 (51)
API 请求测试器 · Basic Auth 生成 · HTTP 状态码 · 印尼区号查询 · IPv4 地址转换 · IPv4 范围展开 · IPv4 子网计算 · IPv6 ULA 生成器 · MAC 地址生成器 · MIME 类型查询 · 随机端口生成 · SSL 检查器 · 子网计算器 · User-Agent 解析器 · 带宽计算器 · Gravatar 查询 · IP 段计算器 · 随机 IP 地址 · Nginx 配置生成 · WebSocket 测试 · GraphQL 查询构建 · OAuth Token 解码 · CORS 检测 · HTTP 请求头构建 · Cookie 解析 · Cache-Control 分析 · 内容协商测试 · REST URI 模板测试 · HTTP 方法速查表 · IP 格式转换 · URL 模式匹配 · TLS 密码套件查询 · DNS 查询 · 代理检测 · CSP 策略构建器 · 安全头检测 · OAuth2 授权流程 · 点击劫持检测 · HSTS Preload 检查 · OpenAPI 查看器 · REST CRUD 脚手架 · gRPC JSON 互转 · API 请求签名器 · Webhook 负载生成器 · Mock API 设计器 · 常用端口速查 · SSE 事件流测试器 · URL 查询参数构建器 · Redis 命令速查 · IP地址查询 · IP/子网计算器

### 文本处理 (51)
ASCII 文字画 · DNA 互补链 · 邮箱规范化 · 行号添加器 · 列表格式转换 · Lorem Ipsum 生成器 · 摩斯密码 · Numeronym 生成器 · 电话号码解析 · 文本清理器 · 文本去重 · 文本对比 · 文本重复器 · 文本反转器 · 文本排序器 · 字数统计 · HTML 标签去除 · 正则替换工具 · 字谜生成器 · 文本缩进工具 · N-Gram 分析 · 文本填充工具 · 回文检测器 · 高级文本统计 · 文本摘要工具 · 文本解包工具 · 文本换行工具 · 查找替换 · 繁简体转换 · 文字分栏 · 实时字数统计 · 文本规范化 · 引号转换 · 字符串相似度 · 关键词提取 · 列对齐工具 · 缩写生成器 · 代码注释去除 · Markdown 目录生成器 · 行编辑器 · 文件名重命名器 · 演讲时长估算 · 文本分块器 · 模板替换器 · 剪贴板格式化器 · 部首查字 · 汉字偏旁查询 · 文本大小写转换 · 字符串分析器 · 文本编码转换器 · 在线记事本

### 前端开发 (49)
CSS 选择器测试 · CSS Border 生成器 · Box Shadow 生成器 · CSS 动画生成器 · CSS 格式化 · CSS 压缩 · CSS 单位转换 · Flexbox 生成器 · HTML 压缩 · HTML 实时预览 · HTML 编辑器 · LESS 编译器 · SVG 编辑器 · SVG 占位图 · Text Shadow 生成器 · 字体排版测试 · HTML 表格生成 · Lorem Pixel 图 · CSS Grid 生成器 · CSS 滤镜生成器 · 缓动函数预览 · 透明度取色器 · Clip-Path 生成器 · 社交 Meta 预览 · CSS Transform 生成器 · HTML 转 JSX · CSS → Tailwind · Markdown 转 JSX · CSS 内联样式转换 · CSS 前缀检查器 · SCSS → CSS 变量 · HTML 转 Pug · CSS → SCSS · SVG 转 JSX · 颜色 → Tailwind 色阶 · 图标生成器 · OG 分享图生成器 · CSS 遮罩生成器 · CSS 选择器权重计算器 · CSS 变量提取器 · 媒体查询生成器 · CSS 选择器生成器 · Tailwind 配置生成器 · 性能预算计算器 · 无障碍检查清单 · 徽章生成器 · 视口尺寸工具 · 屏幕分辨率速查 · 图片尺寸计算器

### 字符串 (48)
ASCII 码表 · 命名风格转换 · 字符映射表 · Emoji 搜索 · 随机字符串 · 罗马数字转换 · Slugify 字符串 · 字符串混淆器 · 文本清理器 · 文本去重 · 文本重复器 · 文本反转器 · 文本与二进制互转 · Text to NATO · 文本与 Unicode 互转 · Unicode 查询 · 盲文转换器 · 气泡文字 · 翻转文字 · 全角半角转换 · Leet 语转换 · 小型大写字母 · 删除线文字 · 文本缩进工具 · 文本填充工具 · 回文检测器 · 文本解包工具 · 文本换行工具 · Unicode 转义 · Zalgo 文字 · 繁简体转换 · 中文数字转换 · 文本规范化 · 引号转换 · 中文大写金额 · 彩虹文字生成器 · 多语言字符串转义 · Unicode 归一化 · 列对齐工具 · 数字转英文 · 缩写生成器 · 字符码点查询 · 行编辑器 · 文件名重命名器 · 文本分块器 · 模板替换器 · Unicode 长度计算器 · 字符串分析器

### 日期时间 (26)
年龄计算器 · 在线闹钟 · Crontab 生成器 · ETA 计算器 · 番茄钟 · 运行时间计算 · 工作日计算器 · 营业时间计算 · 闰年判断 · 月相查询 · 日出日落时间 · 时间前计算 · 时间段计算 · 秒表计时器 · 时区转换器 · 周数计算器 · 年度进度 · 日期格式化器 · 预产期计算 · 日历生成器 · 时间单位转换器 · 中国节假日速查 · 跨时区会议安排器 · 万年历 · 老黄历 · 日期计算器

### 生活 (25)
车牌号归属地查询 · 小费计算器 · 电费计算器 · 油耗计算器 · 星座查询 · 睡眠周期计算器 · 决策助手 · 简易待办清单 · 每日饮水计算 · 血液酒精估算 · 中国节假日速查 · 跨时区会议安排器 · 开发者每日清单 · 视频剪切 · 在线鼓机 · 部首查字 · 汉字偏旁查询 · 财神灵签 · 灵签 · 世界各国国旗 · 六爻排盘 · 答案之书 · 电子木鱼 · 货币汇率转换 · 在线记事本

### 加密哈希 (24)
BIP39 助记词 · 校验和计算器 · 维吉尼亚密码 · 加密工具 · 哈希生成器 · Hash 识别 · HMAC 生成/验证器 · JWT 解析器 · MD5 生成器 · RSA 密钥对生成器 · XOR 加密 · Atbash 密码 · Rail Fence 密码 · 仿射密码 · 自动密钥密码 · 博福特密码 · Enigma 模拟器 · Playfair 密码 · ROT13 密码 · JWT 签名验证 · SRI 哈希生成 · PGP 公钥解析 · X.509 证书解析 · API 请求签名器

### 颜色工具 (23)
Alpha Hex 转换 · CMYK 转换 · 色盲测试图 · 色盲模拟器 · 色彩对比检查 · 颜色转换 · 颜色名称查询 · 调色板生成器 · 配色方案 · 渐变生成器 · Hex/RGB/HSL/Decimal 转换 · HSL 拾色器 · HSL 颜色选择器 · 图片颜色提取 · 色彩和谐搭配 · 颜色混合器 · 高级拾色器 · 色温转换 · 色环工具 · 随机 Hex 颜色 · 随机 RGB 颜色 · 透明度取色器 · 颜色 → Tailwind 色阶

### 随机生成 (23)
抛硬币 · 列表随机化 · 随机数生成器 · 随机端口生成 · 随机字符串 · 排列组合计算 · DND 骰子 · 彩票号码生成 · 随机选择器 · 随机日期生成 · 随机邮箱生成 · 随机小数生成 · 随机 Hex 颜色 · 随机整数生成 · 随机 IP 地址 · 随机姓名生成 · 随机 RGB 颜色 · 随机句子生成 · 随机时间生成 · 随机用户名生成 · 决策助手 · 2FA 备份码生成器 · 加权随机选择器

### 代码生成 (23)
HTML 转 JSX · CSS → Tailwind · Markdown 转 JSX · CSS 内联样式转换 · CSS 前缀检查器 · SVG 转 JSX · CSS 遮罩生成器 · 媒体查询生成器 · Tailwind 配置生成器 · REST CRUD 脚手架 · Mock API 设计器 · MongoDB 聚合管道构建器 · systemd 单元生成器 · Caddy 配置生成器 · .htaccess 生成器 · EditorConfig 生成器 · Ansible Playbook 生成器 · Prometheus 构建器 · Git 别名生成器 · README 生成器 · 代码注释生成器 · CSRF 防护生成器 · 代码片段库

### DevOps (17)
Dockerfile 生成 · K8s 资源生成 · Terraform 格式化 · 环境变量转换 · CI/CD 配置助手 · Makefile 生成 · 配置格式互转 · systemd 单元生成器 · Caddy 配置生成器 · .htaccess 生成器 · EditorConfig 生成器 · Ansible Playbook 生成器 · Prometheus 构建器 · 部署检查清单 · 日志分析器 · Git 仓库健康检查 · Git 分支清理器

### 编解码 (14)
Base64 编解码 · Base64 与图片互转 · Bencode 编解码 · 摩斯密码 · Punycode 转换 · 摩斯音频播放 · QP 编解码 · UUencode 编解码 · Data URI 生成 · Protobuf JSON 互转 · MessagePack 编解码 · 十六进制查看器 · 分隔符检测器 · 文本编码转换器

### 传统文化 (13)
财神灵签 · 灵签 · 论语全文 · 歇后语大全 · 名人名言 · 世界各国国旗 · 万年历 · 老黄历 · 六爻排盘 · 答案之书 · 周易六十四卦 · 旋转太极图 · 电子木鱼

### 图片处理 (12)
图片压缩器 · 背景去除器 · 图片调整大小 · 图片裁剪器 · 图片旋转器 · 图片滤镜效果 · 水印工具 · 在线画板 · 批量图片处理器 · 视频转GIF工具 · MP4转GIF工具 · 图片批量格式转换

### 健康 (11)
BMI 计算器 · BMR 计算器 · 睡眠周期计算器 · 目标心率计算器 · 理想体重计算器 · 呼吸引导 · 体脂率估算 · 每日饮水计算 · 预产期计算 · 血液酒精估算 · 运动消耗计算

### 代码美化 (10)
CSS 格式化 · CSS 压缩 · HTML 压缩 · JS 格式化 · JS 压缩 · JSON格式化器 · SQL 格式化 · XML格式化器 · JSON 高级压缩 · CSS 变量提取器

### 单位换算 (9)
字节格式化 · CSS 单位转换 · 数据存储单位转换 · 单位转换器 · 温度单位转换 · 重量单位转换 · 距离计算器 · 时间单位转换器 · 单位换算器

### 进制转换 (9)
Hex/RGB/HSL/Decimal 转换 · IPv4 地址转换 · 文本与二进制互转 · 进制转换与二进制计算 · 通用进制转换 · IP 格式转换 · 字节序转换 · 科学计数法转换器 · 位运算计算器

### 密码管理 (9)
OTP 生成器 · 密码检测 · 密码生成器 · 密码强度分析 · 可记忆密码 · PIN 码生成器 · TOTP 验证码生成 · 熵值计算 · 加密便签

### 网址工具 (7)
SafeLink 解码 · Slugify 字符串 · URL 编解码 · URL 解析器 · Punycode 转换 · URL 查询参数构建器 · URL 跟踪参数清理器

### 序列生成 (7)
ULID 生成器 · UUID生成器 · NanoID 生成器 · 斐波那契数列 · 素数生成器 · 序列生成器 · 质因数分解器

### 金融 (7)
贷款/房贷计算器 · 投资回报计算器 · 复利计算器 · 增值税计算器 · 中文大写金额 · 银行卡BIN查询 · 货币汇率转换

### 游戏 (7)
打字速度测试 · 反应时间测试 · 记忆测试 · 在线鼓机 · 瞄准训练 · CPS测试 · 游戏灵敏度转换器

### 正则表达式 (6)
正则表达式可视化 · 正则备忘录 · 正则表达式测试器 · 正则转义工具 · 正则替换工具 · 正则构建器

### 音频处理 (6)
音频裁剪器 · 音频分割器 · 音量调节器 · 音频转换器 · 音频合并器 · 音频降噪器

### 动画 (4)
缓动函数预览 · 排序算法可视化 · 旋转太极图 · 在线画板

### 时间戳 (2)
时间戳转换 · 时间前计算

### 购物 (1)
折扣计算器

## 🛠 添加新工具

> 本清单由 `docs/gen-readme-tools.js` 从首页注册数据自动生成（`node docs/gen-readme-tools.js`）。

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

- **零依赖** — 不引入框架；如需库，优先自托管至 `assets/vendor/` 并内置降级提示
- **六语言界面** — 全站页面均已本地化：页面元素加 `data-i18n` / `data-i18n-placeholder` / `data-i18n-html` 属性，JS 文案经 `t(key, fallback)` 取词，对应词典 `assets/i18n/<lang>/<slug>.json`（lang = zh-CN / zh-TW / zh-HK / en / es / ja）；新增或修改文案后需同步六个语言词典，`docs/superpowers/plans/verify-all-old.js` 可校验 key 一致性
- **XSS 防护** — 用户输入渲染一律经 `htmlEscape()` 或 `textContent`
- **ES5 兼容** — 不使用箭头函数/模板字符串等 ES6+ 语法，保持零构建直接运行
- **数学符号** — 公式中的特殊符号（√∑π×÷≤≥）依赖全局字体栈，无需额外处理；长根号需使用覆盖线结构（参照 distance-calculator）
- **注册** — 在 `index.html` 的 `tools` 数组（含 name/desc/link/cats）与 `categories` 数组（如需新分类）中添加条目，name 须与页面 `<title>` 一致
- **描述五处同步** — 工具的描述文案（name/desc）须在五处保持一致：`index.html` 的 `<title>`/描述、词典 `assets/i18n/<lang>/<slug>.json` 的 `h1`/`desc`/`meta.description`、首页卡片（`tools` 数组条目）、主页词典 `home.json`；功能扩展（如合并其他工具）后必须同步更新全部描述
- **相似工具先合并** — 新增工具前先确认与现有工具是否重复/相似：相近功能应融合进现有工具（tab/模式 select），而非另建新工具；被合并目录需在 `server.js` redirects 与 `netlify.toml` 中配置 301 跳转

## 📜 更新日志

所有重要变更记录在 [CHANGELOG.md](CHANGELOG.md)。

## ⚠️ 免责声明

所有工具的操作和计算均在浏览器本地完成，不会向任何服务器传输数据。由于浏览器环境差异和实现复杂度，极少情况下可能出现计算偏差或兼容性问题，请在使用后自行校验关键结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)，感谢配合！

## 📄 许可证

MIT License - 仓库地址：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)

## 🎉 鸣谢

部分工具功能参考自 [SteelyLink Tools](https://github.com/SteelyLink/SteelyLink-Tools)（MIT License），特此鸣谢。
