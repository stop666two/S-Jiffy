# 更新日志

本项目的所有重要变更均记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [2026-11-21] 全量审查：修复 6 类系统性缺陷并补齐自动化门禁

对 549 个工具页做了逐页真实浏览器加载 + 点击扫描、CSP 复测、i18n/注册表/跳转表机器对账，修复以下缺陷。

### Fixed

- **运行时崩溃（14 页）** — 34 个工具页用局部变量 `t` 遮蔽了全局翻译函数 `t()`，点击即抛 `TypeError: t is not a function`（`autokey-cipher` 的加密主路径直接不可用）；全部改为 `txt`/`ti`，共 50 处
- **控件被 i18n 删掉（10 处 / 9 页）** — `i18n.js` 的 `apply()` 对 `[data-i18n]` 元素整体赋值 `textContent`，把同标签内的子控件一起删掉：`json-to-typescript` 的语言下拉与输入框消失并导致脚本中断、`password-generator` 的长度数字不显示、7 个页面的非 HTTPS 警告永远无法出现。改为只替换文本节点，保留子元素
- **`rot13` 算法错误** — 原来把大写与小写两趟结果拼接，输出翻倍乱码；改为单趟映射（`Hello, World!` → `Uryyb, Jbeyq!`），`ROT18` 连带修正
- **译文被当作元素 id** — `less-compiler`、`json-sort` 用 `getElementById(t('ui.x', …))`，非中文界面下取到 null 后崩溃；改为固定 id（`json-sort` 的元素 id 由 `diff输出` 改为 `diffOutput`）
- **HTML 实体表 98 条假名** — `html-entities` 的 2231 行表中有 `&AEli;` `&Aacut;` 等 98 条截断名与 9 条重名；按 WHATWG 规范表重建为 2125 条唯一实体名（`scripts/entity-names.json` 为唯一来源，`scripts/gen-entities.js` 生成）
- **生产 CSP 阻断可用工具** — `md5-generator`、`json-schema-validator` 依赖 cdnjs（`script-src 'self'` 拦死）→ 改为自托管 `ajv7.min.js`、`blueimp-md5.min.js`；`dns-leak-test` 的 `*.browserleaks.net`、`currency-converter` 的 `api.frankfurter.app`、`clickjack-test` 的任意 https iframe 探测补进 CSP
- **`clickjack-test` 的假安全结论** — iframe 被拦截时也输出「✅ 受保护」；改为「读到 X-Frame-Options / frame-ancestors 才算受保护，否则无法判定」，并识别本站 CSP 拦截
- **4 个工具描述张冠李戴** — `checksum-calculator`、`pdf-signature`、`rsa-key-pair-generator` 的 desc 复制自 `camera-recorder`（"使用摄像头拍照并下载…"）；按实际功能重写六语言文案
- **`ssl-checker` 名不副实** — 标题称检测 SSL 证书，实际只能读响应头；改为「连接与安全响应头检查」，并说明浏览器无法读取证书
- **跨域失败提示误导** — `cors-checker` / `security-headers` / `sri-generator` / `api-tester` / `clickjack-test` 在 CSP 白名单外的目标上失败时，明确说明是本站 CSP 或 CORS 限制，不再笼统归因
- **`server.js` 免等价与安全隐患** — 不发 CSP（本地与线上不同）；`listen(0.0.0.0)` 暴露局域网；启动时按 `.server.pid` 盲杀 PID（PID 复用会误杀无关进程）；`gzipCache` 无上限；304 分支缺 `Cache-Control`。改为：发同一份 CSP、默认只听 127.0.0.1（`HOST`/`PORT` 可覆盖）、校验命令行后才终止进程、64 项 LRU、304 前设置缓存头
- **主页 CLS 0.21（4x CPU + slow3g）** — 分区标签样式由行内脚本在末尾注入 `<style>`，首屏先按默认按钮排版再变小胶囊导致整页重排；改为静态 CSS，并给工具网格预留高度、卡片改用 `DocumentFragment` 一次插入。CLS → 0.061
- **次要文字对比度不足** — `--color-text-secondary` `#787774`（白底 4.48:1、软底 4.14:1）改为 `#6B6A66`（5.41:1 / 5.01:1）；footer 与历史徽标原用 `--color-text-disabled`（`#AAAAAA`，2.32:1）改为次要文字色，axe 的 color-contrast 违规从 6 个节点降为 0
- **结果状态不可朗读** — 549 页共享的 `.tool-status` 无 `role`/`aria-live`；由 `global.js` 统一注入 `role="status" aria-live="polite" aria-atomic="true"`
- **SEO 缺静态元数据** — 静态 `<meta name="description">` 仅 2/549、无 canonical、无 sitemap/robots/404；由 `scripts/gen-meta.js` 为 550 个页面写入 description/canonical/og，并生成 `sitemap.xml`、`robots.txt`、`404.html`
- **部署配置只有 Netlify** — 新增 `_headers`、`_redirects`、`vercel.json`，四份配置与本地服务器统一由 `scripts/lib/deploy-config.js` 生成，135 组 301 与安全头在四个平台一致
- **未开启 JS 时语言下拉是死控件** — 549 页的 `<select id="langSwitch">` 补 `onchange` 兜底

