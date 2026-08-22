# S-Jiffy · 即用即走工具集

> 轻量、瞬时的生产力工具，零登录零广告，打开即用，用完即走。
>
> 🌐 **GitHub**：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
>
> ⚠️ **免责声明**：所有操作均在浏览器本地完成，计算结果仅供参考。极少情况下可能出现兼容性或计算偏差，请自行校验结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)。

## 📦 项目概览

S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **560 个** 即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、数学计算、网络工具、随机生成、代码生成、DevOps、安全工具等 **33 个分类**。所有工具均为单页 HTML，无需构建、无需服务端、无需注册，打开即用。

## ✨ 核心特性

- 即用即走 — 无需安装、无需注册、无广告
- 零框架依赖 — 纯 HTML + CSS + Vanilla JS（ES5），无构建步骤
- 历史记录 — 自动记录使用历史（localStorage），支持管理/清除
- 智能搜索 — 按工具名称/描述/分类实时搜索，相关性排序
- 分类过滤 — 33 个分类，分类计数动态更新
- 一键复制 — 所有工具结果区标配复制按钮
- 全中文界面 — 界面文案、状态提示、示例说明均为中文
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

## 📋 工具总览（560 个 / 33 类）

> 分类计数与工具清单由首页注册数据自动生成。

| 分类 | 数量 | 分类 | 数量 |
|---|---|---|---|
| 编解码 | 25 | 加密哈希 | 26 |
| 文本处理 | 55 | 日期时间 | 32 |
| 网络工具 | 55 | 颜色工具 | 27 |
| 数学计算 | 81 | 格式转换 | 83 |
| 正则表达式 | 6 | 序列生成 | 10 |
| 数据处理 | 92 | 网址工具 | 8 |
| 代码美化 | 13 | 进制转换 | 11 |
| 单位换算 | 11 | 字符串 | 51 |
| 时间戳 | 3 | 随机生成 | 25 |
| 密码管理 | 9 | 安全工具 | 64 |
| 编程工具 | 116 | 前端开发 | 49 |
| 数据生成 | 57 | 文档工具 | 54 |
| 网页工具 | 69 | 代码生成 | 33 |
| DevOps | 20 | 健康 | 11 |
| 生活 | 13 | 金融 | 5 |
| 游戏 | 3 | 购物 | 1 |
| 动画 | 2 |  | |

### 编解码 (25)
Base32 编解码 · Base58 编解码 · Base64 编解码 · Base64 转图片 · Base85 编解码 · Bencode 编解码 · 图片转 Base64 · 摩斯密码 · QR 码读取器 · Base36 编解码 · Base62 编解码 · Punycode 转换 · Ascii85 编解码 · Base45 编解码 · Base91 编解码 · Base92 编解码 · 摩斯音频 · Quoted-Printable 编解码 · UUencode 编解码 · Data URI 生成 · Protobuf JSON 互转 · MessagePack 编解码 · 十六进制查看器 · 分隔符检测器 · 编码转换器

### 加密哈希 (26)
BIP39 助记词生成器 · 校验和计算器 · Vigenère 密码 · 加密工具 · 哈希生成器 · Hash 识别器 · HMAC 生成器 · JWT 解析器 · MD5 生成器 · RSA 密钥对生成器 · XOR 加密 · Atbash 密码 · Rail Fence 密码 · Affine 密码 · Autokey 密码 · Beaufort 密码 · Enigma 模拟器 · 哈希对比 · HMAC 验证器 · Playfair 密码 · ROT 密码 · JWT 签名验证 · SRI 哈希生成 · PGP 公钥解析 · X.509 证书解析 · API 请求签名器

