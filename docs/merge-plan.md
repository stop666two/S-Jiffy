# 相似工具整合计划（merge-plan）

> 原则：**所有功能零丢失**——被合并工具的全部功能/模式/数据必须融合进保留工具，不是删除。
> 每组合并后：①保留工具功能完整 ②6 语言词典键补齐（新增功能的 UI 文案）③被合并目录保留 301 重定向
> 状态：**已完成 ✅（2026-08-24）**。全部 31 组 A 组 + 3 项 B 组 + 12 组 C 组合并完毕：683 → 548 个工具，功能全部融合（含修复被合并工具原有算法缺陷），被合并目录全部 301 重定向至保留工具，6 语言词典与主页描述同步更新。详见 CHANGELOG.md「[2026-08-24] 合并相似工具」。本文件保留作为合并映射的永久记录。

## A 组：直接融合（~25 组）

| # | 保留工具 | 被合并（功能融合点） | 状态 |
|---|---|---|---|
| A1 | lorem-ipsum-generator | lorem-ipsum（按句/按词模式）、lorem-ipsum-word（按词生成）→ 加模式 select：段落/句子/单词 | |
| A2 | html-entities | html-entity-lookup（实体查询表）→ 加「查询」tab（内嵌完整实体表） | |
| A3 | html-table-generator | html-table-extractor（从 HTML 提取表格）→ 加「提取」tab | |
| A4 | hash-generator | hash-comparison（哈希对比）→ 加「对比」tab | |
| A5 | mime-lookup | mime-types（完整列表浏览）→ 加「完整列表」tab | |
| A6 | mac-address-generator | mac-address-lookup（厂商查询）→ 加「查询」tab | |
| A7 | encoding-converter | encoding-detector（检测编码）→ 加「检测」tab | |
| A8 | date-calculator | date-add（加减天数）、date-difference（差值天数）、time-diff（精确差值年月日）→ 加「差值」tab（精确到年/月/日/时/分/秒） | |
| A9 | text-diff | text-comparison（逐行对比）、diff-checker（高亮）、text-diff-char（字符级）→ 加「字符级」模式 | |
| A10 | text-statistics-adv | text-statistics（基础统计）、text-frequency（词频）→ 加「词频」tab + 补基础指标 | |
| A11 | json-formatter | json-prettify（颜色高亮）→ 若无高亮则补 | |
| A12 | json-minify-advanced | json-minify（压缩）→ 已覆盖，确认选项即可 | |
| A13 | dockerfile-generator | dockerfile-lint（最佳实践检查）→ 加「检查」tab | |
| A14 | docker-compose-converter | compose-snippets（常用服务片段）→ 加「片段」tab | |
| A15 | sql-format | sql-prettify（高亮美化）→ 已覆盖，确认 | |
| A16 | ascii-table | text-table（数据→ASCII 表格）→ 加「生成表格」tab | |
| A17 | ip-lookup | whats-my-ip（本机 IP 显示）→ 已含，确认 | |
| A18 | text-wrapper | line-wrapper（按宽度换行）→ 同功能，确认参数一致 | |
| A19 | epoch-converter | timestamp（秒级转换）→ 已含秒毫秒，确认 | |
| A20 | crontab-generator | cron-expression（解析+未来执行时间预览）、crontab-validator（语法验证）→ 加「解析/验证」tab | |
| A21 | uuid-generator | uuid-v1（时间+MAC）、uuid-v6（可排序）→ 版本 select：v1/v4/v6 | |
| A22 | percentage-calculator | diff-percentage（差异百分比）→ 加模式：百分比计算/差异百分比 | |
| A23 | slugify-string | text-slug（URL slug）→ 同功能，确认 | |
| A24 | emoji-search | emoji-picker（分类浏览）、random-emoji（随机）→ 加「浏览」tab + 随机按钮 | |
| A25 | user-agent-parser | user-agent（当前浏览器 UA）→ 加「我的 UA」按钮 | |
| A26 | dice-dnd | dice-roller（自定义面数/数量）→ 加面数/数量输入 | |
| A27 | hex-converter | hex-to-rgb/rgb-to-hex/hex-to-hsl/hsl-to-hex → 格式 select 补 HSL | |
| A28 | hmac-generator | hmac-verify（签名验证）→ 加「验证」tab | |
| A29 | base64 | base32-converter/base36-encoder/base45/base58-converter/base62-encoder/base85-converter/base91/base92/ascii85 → 编码 select（10 种） | |
| A30 | base64-to-image | image-to-base64（图→Base64）→ 加「图片转 Base64」tab | |
| A31 | number-base-converter | base-converter/base-convert（确认覆盖）、binary-calculator（二进制四则运算）→ 加「运算」tab | |

## B 组：新建/扩展承接（3 个）

| # | 保留工具 | 融合内容 | 状态 |
|---|---|---|---|
| B1 | image-converter（新建） | png-to-jpg/jpg-to-png/webp-to-jpg/jpg-to-webp/webp-to-png/png-to-webp/heic-to-jpg/heic-to-png/avif-to-jpg/avif-to-png/svg-to-png/svg-to-jpg —— 支持全部 12 个转换方向，含 SVG 缩放选项、HEIC/AVIF 解码 | |
| B2 | sensitivity-converter（扩展） | valorant/cs2/apex/overwatch2/pubg/fortnite/cod/bf2042/halo/warframe 各单游戏转换器 + 16 个 A→B 互转 —— 统一为「源游戏→目标游戏」全矩阵 | |
| B3 | json-to-typescript（扩展） | json-to-csharp/go/rust/swift/kotlin/dart/java/python + json-schema-to-ts + graphql-to-ts + js-to-ts —— 加语言 select，12 种输出全保留 | |