### Changed

- **数据单一来源** — `index.html` 的 `tools` 数组成为工具名称/描述唯一来源；`gen-home-i18n.js` 由注册表生成六语言 `home.json`（中文值直接写入，消除 1 个名称 + 11 个描述漂移），非中文保留译文
- **CSP 全站开放 `'unsafe-eval'` 并补 `blob:`** —— Pages 无法按路径覆盖响应头，`image-converter` 的 HEIC 解码（heic2any/libheif，初始化用 `new Function`）只能靠全站放宽；同时实测发现 `img-src` 缺 `blob:` 会让 34 个工具页的本地预览（`URL.createObjectURL`）全部被拦，已补 `img-src 'self' data: blob:` 与 `media-src 'self' blob:`。实测：718 KB 的 HEIC 样本在本地与线上均成功转成 2.2 MB PNG，0 CSP 违规
- **修正 Cloudflare Pages 的同名头拼接问题** — 实测 Pages 对同名响应头是拼接而非覆盖：`/*` 的 `Cache-Control: no-cache` 与 `/assets/*` 的值被拼成 `no-cache, public, max-age=3600, …`，缓存策略实际失效；按路径放宽的 CSP 会变成两个同时生效的策略（取交集），放宽完全无效。`_headers` 因此不再给 `/*` 设 `Cache-Control`，也不再下发按路径放宽的 CSP；本地服务器 / Netlify / Vercel 仍保留按路径覆盖（HEIC 转换可用），Pages 上该功能被拦并给出明确提示
- **缓存规则收敛为单条** — `/assets/*` 与 `/assets/i18n/*` 两条重叠规则在 Pages 上会被拼成两个 `Cache-Control` 值，含义不确定；统一为 `/assets/*` = `max-age=300, stale-while-revalidate=86400`（assets 无内容哈希，5 分钟 + 后台刷新兼顾新鲜度）
- **缓存策略按实际平台修正** — 生产是 Cloudflare Pages（实测响应里没有任何 CSP / X-Frame-Options，`netlify.toml` 从未生效）。`_headers` 因此成为主配置；`/assets/*` 无内容哈希，TTL 由 24 小时压到 1 小时并允许后台刷新（`stale-while-revalidate=86400`），避免发版后新旧资源不匹配；i18n 词典 5 分钟
- **站点源集中到一处** — `SITE_ORIGIN` 定为 `https://s-jiffy.pages.dev`（实际生产为 Cloudflare Pages），canonical/og:url/sitemap/robots 全部由 `scripts/gen-meta.js` 按此生成
- **删除 816 个孤儿词典** — 136 个已合并工具的词典 × 6 语言；同时清理 1731 个页面词典里与 `common.json` 重复的 `common.footer`
- **QR 库去重** — `qr-code-generator` 从 `qrcodejs.min.js` 迁到 `qrcode.js`（含 UTF-8 编码修正，中文二维码可被正确识别），删除 `qrcodejs.min.js`
- **实体条数口径** — `html-entities` 描述由 2231 条改为 2125 条（规范表 2231 个原始条目对应 2125 个唯一实体名）
- **统一 LF 行尾** — 458 个文件由 CRLF 转为 LF；`*.bat`/`*.cmd` 显式声明 `eol=crlf` 并转 CRLF

- **180 个 `<select>` 无可访问名** — 工具页内的选择器全部是功能性控件，却没有任何可访问名（axe `select-name`，WCAG 4.1.2）。逐个按语义补 `aria-label` + `data-i18n-attr-aria-label`，并在六语言词典新增 `ui.aria.*` 共 109 个键；`scripts/check.js` 增加门禁项 `a11y` 防止回退
- **首页卡片描述键盘不可达** — 描述区原是 `max-height:66px + overflow-y:auto` 的小滚动框（axe `scrollable-region-focusable`，28 个节点），改为 `-webkit-line-clamp:3` 截断，完整描述留在工具页