### 文本处理 (55)
ASCII 文字画 · 文本差异对比 · DNA 工具 · 邮箱地址规范化 · 行号添加器 · 列表格式转换 · Lorem Ipsum 生成器 · Lorem Ipsum 按词生成 · 摩斯密码 · Numeronym 生成器 · 电话号码解析 · 文本清理器 · 文本去重 · 文本对比 · 文本重复器 · 文本反转器 · 文本排序器 · 文本统计 · 单词统计器 · 字符级文本对比 · HTML 标签去除 · 正则替换 · 变位词检测器 · 文本对比工具 · 字符/词频分析器 · 文本缩进器 · N-gram 生成器 · 文本填充器 · 回文检测器 · 高级文本统计 · 文本摘要生成器 · 文本解包器 · 文本换行器 · 查找替换 · 繁简体转换 · 文字分栏 · 实时字数统计 · 文本规范化 · 引号转换 · 字符串相似度 · 关键词提取 · 文本换行工具 · 列对齐工具 · ASCII 表格生成 · 差异百分比 · 缩写生成器 · 代码注释去除 · Markdown 目录生成器 · 行编辑器 · 文件名重命名器 · 演讲时长估算 · 文本分块器 · 模板替换器 · Markdown 速查卡 · 剪贴板格式化器

### 日期时间 (32)
年龄计算器 · 计时器 · 倒计时器 · Cron 表达式解析 · Crontab 生成器 · 日期差计算 · ETA 计算器 · 番茄钟 · 在线率计算器 · 工作日计算器 · 工时计算 · Cron 表达式验证 · 日期计算 · 日期纪年 · 间歇计时器 · 闰年检测 · 月相 · 日出日落时间 · 时间推算 · 时间间隔 · 计时器与秒表 · 时区转换 · ISO 周数 · 年度进度 · 日期格式化器 · 生肖年龄查询 · 预产期计算 · 日历生成器 · 时间单位转换器 · 日期序列生成器 · 中国节假日速查 · 跨时区会议安排器

### 网络工具 (55)
API 请求测试器 · Basic Auth 生成器 · HTTP 状态码 · 印尼地区编码查询 · IP 地理定位 · IPv4 地址转换器 · IPv4 范围展开 · IPv4 子网计算器 · IPv6 ULA 生成器 · MAC 地址生成器 · MAC 地址查询 · MIME 类型查询 · MIME 类型 · 随机端口生成器 · SSL 证书检测 · 子网计算器 · User Agent · User-Agent 解析器 · 我的 IP · WiFi QR 码生成器 · 带宽计算器 · Gravatar 生成器 · IP 段计算器 · 随机 IP 生成器 · Nginx 配置生成 · WebSocket 测试 · GraphQL 查询构建 · OAuth Token 解码 · CORS 检测 · HTTP 请求头构建 · Cookie 解析 · Cache-Control 分析 · 内容协商测试 · REST URI 模板测试 · HTTP 方法测试 · IP 格式转换 · URL 模式匹配 · TLS 密码套件查询 · DNS 查询 · 代理检测 · CSP 策略构建器 · 安全头检测 · OAuth2 授权流程 · 点击劫持检测 · HSTS Preload 检查 · OpenAPI 查看器 · REST CRUD 脚手架 · gRPC JSON 互转 · API 请求签名器 · Webhook 负载生成器 · Mock API 设计器 · 常用端口速查 · SSE 事件流测试器 · URL 查询参数构建器 · Redis 命令速查

### 颜色工具 (27)
Alpha Hex 转换 · CMYK 转换器 · 色盲测试图 · 色盲模拟器 · 色彩对比度 · 颜色转换器 · CSS 颜色名称 · 调色板生成器 · 配色方案生成 · 渐变生成器 · Hex RGB Decimal 转换 · HEX 转 HSL · HEX 转 RGB · HSL 取色器 · HSL 转 HEX · RGB 转 HEX · HSL 颜色选择器 · 图片取色器 · 颜色和谐配色 · 颜色混合器 · 高级拾色器 · 色温 · 色轮工具 · 随机 Hex 颜色生成器 · 随机 RGB 颜色生成器 · 透明度取色器 · 颜色 → Tailwind 色阶

