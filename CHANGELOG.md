# 更新日志

本项目的所有重要变更均记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [2026-08-22]

### Added

- 新增 100 个程序员工具（JSON 互转、API 工具、DevOps、Git 协作、安全、数学、速查卡等），总数 460 → 560
- 新增 12 种灵签工具（月老 / 财神 / 黄大仙 / 观音 / 吕祖 / 关帝 / 车公 / 土地公 / 王公 / 玉帝 / 佛祖 / 周公），每签含完整签文与解签数据
- 新增文化阅读工具：论语全文、歇后语大全、名人名言、各国国旗（192 国）
- 新增历法工具：万年历、老黄历（lunar-javascript 历法库本地化）
- 新增玄学工具：六爻排盘、答案之书、周易六十四卦、旋转太极图、电子木鱼
- 新增实用工具：在线闹钟、车牌号归属地查询、在线画板、在线录音、部首查字、汉字偏旁查询、在线鼓机、视频剪切（ffmpeg.wasm + Service Worker 同源代理）
- 新增 `favicon.svg` 站点图标，全站 591 页统一引用

### Fixed

- server.js 路径穿越漏洞与畸形 URL 崩溃（decodeURIComponent 未捕获）
- 主页重复工具注册（文本对齐/列对齐重复条目）
- 全站 24 个功能缺陷：checksum-calculator（MD5）、css-formatter、hmac-verify、html-to-pug、ipv4-range-expander、json-schema-validator、json-to-swift、json-to-xml、json-to-xml 多键丢失、qr-code-generator、qr-reader、wifi-qr-code、quote-converter、semver-compare、sql-format、sql-validator、sunrise-sunset、xml-formatter、xor-cipher、xpath-query、yaml-validator 等
- 7 项 UI 问题：sunrise-sunset 全中文化、text-comparison 输出中文、hmac-verify 中文、text-aligner 显示宽度对齐、text-cleaner 白名单提示、text-normalizer 宽度、svg-placeholder 输入框宽度
- 部署遗留问题：CSP 未放行 jsdelivr CDN（QR 类工具脚本部署后被拦截）；server.js MIME 表补全（wasm / 字体 / 音视频等 30+ 类型）
- 数学符号字体栈（--font-mono 缺 Segoe UI Symbol / Cambria Math，符号显示为方框）
- 460 页批量问题：JS 语法错误 13 处、中文标识符残留、中文 CSS 类名、BOM 8 文件、CRLF 5 文件
- 删除多余启动脚本与残留文件

### Changed

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