### Added

- **`scripts/check.js` 零依赖门禁** — 6 项静态检查（`t` 遮蔽、i18n 写入路径与 key 覆盖、伪 id、注册表/词典/跳转表一致性、CSP 白名单、实体表）加生成物新鲜度校验，退出码 0 为通过；已做负例自测（注入遮蔽与 CDN 脚本时退出码 1）
- **生成器** — `gen-deploy-config.js`、`gen-home-i18n.js`、`gen-meta.js`、`gen-entities.js`，均支持 `--check`
- **`package.json`** — `npm run check` / `npm start` / `npm run gen`

### Removed

- `assets/vendor/qrcodejs.min.js`（与 `qrcode.js` 重复）
- 工具运行期产生的 `database.db` / `-shm` / `-wal`、陈旧 `.server.pid`

## [2026-08-24] 移除随机邮箱生成工具

### Removed

- 随机邮箱生成（random-email）：功能与邮箱规范化重叠且提供一次性邮箱选项，完全移除（主页卡片、工具页、6 语言词典、home.json 键），工具总数 550 → 549；README 工具总览与分类计数同步重新生成

## [2026-08-24] WebRTC 泄漏检测友好降级

### Changed

- webrtc-leak-test：浏览器不支持 WebRTC 或插件拦截导致无法获取公网地址时，不再显示「无法完成检测」，改为显示「✅ 正常（浏览器不支持或插件拦截，已跳过泄漏对比）」并列出 WebRTC 支持行；6 语言文案

## [2026-08-24] 新增独立 WebRTC 泄漏检测与 DNS 泄漏检测工具

### Added

- 新增独立工具 **WebRTC 泄漏检测**（projects/webrtc-leak-test/）：8 个 STUN 服务器收集候选（本地/公网/Relay/IPv6），无公网候选自动重试一轮，对比 STUN 公网 IP 与页面出口 IP 判断泄漏；结果区可滚动
- 新增独立工具 **DNS 泄漏检测**（projects/dns-leak-test/）：基于 browserleaks 开放检测协议探测实际 DNS 服务器（IP/ISP/位置表格，IPv4 前 IPv6 后），汇总 N 服务器/M ISP/K 位置并与出口位置一致性判断；结果表可滚动
- 两个工具均接入主页（工具卡 + 6 语言词典 + 分类计数自动更新）

### Changed

- proxy-detect 回退：移除页面内 WebRTC/DNS 泄漏检测子卡片与 DNS 按钮（泄漏检测改为独立工具），环境检测保留 WebRTC IP 泄漏行与出口 IP 一致性判断

### Fixed

- 修复主页 tools 数组语法错误（新条目曾被错误插入 ip-lookup 条目内部导致整页 JS 失效）

## [2026-08-24] 代理检测：WebRTC 与 DNS 泄漏检测拆分为独立卡片

### Changed

- proxy-detect 页面重构：WebRTC 泄漏检测与 DNS 泄漏检测从「开始检测」与环境检测中拆出，成为两个独立的常显卡片（各带独立「开始检测」按钮与结果区），卡片标题随 6 语言本地化
- 「开始检测」（环境检测）不再包含 WebRTC 相关行，评分仅基于 UA/Tor/Cookie 特征；WebRTC 支持/本地 IP/公网 IP/Relay/IPv6 与 IP 一致性对比全部归入 WebRTC 泄漏检测卡片
- 修复 proxy-detect 页面两行重复 dnsCard HTML（历史补丁残留）

### Fixed

- 词典清理：移除不再引用的 ui.dnsBtn、webrtcLabel、summaryUnknown 键（6 语言）

## [2026-08-24] 代理检测增强：WebRTC 泄漏检测 + DNS 泄漏检测

### Added

- 代理检测（proxy-detect）新增 **DNS 泄漏检测**：基于 browserleaks 开放检测协议（随机子域 + 权威 DNS 记录递归解析者），30 个随机子域（15 IPv4-only + 15 IPv6-only）15 并发探测，收集 DNS 服务器 IP/ISP/位置列表；结果表格按 IPv4/IPv6 排序，汇总「N 个 DNS 服务器、M 个 ISP、K 个位置」；与出口位置（ipleak.net）一致性对比判断（含 DoH 加密 DNS 正常性提示）；短路加速（≥4 台服务器或连续空响应即提前结束），进度实时显示
- WebRTC 检测升级至 browserleaks 级别：RTCPeerConnection 支持检测、本地 IP（host，含 mDNS 混淆标记）、公网 IP（STUN srflx/prflx）、Relay（TURN）、IPv6 候选单独展示