### 数学计算 (81)
年龄计算器 · SemVer 版本比较 · 进制转换 · 浏览器性能测试 · 计时器 · 抛硬币 · 日期差计算 · 掷骰子 · ETA 计算器 · IPv4 范围展开 · IPv4 子网计算器 · 数学计算器 · 数字格式化器 · 百分比计算器 · 随机数生成器 · 子网计算器 · 在线率计算器 · 工作日计算器 · 带宽计算器 · 工时计算 · 组合与排列 · 日期计算 · 日期纪年 · D&D 骰子 · 斐波那契数列生成器 · 分数转换器 · GCD/LCM 计算器 · IP 段计算器 · 闰年检测 · 对数计算器 · 模运算计算器 · 通用进制转换 · 质数检测器 · 质数生成器 · 随机浮点数生成器 · 随机整数生成器 · 比例计算器 · 取整工具 · 数列生成器 · 统计计算器 · 时间间隔 · ISO 周数 · BMI 计算器 · BMR 计算器 · 贷款计算器 · 投资回报计算器 · 折扣计算器 · 复利计算器 · 小费计算器 · 增值税计算器 · 中文数字转换 · 电费计算器 · 油耗计算器 · 目标心率计算器 · 理想体重计算器 · 体脂率估算 · 运动消耗计算 · 进制转换进阶 · 字符串相似度 · 数字转英文 · 列表合并工具 · 差异百分比 · SemVer 版本递增 · 位运算计算器 · 算法复杂度 · 布尔表达式简化 · IEEE 754 浮点数 · 补码计算器 · 性能预算计算器 · 密码破解时间估算 · 正态分布计算器 · 矩阵计算器 · 复数计算器 · 大整数计算器 · 线性回归计算器 · 科学计数法转换器 · 加权平均计算器 · 加权随机选择器 · 质因数分解器 · 距离计算器 · 排序算法可视化

### 格式转换 (83)
Alpha Hex 转换 · 面积单位转换 · Base32 编解码 · Base58 编解码 · Base64 编解码 · Base85 编解码 · Bencode 编解码 · 命名风格转换器 · CMYK 转换器 · 颜色转换器 · CSV JSON 互转 · 数据存储单位转换 · Docker Compose 转换器 · 时间戳转换器 · HEX 转 HSL · HEX 转 RGB · HSL 转 HEX · HTML 实体 · HTML 转 Markdown · INI JSON 互转 · JSON 转 CSV · JSON 转 TOML · JSON 转 XML · JSON 转 YAML · 长度单位转换 · 列表格式转换 · Markdown 转 HTML · 数字格式化器 · RGB 转 HEX · 罗马数字转换器 · 速度单位转换 · 温度转换器 · 文本转北约音标字母 · 文本与 Unicode 互转 · 时间戳格式化工具 · TOML 转 JSON · TOML 转 YAML · URL 编码/解码 · 体积单位转换 · 重量单位转换 · XML 转 JSON · YAML 转 JSON · YAML 转 TOML · Ascii85 编解码 · Base45 编解码 · Base91 编解码 · Base92 编解码 · 盲文转换 · 色温 · CSV 表格美化 · CSV 转 Markdown · 分数转换器 · 全角半角转换 · JSON 转 TypeScript · Markdown 转纯文本 · Quoted-Printable 编解码 · 小型大写 · 时区转换 · TSV · CSV · JSON · Unicode 转义 · UUencode 编解码 · JSON 转 C# 类 · 日期格式化器 · SCSS → CSS 变量 · HTML 转 Pug · SQL 转 MongoDB · CSS 转 SCSS · Unicode 归一化 · JSON → HTML 表格 · CSV → HTML 表格 · TSV 转 JSON · Properties 转 JSON · 环境变量转换 · 缩进转换 · 换行符转换 · gRPC JSON 互转 · GraphQL Schema 转 TypeScript · Protobuf JSON 互转 · MessagePack 编解码 · SQL 转 Prisma · 配置格式互转 · Markdown 表格格式化器 · 编码转换器

### 正则表达式 (6)
正则表达式可视化 · 正则表达式备忘录 · 正则测试器 · 正则转义 · 正则替换 · 正则构建器

### 序列生成 (10)
ULID 生成器 · UUID 生成器 · NanoID 生成器 · 斐波那契数列生成器 · 质数生成器 · 数列生成器 · UUID v1 生成器 · UUID v6 生成器 · 质因数分解器 · 日期序列生成器