## C 组：全部合并（~10 组）

| # | 保留工具 | 被合并（功能融合点） | 状态 |
|---|---|---|---|
| C1 | zhougong-lingsign | chegong/tudigong/wanggong/lvzu/fozu/guandi/yudi/yuelao/huangdaxian/guanyin lingsign → 神祇 select，11 套签文数据全量保留 | |
| C2 | timer-stopwatch | chronometer（分段计时）、countdown-timer（倒计时）、interval-timer（间歇循环）→ 模式 tab：秒表/倒计时/间歇 | |
| C3 | git-cheatsheet | markdown-cheatsheet/python-cheatsheet/typescript-cheatsheet/hashcat-cheatsheet → 主题 select，5 套速查数据全量保留 | |
| C4 | qr-code-generator | qr-reader（图片解码）、wifi-qr-code（WiFi 二维码）→ tab：生成/读取/WiFi | |
| C5 | csp-builder | csp-validator（策略验证）→ 加「验证」tab | |
| C6 | api-key-generator | api-key-detector（平台密钥识别）→ 加「识别」tab | |
| C7 | systemd-unit-generator | systemd-timer-generator（定时器+服务文件）→ 加「定时器」tab | |
| C8 | env-converter | variable-name-gen（变量名生成）→ 加「命名生成」tab | |
| C9 | length-converter | area-converter/volume-converter/speed-converter → 量纲 select：长度/面积/体积/速度 | |
| C10 | age-calculator | chinese-zodiac（生肖年龄查询）→ 加「生肖」tab | |
| C11 | date-formatter | day-of-year（年内第几天）、date-range-generator（日期序列）→ 加「序列」tab + 年内天数显示 | |
| C12 | text-encoder | encoding-converter（UTF-8/UTF-16LE 视图）→ 加 UTF-16 编码选项 | |

## 全局工作

1. 每组合并后：保留工具 i18n 补键（6 语言）
2. 全部完成后：index.html 删被合并卡片（保留工具 desc 更新）、home.json 删键
3. server.js + netlify.toml：所有被合并 slug 301 → 保留工具
4. 验证：全站扫描无 404 链接、词典合法、保留工具功能实测
5. CHANGELOG + 提交

## 融合执行规范（所有批次 agent 必须遵守）

### 融合步骤
1. **读源码**：完整读取保留工具 + 全部被合并工具 index.html（含词典 assets/i18n/zh-CN/<slug>.json 及 en 版本）
2. **列功能点**：被合并工具相对保留工具的**独有功能**（模式/选项/数据/输出格式）
3. **融合**：在保留工具中实现全部独有功能——
   - 同类功能（多选项）→ 加 `<select>` option 或 checkbox
   - 不同类功能 → 加 tab（参考 date-calculator 的 `.dc-tabs` 模式：tab 按钮切换面板 display）
   - 数据类（词库/速查表/签文/列表）→ 数据全量并入 JS 数组/对象
4. **保留工具已有功能不得破坏**（改后逐一验证每个模式仍工作）

### i18n 规范
- 新增 UI 文案：HTML 用 `data-i18n="键"`（元素文本为中文默认值）；JS 动态文本用 `t('键','中文默认')`
- 词典补键：**6 语言全部**（zh-CN 用中文默认、en 英文翻译、zh-TW/zh-HK 繁体、es 西班牙语、ja 日语），写入 `assets/i18n/<lang>/<保留工具slug>.json`
- 优先复用被合并工具词典中已有的键名（值一致时）；同 key 不同值 → 保留工具用新键名
- 严禁：`getElementById(t('键','中文id'))`、局部 `var t=` 遮蔽、硬编码 locale（用 `I18N.lang` 判断）

### 静态验证（必须执行）
- `node -e "JSON.parse(require('fs').readFileSync('assets/i18n/<lang>/<slug>.json','utf8'))"` × 6 语言全部通过
- 页面 `<script>` 内 JS 字符串中不得出现**未包裹 t() 的中文字符串**（排除 t('键','中文') fallback、注释、正则、HTML 模板串中已 data-i18n 的部分）
- 页面 HTML 中不得出现无 data-i18n 的中文文本（排除 `<option>`、`<title>`、lang 下拉、back-btn 的 '← 返回'）

### 铁律
- **只在 D:\administrator\Documents\project\S-Jiffy 目录内工作**；脚本写 .scratch/ 下
- 禁止：git 命令、交互命令、写项目外文件
- 禁止修改被合并工具的目录（重定向阶段统一处理）
- 禁止修改 docs/、index.html、server.js、netlify.toml
- 完成后删除自己的 .scratch 临时脚本
- 每个工具开始前打印 `[time] slug`
- 返回格式：每工具 `result:` 一行（改了哪些文件、新增词典键数、验证结果）

### 描述更新（每组合并后必做）
整合后功能增加，必须同步更新描述，五处一致：
1. projects/<slug>/index.html 的 <h1> 与 <p class="tool-desc">（data-i18n 值）
2. 6 语言词典 <slug>.json 的 desc 与 meta.description
3. 主页 index.html 卡片描述（全站阶段统一做）
4. assets/i18n/<lang>/home.json 的 home.tool.projects.<slug>.desc
描述规范：一句话概括融合后全部功能（含被合并工具功能），中文 20-50 字，其他语言对应翻译。