### Changed

- proxy-detect 描述更新（6 语言词典 + 主页卡片）：补充 WebRTC IP 泄漏与 DNS 泄漏检测说明

### Fixed

- proxy-detect 移除基于 HTTP 响应头的伪信号检测（浏览器 JS 无法读取响应头，原结果存在误导）

## [2026-08-24] 合并相似工具

### Added

- 新增 image-converter（12 个图片转换方向合一：PNG↔JPG/WebP、JPG↔WebP、HEIC→PNG/JPG、AVIF→PNG/JPG、SVG→PNG/JPG，批量 ≤20 张 ≤50MB，全程本地）
- sensitivity-converter 升级为 13 款游戏全矩阵双向互转（含 CS2、Valorant、Apex、PUBG、Fortnite、使命召唤、战地 2042、光环、Warframe 等，公式逐一核对）
- json-to-typescript 扩展为 12 语言输出（C#/Go/Rust/Swift/Kotlin/Dart/Java/Python/TS/JSON Schema/GraphQL/JS）

### Changed

- 合并 134 个相似/重复工具为 46 个统一工具（功能全部融合不丢失），总数 682 → 548：
  - 编码转换：base64 集成 10 种编码（Base32/36/45/58/62/85/91/92/Ascii85），text-encoder 集成 encoding-converter（+检测 tab、UTF-16LE 视图）
  - 图片/哈希/表格/日期/文本类：html-entities、html-table-generator、hash-generator、mime-lookup、mac-address-generator、date-calculator、text-diff、text-statistics-adv、json-formatter、dockerfile-generator、docker-compose-converter、ascii-table、crontab-generator、uuid-generator（+v1/v6）、percentage-calculator、emoji-search、user-agent-parser、dice-dnd、hex-converter、hmac-generator、base64-to-image、number-base-converter、image-converter 等均以 tab/select 模式融合原被合并工具全部功能
  - 灵签类：zhougong-lingsign 融合 10 位神祇签文（周公/车公/土地公/王公/吕祖/佛祖/关帝/玉帝/月老/黄大仙/观音，共 857 签）
  - 计时/速查/二维码/安全类：timer-stopwatch（秒表/倒计时/间歇）、git-cheatsheet（5 主题）、qr-code-generator（生成/解码/WiFi）、csp-builder（+验证）、api-key-generator（+识别）、systemd-unit-generator（+定时器）、env-converter（+命名）、length-converter（长度/面积/体积/速度）、age-calculator（+生肖）、date-formatter（+序列）
  - 修复被合并工具中原有缺陷：base36/62/91/92/ascii85/base45 算法字节序错误、chinese-zodiac 生肖错位、AVIF「伪转换」等
- 全部保留工具的描述更新为完整功能描述（index.html 主页卡片 + 6 语言词典 desc/meta.description 五处一致）
- 被合并工具路径全部 301 重定向至保留工具（server.js + netlify.toml，135 条规则）；修复 server.js 历史性双 server/重复 redirects 块损坏（重建为 409 行干净单 server）
- server.js 显式绑定 IPv4（0.0.0.0）修复 Windows 下 IPv6 端口保留导致 EADDRINUSE

### Fixed

- 主页删除 134 个被合并工具卡片残留及词典残留键（含漏删的 encoding-converter → 404 卡）
- image-converter 卡片标签双重嵌套数组 `cats: [["..."]]` 导致 en 模式显示未翻译标签
- text-encoder 检测页复制按钮缺 ui.copy/ui.copied 六语言键（en 模式回退中文）

## [2026-08-24]

### Fixed