### 数据处理 (92)
JSON Schema 验证器 · Base64 转图片 · 字节格式化 · 拍照工具 · 信用卡号验证 · CSV JSON 互转 · 文本差异对比 · DNA 工具 · 邮箱地址规范化 · IBAN 验证器 · 图片转 Base64 · 印尼地区编码查询 · INI JSON 互转 · IP 地理定位 · JSON 对比 · JSON 格式化器 · JSON 压缩 · JSON 转 CSV · JSON 转 TOML · JSON 转 XML · JSON 转 YAML · JSON 验证器 · JSON 查看器 · 列表随机化 · MAC 地址查询 · 随机手机号生成 · 电话号码解析 · SQL 格式化 · SQL 美化 · SQL 语法检查 · 文本排序器 · 文本统计 · TOML 转 JSON · TOML 转 YAML · ULID 生成器 · UUID 生成器 · XML 格式化器 · XML 转 JSON · YAML 转 JSON · YAML 转 TOML · YAML 查看器 · JSON 合并 · YAML 验证器 · 图片取色器 · CSV 表格美化 · CSV 验证器 · GCD/LCM 计算器 · HTML 表格提取 · JSON 扁平化 · JSON 高级压缩 · JSONPath 提取 · JSON 美化 · JSON 键排序器 · 随机选择器 · 取整工具 · SQL 查询生成 · 统计计算器 · 字符/词频分析器 · N-gram 生成器 · 文本摘要生成器 · TSV · CSV · JSON · UUID v1 生成器 · UUID v6 生成器 · XPath 查询测试 · 实时字数统计 · SQL 转 MongoDB · Cookie 解析 · ASCII 表格生成 · JSON → HTML 表格 · Glob 模式匹配 · 文件魔术签名 · 列表合并工具 · CSV → HTML 表格 · Markdown 表格生成 · TSV 转 JSON · Properties 转 JSON · JSON → HTML 视图 · package.json 分析 · 日志分析器 · Git 仓库健康检查 · 敏感信息扫描器 · API Key 识别器 · 数据脱敏器 · 十六进制查看器 · 代码语言检测器 · 分隔符检测器 · Unicode 长度计算器 · 线性回归计算器 · 加权平均计算器 · 图片尺寸计算器 · EXIF 查看器 · 剪贴板格式化器

### 网址工具 (8)
Safelink 解码 · 字符串转 Slug · URL 编码/解码 · URL 解析器 · Punycode 转换 · URL Slug 生成 · URL 查询参数构建器 · URL 跟踪参数清理器

### 代码美化 (13)
CSS 格式化 · CSS 压缩 · HTML 压缩 · JavaScript 格式化 · JS 压缩 · JSON 格式化器 · JSON 压缩 · SQL 格式化 · SQL 美化 · XML 格式化器 · JSON 高级压缩 · JSON 美化 · CSS 变量提取器

### 进制转换 (11)
进制转换 · Hex RGB Decimal 转换 · IPv4 地址转换器 · 文本与二进制互转 · Base36 编解码 · Base62 编解码 · 通用进制转换 · 进制转换进阶 · IP 格式转换 · 字节序转换 · 科学计数法转换器

### 单位换算 (11)
面积单位转换 · 字节格式化 · CSS 单位转换 · 数据存储单位转换 · 长度单位转换 · 速度单位转换 · 温度转换器 · 体积单位转换 · 重量单位转换 · 距离计算器 · 时间单位转换器

### 字符串 (51)
ASCII 表 · 命名风格转换器 · 字符映射表 · Emoji 选择器 · Emoji 搜索 · 随机字符串生成器 · 罗马数字转换器 · 字符串转 Slug · 字符串混淆器 · 文本清理器 · 文本去重 · 文本重复器 · 文本反转器 · 文本与二进制互转 · 文本转北约音标字母 · 文本与 Unicode 互转 · Unicode 查找 · 盲文转换 · 泡泡字 · 翻转文本 · 全角半角转换 · Leet 语转换 · 小型大写 · 删除线生成 · 文本缩进器 · 文本填充器 · 回文检测器 · URL Slug 生成 · 文本解包器 · 文本换行器 · Unicode 转义 · Zalgo 文本 · 繁简体转换 · 中文数字转换 · 文本规范化 · 引号转换 · 中文大写金额 · 彩虹文字生成器 · 多语言字符串转义 · Unicode 归一化 · 文本换行工具 · 列对齐工具 · 数字转英文 · 缩写生成器 · 字符码点查询 · 编码检测 · 行编辑器 · 文件名重命名器 · 文本分块器 · 模板替换器 · Unicode 长度计算器

