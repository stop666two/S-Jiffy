# 更新日志

本项目的所有重要变更均记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [2026-08-23]

### Added

- 新增 100+ 个工具（图片处理 17 个、PDF 12 个、音频 6 个、游戏 33 个、开发/计算/常用 40+ 个），总数 560 → 686
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