- 全站 683 个工具页未包裹中文文案清零：570+ 功能工具 JS/HTML 文案接入六语言词典（t() 包裹 / data-i18n / labelKey 数据模式），含全角标点盲区（：；，。！？（））专项修复
- 修复一类「非中文语言下页面脚本崩溃」根因：中文元素 ID + `getElementById(t('键','中文id'))` 在 en/es/ja 下返回 null 导致整页失效（30+ 工具，如 bytes-formatter / css-minifier / html-to-markdown / timestamp 等），已全部改为 ASCII ID
- 修复「局部 `var t` 遮蔽全局 t()」导致空输入路径 TypeError 崩溃（20+ 工具，如 csv-validate / meta-preview / sql-validator / playfair-cipher 等）
- 修复「t() 结果当状态码/分类比较值」导致非中文语言下筛选/高亮失效（python-cheatsheet / typescript-cheatsheet / js-array-cheatsheet / crypto-algorithm-comparison / markdown-cheatsheet 等）
- 修复 42 个词典文件 JSON 损坏（上次会话追加键时写入闭合花括号之后，i18n 静默失败回退中文）——已按原键序重建
- 修复 569 个页面冗余 `</script></script>` 闭合标签
- 修复词典值字面 `\n`（两字符）导致复制文本无换行（badge-generator / log-analyzer / matrix-calculator 等 6 工具）
- 修复词典值拼接缺空格（"total1requests" 类，log-analyzer 等）
- 修复 16 个灵敏度转换器 sensNoteXAxis 缺键、resize-image 16 个 preset 动态键缺失（fallback 中文外显）
- 修复 csp-validator 内联 JS 字符串未闭合（整页脚本失效）
- 修复 ai-prompt-templates / csv-formatter 等动态行 i18n 失效与分类筛选失效
- 修复硬编码 locale `toLocaleDateString('zh-CN')`（moon-phase / timestamp 等，改用 I18N.lang）
- 主页 6 语言缺 home.cat.图片处理/音频处理 键、zh-CN/zh-TW/zh-HK 的 DevOps 未本地化
- 主页 .tool-card 溢出：固定高 168px 改 min-height，长描述内部滚动条改 3 行截断，标签行不再溢出卡片

### Changed

- server.js gzip 缓存 ETag 改为内容哈希（修改文件后旧缓存不再误服）；i18n 词典响应头改 no-cache（原 24h 缓存导致翻译修复不可见）

## [2026-08-23]

### Added

- 全站 1641 处硬编码文案（setStatus / innerHTML / 静态文本 / placeholder）批量提取为词典 key，六语言补齐（含 COMMON_MAP 共享 key 81 个）
- 14 个重量级库自托管至 `assets/vendor/`（pdf-lib / docx / tesseract / heic2any / transformers.js 等），全站零外部 CDN 依赖
- 服务端 gzip 压缩 + ETag 条件请求（304），assets 静态资源 24 小时缓存

### Fixed

- 修复主页 95 个新工具条目被误插入脚本逻辑区导致 tools 数组缺失（主页仅显示 591 个工具），已回归 686 并修复数组尾部多余逗号
- 合并 3 对同名工具：时间戳转换器（epoch-converter 融合相对时间与日期字符串识别）、位运算计算器、在线画板（保留功能更全者），总数 686 → 683
- 主页工具卡片等高统一（168px，描述溢出区滚动）

### Changed

- 主页注册数据更新至 683 个工具、36 个分类（新增图片处理 / 音频处理）
- README 全面更新（683 工具 / 36 分类计数表 / 自托管与 i18n 目录说明 / 本地化开发规范）

### 新增 100+ 个工具（图片处理 17 个、PDF 12 个、音频 6 个、游戏 33 个、开发/计算/常用 40+ 个），总数 560 → 686
- 全部 686 个工具页六语言完整本地化（HTML 文本 + JS 运行时文案 + 每页独立词典，逐语言撰写）
- 主页工具条目随语言切换（工具名与描述来自各语言词典，含新增工具）

### Fixed

- 修复部分页面（灵敏度换算等）语言切换不生效的问题
- 修复打开页面瞬间旧界面闪烁（header 返回按钮先行隐藏 + 静态注入语言切换器）
- 修复拖放区域提示文字被挤压（换行布局）
- 修复繁体转换工具变量遮蔽导致的运行时错误
- 修复直链访问工具页（无 index.html 路径）时词典加载失败
- 修复日文词典中部分工具名残留简体中文（「生成」→「ジェネレーター」）

## [2026-08-22]

### Added