### 时间戳 (3)
时间戳转换器 · 时间戳格式化工具 · 时间推算

### 随机生成 (25)
抛硬币 · 掷骰子 · 列表随机化 · 随机数生成器 · 随机端口生成器 · 随机字符串生成器 · 组合与排列 · D&D 骰子 · 彩票号码生成器 · 随机选择器 · 随机日期生成器 · 随机邮箱生成器 · 随机 Emoji 生成器 · 随机浮点数生成器 · 随机 Hex 颜色生成器 · 随机整数生成器 · 随机 IP 生成器 · 随机姓名生成器 · 随机 RGB 颜色生成器 · 随机句子生成器 · 随机时间生成器 · 随机用户名生成器 · 决策助手 · 2FA 备份码生成器 · 加权随机选择器

### 密码管理 (9)
OTP 生成器 · 密码检测器 · 密码生成器 · 密码强度分析 · 易记密码生成器 · PIN 码生成器 · TOTP 验证码生成 · 熵值计算 · 加密便签

### 安全工具 (64)
HTML 净化器 · Basic Auth 生成器 · BIP39 助记词生成器 · 校验和计算器 · Chmod 计算器 · Vigenère 密码 · 信用卡号验证 · 加密工具 · 哈希生成器 · Hash 识别器 · HMAC 生成器 · IBAN 验证器 · JWT 解析器 · MD5 生成器 · OTP 生成器 · 密码检测器 · 密码强度分析 · 数字签名验证 · RSA 密钥对生成器 · Safelink 解码 · SSL 证书检测 · 字符串混淆器 · XOR 加密 · Atbash 密码 · Rail Fence 密码 · Affine 密码 · API Key 生成器 · Autokey 密码 · Beaufort 密码 · Enigma 模拟器 · 哈希对比 · HMAC 验证器 · Playfair 密码 · ROT 密码 · 安全令牌生成器 · OAuth Token 解码 · CORS 检测 · TLS 密码套件查询 · TOTP 验证码生成 · CSP 策略构建器 · 安全头检测 · XSS 编码器 · SQL 注入模式参考 · 熵值计算 · JWT 签名验证 · SRI 哈希生成 · CSP 策略验证 · PGP 公钥解析 · OAuth2 授权流程 · 点击劫持检测 · HSTS Preload 检查 · X.509 证书解析 · CSP 报告配置生成 · SSH 密钥格式 · hashcat 模式速查 · 密码破解时间估算 · 敏感信息扫描器 · 2FA 备份码生成器 · URL 跟踪参数清理器 · CSRF 防护生成器 · 加密算法对比 · API Key 识别器 · 数据脱敏器 · 加密便签

### 编程工具 (116)
API 请求测试器 · Git 提交信息生成器 · JSON Schema 验证器 · SemVer 版本比较 · 正则表达式可视化 · 浏览器性能测试 · Chmod 计算器 · Cron 表达式解析 · 设备信息 · Docker Compose 转换器 · Git 备忘录 · JavaScript 格式化 · JS 压缩 · JSON 对比 · JSON 验证器 · 按键信息 · LESS 变量替换 · 行号添加器 · 正则测试器 · SQL 语法检查 · 文本对比 · 字符级文本对比 · JSON 合并 · YAML 验证器 · Cron 表达式验证 · CSV 验证器 · JSON 扁平化 · JSONPath 提取 · JSON 键排序器 · JSON 转 TypeScript · 正则转义 · SQL 查询生成 · 文本对比工具 · XPath 查询测试 · 查找替换 · 正则构建器 · Git 速查表 · Nginx 配置生成 · JSON 转 C# 类 · JSON → Go 结构体 · JSON → Rust 结构体 · JSON → Swift 结构体 · JSON → Kotlin 数据类 · JSON → Dart 类 · JSON 转 Java POJO · JSON → Python 数据类 · JavaScript 转 TypeScript · JSON Schema 转 TypeScript · WebSocket 测试 · GraphQL 查询构建 · HTTP 请求头构建 · Cache-Control 分析 · 内容协商测试 · REST URI 模板测试 · HTTP 方法测试 · URL 模式匹配 · DNS 查询 · XSS 编码器 · SQL 注入模式参考 · CSP 策略验证 · CSP 报告配置生成 · 多语言字符串转义 · Glob 模式匹配 · .gitignore 生成 · Dockerfile 生成 · docker-compose 片段 · K8s 资源生成 · Terraform 格式化 · SemVer 版本递增 · Changelog 生成 · 分支名生成 · CI/CD 配置助手 · Makefile 生成 · SSH 密钥格式 · package.json 分析 · 开源许可证生成 · Dockerfile 检查 · Big-O 速查表 · 位运算计算器 · 字节序转换 · 算法复杂度 · 快捷键可视化 · 变量名生成器 · 代码注释去除 · 缩进转换 · 换行符转换 · 编码检测 · 布尔表达式简化 · IEEE 754 浮点数 · 补码计算器 · ANSI 转义码 · CSS 选择器权重计算器 · GraphQL Schema 转 TypeScript · MongoDB 聚合管道构建器 · SQL 转 Prisma · PostgreSQL 类型速查 · MySQL 函数速查 · SQLite PRAGMA 速查 · SQL 数据生成器 · Git 别名生成器 · 代码注释生成器 · 代码审查清单 · npm 版本范围解释器 · Git 分支清理器 · Conventional Commits 速查 · 代码语言检测器 · 矩阵计算器 · 复数计算器 · 大整数计算器 · JS 数组方法速查 · TypeScript 速查卡 · Python 速查卡 · AI 提示词模板 · 本地存储查看器 · 浏览器特性检测 · 代码片段库

### 前端开发 (49)
CSS 选择器测试 · Border 生成器 · Box Shadow 生成器 · CSS 动画生成器 · CSS 格式化 · CSS 压缩 · CSS 单位转换 · Flexbox 生成器 · HTML 压缩 · HTML 实时预览 · HTML 编辑器 · LESS 变量替换 · SVG 编辑器 · SVG 占位图生成器 · Text Shadow 生成器 · 字体测试 · HTML 表格生成 · Lorem Pixel 占位图 · CSS Grid 生成器 · CSS 滤镜生成器 · 缓动函数预览 · 透明度取色器 · Clip-Path 生成器 · 社交 Meta 预览 · CSS Transform 生成器 · HTML 转 JSX · CSS 转 Tailwind · Markdown 转 JSX · CSS 内联样式转换 · CSS 前缀检查器 · SCSS → CSS 变量 · HTML 转 Pug · CSS 转 SCSS · SVG 转 JSX · 颜色 → Tailwind 色阶 · 图标生成器 · OG 分享图生成器 · CSS 遮罩生成器 · CSS 选择器权重计算器 · CSS 变量提取器 · 媒体查询生成器 · CSS 选择器生成器 · Tailwind 配置生成器 · 性能预算计算器 · 无障碍检查清单 · 徽章生成器 · 视口尺寸工具 · 屏幕分辨率速查 · 图片尺寸计算器