- 新增六语言国际化（i18n）：English / 简体中文 / 繁體中文（台灣）/ 繁體中文（香港）/ Español / 日本語，全部内容逐语言撰写，运行时切换
- 语言切换器：主页与工具页 header 右上角下拉菜单，任意页面随时切换，选择持久化（localStorage），首次访问跟随浏览器语言自动检测
- 返回按钮迁移至展示栏（tool-workspace）左上角，语言切换器占据原返回按钮位置
- 主页全面本地化：标题与 meta 描述、分类名、591 个工具名称与描述、搜索（多语言双轨匹配）、历史记录（slug 存储兼容多语言）、工具栏与状态提示
- 首批 5 个代表工具完整本地化：Base64 编解码、BMI 计算器、财神灵签、繁简体转换、老黄历
- 新增 100 个程序员工具（JSON 互转、API 工具、DevOps、Git 协作、安全、数学、速查卡等），总数 460 → 560
- 新增 12 种灵签工具（月老 / 财神 / 黄大仙 / 观音 / 吕祖 / 关帝 / 车公 / 土地公 / 王公 / 玉帝 / 佛祖 / 周公），每签含完整签文与解签数据
- 新增文化阅读工具：论语全文、歇后语大全、名人名言、各国国旗（192 国）
- 新增历法工具：万年历、老黄历（lunar-javascript 历法库本地化）
- 新增玄学工具：六爻排盘、答案之书、周易六十四卦、旋转太极图、电子木鱼
- 新增实用工具：在线闹钟、车牌号归属地查询、在线画板、在线录音、部首查字、汉字偏旁查询、在线鼓机、视频剪切（ffmpeg.wasm + Service Worker 同源代理）
- 新增 `favicon.svg` 站点图标，全站 591 页统一引用

### Fixed

- 工具页 pageKey 解析：/projects/xxx/（目录形式）访问时词典加载失败，正则限定 projects/ 前缀并兼容 index.html 后缀
- chinese-converter 繁体字表变量名 t 遮蔽全局翻译函数导致 TypeError，改名 tradChars
- 主页缺失状态栏元素，删除历史等操作提示不显示，补齐 .tool-status
- server.js 路径穿越漏洞与畸形 URL 崩溃（decodeURIComponent 未捕获）
- 主页重复工具注册（文本对齐/列对齐重复条目）
- 全站 24 个功能缺陷：checksum-calculator（MD5）、css-formatter、hmac-verify、html-to-pug、ipv4-range-expander、json-schema-validator、json-to-swift、json-to-xml、json-to-xml 多键丢失、qr-code-generator、qr-reader、wifi-qr-code、quote-converter、semver-compare、sql-format、sql-validator、sunrise-sunset、xml-formatter、xor-cipher、xpath-query、yaml-validator 等
- 7 项 UI 问题：sunrise-sunset 全中文化、text-comparison 输出中文、hmac-verify 中文、text-aligner 显示宽度对齐、text-cleaner 白名单提示、text-normalizer 宽度、svg-placeholder 输入框宽度
- 部署遗留问题：CSP 未放行 jsdelivr CDN（QR 类工具脚本部署后被拦截）；server.js MIME 表补全（wasm / 字体 / 音视频等 30+ 类型）
- 数学符号字体栈（--font-mono 缺 Segoe UI Symbol / Cambria Math，符号显示为方框）
- 460 页批量问题：JS 语法错误 13 处、中文标识符残留、中文 CSS 类名、BOM 8 文件、CRLF 5 文件
- 删除多余启动脚本与残留文件

### Changed

- 全站界面文案随语言切换：页面标题、meta 描述、按钮、占位符、状态提示全部本地化（未本地化的工具页保留中文原文）
- 历史记录改为 slug（工具目录名）存储，多语言切换后历史记录不再丢失匹配
- 主页注册更新至 591 个工具、34 个分类
- README 全面更新（591 工具 / 34 分类计数表 / 新工具清单）
- 站点字体回退栈优化，数学符号正确渲染

## [2026-07-19]

### Added

- 新增 100 个编程指尖工具（360 → 461 总）
- 自定义模态弹窗（showPrompt / showAlert / showConfirm）替换原生 prompt
- `start.bat` 一键启动脚本（独立单文件版）

### Fixed

- cicd-helper 缺少括号语法错误
- HTTP 混合内容、重复 CSS 清理、CSP 安全头补充
- innerHTML XSS 防护：32 个文件的用户数据添加 htmlEscape()
- start.bat 中文乱码与窗口秒退问题

### Changed

- 全站中文标识符替换为英文（273 个文件）
- README 更新至 461 工具

## [2026-07-13]

### Added

- 新增 50 个工具（361 总）及大量修复

## [2026-07-12]

### Added

- 初始版本：211 个工具、25 个分类、minimalist-ui 设计
- 一键部署按钮（Cloudflare / Netlify / Vercel / GitHub Pages）与部署配置
- 使用历史记录：常用 / 最近 / 热门 追踪（localStorage）
- 历史管理、搜索功能、全中文界面