### 数据生成 (57)
ASCII 文字画 · 条码生成器 · Border 生成器 · Box Shadow 生成器 · 调色板生成器 · 配色方案生成 · Crontab 生成器 · CSS 动画生成器 · Flexbox 生成器 · 渐变生成器 · IPv6 ULA 生成器 · Lorem Ipsum 生成器 · Lorem Ipsum 按词生成 · MAC 地址生成器 · Meta 标签生成器 · Numeronym 生成器 · 密码生成器 · 随机手机号生成 · QR 码生成器 · SVG 占位图生成器 · Text Shadow 生成器 · WiFi QR 码生成器 · NanoID 生成器 · API Key 生成器 · 泡泡字 · 颜色和谐配色 · 翻转文本 · HTML 表格生成 · Leet 语转换 · Lorem Pixel 占位图 · 彩票号码生成器 · 易记密码生成器 · PIN 码生成器 · 随机日期生成器 · 随机邮箱生成器 · 随机 Emoji 生成器 · 随机姓名生成器 · 随机句子生成器 · 随机时间生成器 · 随机用户名生成器 · 删除线生成 · 变位词检测器 · Zalgo 文本 · CSS Grid 生成器 · CSS 滤镜生成器 · Clip-Path 生成器 · CSS Transform 生成器 · 彩虹文字生成器 · 安全令牌生成器 · 变量名生成器 · 图标生成器 · OG 分享图生成器 · Webhook 负载生成器 · SQL 数据生成器 · 徽章生成器 · 正态分布计算器 · 日历生成器

### 文档工具 (54)
Git 提交信息生成器 · ASCII 表 · 字符映射表 · CSS 颜色名称 · Git 备忘录 · HTML 实体参考 · HTTP 状态码 · Markdown 预览 · Markdown 转 HTML · MIME 类型查询 · MIME 类型 · 数字签名验证 · 正则表达式备忘录 · Unicode 查找 · 单词统计器 · CSV 转 Markdown · Markdown 转纯文本 · 高级文本统计 · 文字分栏 · HTML 实体查询 · Git 速查表 · 关键词提取 · 文件魔术签名 · Markdown 表格生成 · .gitignore 生成 · Changelog 生成 · 分支名生成 · 开源许可证生成 · Big-O 速查表 · 字符码点查询 · 快捷键可视化 · 无障碍检查清单 · OpenAPI 查看器 · 常用端口速查 · Redis 命令速查 · PostgreSQL 类型速查 · MySQL 函数速查 · SQLite PRAGMA 速查 · 部署检查清单 · Markdown 目录生成器 · README 生成器 · 代码审查清单 · npm 版本范围解释器 · Conventional Commits 速查 · Markdown 表格格式化器 · hashcat 模式速查 · 加密算法对比 · 演讲时长估算 · Markdown 速查卡 · JS 数组方法速查 · TypeScript 速查卡 · Python 速查卡 · AI 提示词模板 · 开发者每日清单

### 网页工具 (69)
CSS 选择器测试 · HTML 净化器 · 条码生成器 · 拍照工具 · 色盲测试图 · 色盲模拟器 · 色彩对比度 · 倒计时器 · 设备信息 · Emoji 选择器 · Emoji 搜索 · HSL 取色器 · HTML 实体 · HTML 实时预览 · HTML 实体参考 · HTML 转 Markdown · HTML 编辑器 · JSON 查看器 · 按键信息 · Markdown 预览 · 数学计算器 · Meta 标签生成器 · 百分比计算器 · 番茄钟 · QR 码生成器 · QR 码读取器 · SVG 编辑器 · 字体测试 · URL 解析器 · User Agent · User-Agent 解析器 · 我的 IP · YAML 查看器 · HSL 颜色选择器 · 颜色混合器 · 高级拾色器 · 色轮工具 · Gravatar 生成器 · HTML 标签去除 · HTML 表格提取 · 间歇计时器 · 对数计算器 · 模运算计算器 · 月相 · 摩斯音频 · 质数检测器 · 比例计算器 · 日出日落时间 · 计时器与秒表 · 年度进度 · HTML 实体查询 · 社交 Meta 预览 · 星座查询 · 打字速度测试 · 反应速度测试 · 记忆测试 · 呼吸引导 · 简易待办清单 · 代理检测 · Data URI 生成 · JSON → HTML 视图 · ANSI 转义码 · CSS 选择器生成器 · SSE 事件流测试器 · 本地存储查看器 · 浏览器特性检测 · 视口尺寸工具 · 屏幕分辨率速查 · EXIF 查看器

### 代码生成 (33)
JSON → Go 结构体 · JSON → Rust 结构体 · JSON → Swift 结构体 · JSON → Kotlin 数据类 · JSON → Dart 类 · JSON 转 Java POJO · JSON → Python 数据类 · HTML 转 JSX · CSS 转 Tailwind · Markdown 转 JSX · CSS 内联样式转换 · CSS 前缀检查器 · JavaScript 转 TypeScript · JSON Schema 转 TypeScript · SVG 转 JSX · CSS 遮罩生成器 · 媒体查询生成器 · Tailwind 配置生成器 · REST CRUD 脚手架 · Mock API 设计器 · MongoDB 聚合管道构建器 · systemd 单元生成器 · systemd 定时器生成器 · Caddy 配置生成器 · .htaccess 生成器 · EditorConfig 生成器 · Ansible Playbook 生成器 · Prometheus 构建器 · Git 别名生成器 · README 生成器 · 代码注释生成器 · CSRF 防护生成器 · 代码片段库

### DevOps (20)
Dockerfile 生成 · docker-compose 片段 · K8s 资源生成 · Terraform 格式化 · 环境变量转换 · CI/CD 配置助手 · Makefile 生成 · Dockerfile 检查 · 配置格式互转 · systemd 单元生成器 · systemd 定时器生成器 · Caddy 配置生成器 · .htaccess 生成器 · EditorConfig 生成器 · Ansible Playbook 生成器 · Prometheus 构建器 · 部署检查清单 · 日志分析器 · Git 仓库健康检查 · Git 分支清理器

### 健康 (11)
BMI 计算器 · BMR 计算器 · 睡眠周期计算器 · 目标心率计算器 · 理想体重计算器 · 呼吸引导 · 体脂率估算 · 每日饮水计算 · 预产期计算 · 血液酒精估算 · 运动消耗计算

### 生活 (13)
小费计算器 · 电费计算器 · 油耗计算器 · 星座查询 · 生肖年龄查询 · 睡眠周期计算器 · 决策助手 · 简易待办清单 · 每日饮水计算 · 血液酒精估算 · 中国节假日速查 · 跨时区会议安排器 · 开发者每日清单

### 金融 (5)
贷款计算器 · 投资回报计算器 · 复利计算器 · 增值税计算器 · 中文大写金额

### 游戏 (3)
打字速度测试 · 反应速度测试 · 记忆测试

### 购物 (1)
折扣计算器

### 动画 (2)
缓动函数预览 · 排序算法可视化

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

## 🏗 项目结构

```
S-Jiffy/
├── index.html          # 首页（工具总览/搜索/分类，560 个工具注册）
├── favicon.svg         # 站点图标
├── assets/
│   ├── css/global.css  # 全局样式（CSS 变量主题/组件类/数学符号字体栈）
│   └── js/global.js    # 全局 JS（htmlEscape/弹窗/复制/历史记录）
├── projects/           # 560 个工具，每个独立目录
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
- **全中文界面** — 界面文案、状态提示、错误信息使用中文（技术缩写如 Base64/JSON 可保留）
- **XSS 防护** — 用户输入渲染一律经 `htmlEscape()` 或 `textContent`
- **ES5 兼容** — 不使用箭头函数/模板字符串等 ES6+ 语法，保持零构建直接运行
- **数学符号** — 公式中的特殊符号（√∑π×÷≤≥）依赖全局字体栈，无需额外处理；长根号需使用覆盖线结构（参照 distance-calculator）
- **注册** — 在 `index.html` 的 `tools` 数组（含 name/desc/link/cats）与 `categories` 数组（如需新分类）中添加条目，name 须与页面 `<title>` 一致

## ⚠️ 免责声明

所有工具的操作和计算均在浏览器本地完成，不会向任何服务器传输数据。由于浏览器环境差异和实现复杂度，极少情况下可能出现计算偏差或兼容性问题，请在使用后自行校验关键结果。如遇问题，欢迎提交 [GitHub Issues](https://github.com/stop666two/S-Jiffy/issues)，感谢配合！

## 📄 许可证

MIT License - 仓库地址：[https://github.com/stop666two/S-Jiffy](https://github.com/stop666two/S-Jiffy)
