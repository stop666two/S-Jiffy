# 相似工具合并审计清单

> **状态：已完成 ✅（2026-08-24）**——本清单 48 组相似工具已按 [merge-plan.md](merge-plan.md) 全部合并（683 → 548 个工具），保留本文件作为相似工具审计的永久记录。
> 生成时间：2026-08-24T01:35:06.757Z
> 全站 682 个工具扫描结果。A=完全重复建议合并，B=同模板家族建议合并，C=待确认。


## Lorem Ipsum 生成器（3 个）

- `lorem-ipsum-generator` — Lorem Ipsum 生成器 — 生成指定段落数的 Lorem Ipsum 占位文本
- `lorem-ipsum` — Lorem Ipsum生成器 — 生成Lorem ipsum占位文本。可选择段落、句子或字数。
- `lorem-ipsum-word` — Lorem Ipsum 按词生成 — 生成指定数量的 Lorem Ipsum 占位单词

**建议**：保留 `lorem-ipsum-generator`，其余删除并 301 重定向。功能几乎相同（按段/按词生成），保留功能最全的

## HTML 实体（2 个）

- `html-entities` — HTML 实体 — 将 HTML 特殊字符编码为实体或解码还原
- `html-entity-lookup` — HTML 实体查询 — 查询 HTML 字符实体编码和 Unicode

**建议**：保留 `html-entities`，其余删除并 301 重定向。一个编解码一个查询，合并为编解码+查询

## HTML 表格（2 个）

- `html-table-extractor` — HTML 表格提取 — 从 HTML 页面中提取表格数据
- `html-table-generator` — HTML 表格生成 — 通过可视化界面生成 HTML 表格代码

**建议**：保留 `html-table-generator`，其余删除并 301 重定向。一个从网页提取表格一个生成表格 HTML，合并

## 哈希工具（2 个）

- `hash-generator` — 哈希生成器 — 计算文本的 SHA-1/SHA-256/SHA-384/SHA-512 哈希值
- `hash-comparison` — 哈希对比 — 对比两个哈希值是否匹配和一致

**建议**：保留 `hash-generator`，其余删除并 301 重定向。一个生成哈希一个对比哈希，合并为生成+对比

## MIME 类型（2 个）

- `mime-lookup` — MIME 类型查询 — 根据文件扩展名查询对应的 MIME 类型
- `mime-types` — MIME 类型 — 浏览完整的 MIME 类型列表和说明

**建议**：保留 `mime-lookup`，其余删除并 301 重定向。同一功能（MIME 查询/列表）双生

## MAC 地址（2 个）

- `mac-address-generator` — MAC 地址生成器 — 生成随机 MAC 地址支持自定义 OUI 前缀
- `mac-address-lookup` — MAC 地址查询 — 根据 MAC 地址前缀查询对应的设备厂商信息

**建议**：保留 `mac-address-generator`，其余删除并 301 重定向。一个随机生成一个查厂商，合并为生成+查询

## 编码检测/转换（2 个）

- `encoding-detector` — 编码检测 — 检测文本的字符编码格式
- `encoding-converter` — 编码转换器 — 实时查看文本的多种编码表示：UTF-8、UTF-16LE、Base64、URL 编码、Unicode 转义、HTML 实体。

**建议**：保留 `encoding-converter`，其余删除并 301 重定向。一个检测编码一个转换编码，合并为检测+转换

## 日期计算（4 个）

- `date-add` — 日期计算 — 对指定日期进行加减天数操作
- `date-calculator` — 日期计算器 — 对任意日期加减天数、月数或年数，即时得到精确结果日期。
- `date-difference` — 日期差计算 — 计算两个日期之间的天数/月数/年数差值
- `time-diff` — 日期时间计算器 — 精确计算两个日期之间的差值，包括年、月、日。

**建议**：保留 `date-calculator`，其余删除并 301 重定向。日期加减/差值/计算四合一

## 文本对比（4 个）

- `text-comparison` — 文本对比工具 — 逐行详细对比两段文本的异同
- `text-diff` — 文本对比 — 使用 LCS 算法逐行对比两段文本差异
- `diff-checker` — 文本差异对比 — 将两段文本逐行对比并用颜色高亮差异处
- `text-diff-char` — 字符级文本对比 — 逐字符对比两段文本并高亮显示每个差异处

**建议**：保留 `text-diff`，其余删除并 301 重定向。文本对比/差异/字符级对比四合一

## 文本统计（3 个）

- `text-statistics` — 文本统计 — 统计文本的字符数/单词数/行数/音节等
- `text-statistics-adv` — 高级文本统计 — 分析文本音节阅读时间复杂度和可读性
- `text-frequency` — 字符/词频分析器 — 统计文本中各单词出现频率

**建议**：保留 `text-statistics-adv`，其余删除并 301 重定向。基础统计/高级统计/词频分析三合一

## JSON 美化（2 个）

- `json-formatter` — JSON 格式化器 — 对 JSON 数据进行格式化/压缩和语法校验
- `json-prettify` — JSON 美化 — 将 JSON 格式化为带颜色高亮显示

**建议**：保留 `json-formatter`，其余删除并 301 重定向。同一功能（JSON 格式化）双生

## JSON 压缩（2 个）

- `json-minify` — JSON 压缩 — 将 JSON 数据压缩为紧凑无空格格式
- `json-minify-advanced` — JSON 高级压缩 — 高级选项压缩 JSON 移除多余空格

**建议**：保留 `json-minify-advanced`，其余删除并 301 重定向。同一功能（JSON 压缩）双生

## Dockerfile（2 个）

- `dockerfile-generator` — Dockerfile 生成 — 根据配置生成 Dockerfile 模板
- `dockerfile-lint` — Dockerfile 检查 — 检查 Dockerfile 常见问题和最佳实践

**建议**：保留 `dockerfile-generator`，其余删除并 301 重定向。一个生成一个检查，合并为生成+检查

## Docker Compose（2 个）

- `docker-compose-converter` — Docker Compose 转换器 — 将 docker run 命令行参数转换为 compose.yml 格式
- `compose-snippets` — docker-compose 片段 — 生成常用 docker-compose 服务配置片段

**建议**：保留 `docker-compose-converter`，其余删除并 301 重定向。转换器与片段集合并

## SQL 格式化（2 个）

- `sql-format` — SQL 格式化 — 对 SQL 查询代码进行格式化和语法美化
- `sql-prettify` — SQL 美化 — 将 SQL 语句格式化为整齐可读的格式并高亮

**建议**：保留 `sql-format`，其余删除并 301 重定向。同一功能（SQL 美化）双生

## ASCII 表（2 个）

- `ascii-table` — ASCII 表 — 查阅 ASCII 字符编码表包含控制字符和可打印字符
- `text-table` — ASCII 表格生成 — 将数据生成为 ASCII 艺术表格

**建议**：保留 `ascii-table`，其余删除并 301 重定向。ASCII 表与文本表格生成合并

## 我的 IP（2 个）

- `whats-my-ip` — 我的 IP — 获取并显示当前网络的公网 IP 地址信息
- `ip-lookup` — IP地址查询 — 查询任意IP地址的国家、城市、运营商和坐标，页面加载时自动检测您的IP。

**建议**：保留 `ip-lookup`，其余删除并 301 重定向。我的IP查询与IP地址查询合并（ip-lookup 已含本机IP）

## 文本换行（2 个）

- `text-wrapper` — 文本换行器 — 将长文本按指定宽度自动换行
- `line-wrapper` — 文本换行工具 — 将文本按指定宽度自动换行

**建议**：保留 `text-wrapper`，其余删除并 301 重定向。文本换行工具双生

## 编码检测2（2 个）

- `encoding-detector` — 编码检测 — 检测文本的字符编码格式
- `text-encoder` — 文本编码转换器 — 在纯文本、十六进制、二进制、八进制、十进制、Base64、URL、HTML实体、Unicode、ASCII、ROT13和摩尔斯电码之间转换。

**建议**：保留 `text-encoder`，其余删除并 301 重定向。待确认：text-encoder 是编码转换（非检测）

## 时间戳（2 个）

- `epoch-converter` — 时间戳转换器 — Unix 时间戳与人类可读日期互相转换支持秒毫秒
- `timestamp` — 时间戳格式化工具 — Unix 时间戳与人类可读日期互相转换秒级

**建议**：保留 `epoch-converter`，其余删除并 301 重定向。时间戳转换器与时间戳格式化工具高度重合

## 日期时间（3 个）

- `date-formatter` — 日期格式化器 — 将日期格式化为各种自定义格式
- `day-of-year` — 日期纪年 — 计算指定日期在当年中是第几天
- `date-range-generator` — 日期序列生成器 — 按天、周、月或年步长生成两日期之间的日期序列，支持一键复制。

**建议**：待确认：功能不同（格式化/年内第几天/日期序列），建议保留

## Cron（3 个）

- `cron-expression` — Cron 表达式解析 — 解析 cron 表达式含义并预览未来执行时间
- `crontab-validator` — Cron 表达式验证 — 验证 crontab 表达式语法是否正确
- `crontab-generator` — Crontab 生成器 — 通过可视化界面生成 crontab 定时任务表达式

**建议**：保留 `crontab-generator`，其余删除并 301 重定向。解析/验证/生成三合一

## UUID（3 个）

- `uuid-generator` — UUID 生成器 — 生成 UUID v4 随机唯一标识符支持批量生成
- `uuid-v1` — UUID v1 生成器 — 基于时间和 MAC 地址生成 UUID v1
- `uuid-v6` — UUID v6 生成器 — 生成 UUID v6 可排序唯一标识符

**建议**：保留 `uuid-generator`，其余删除并 301 重定向。UUID 生成器（v4 为主）与 v1/v6 专用生成器合并

## 面积/体积（2 个）

- `area-converter` — 面积单位转换 — 面积单位 m²/km²/ha/acre/ft²/in² 互相转换
- `volume-converter` — 体积单位转换 — 体积单位 L/mL/gal/qt/pt/cup 互相转换

**建议**：待确认：不同量纲但界面几乎一样，可合并为一个单位转换器

## 长度/速度（2 个）

- `length-converter` — 长度单位转换 — 长度单位 m/cm/km/in/ft/yd/mi 互相转换
- `speed-converter` — 速度单位转换 — 速度单位 km/h/mph/knot/m/s 互相转换

**建议**：待确认：同上

## 百分比（2 个）

- `percentage-calculator` — 百分比计算器 — 计算百分比值和数字增减百分比变化
- `diff-percentage` — 差异百分比 — 计算两段文本的差异百分比

**建议**：保留 `percentage-calculator`，其余删除并 301 重定向。百分比计算与差异百分比合并

## 年龄/生肖（2 个）

- `age-calculator` — 年龄计算器 — 根据出生日期精确计算年龄，显示年/月/日详情
- `chinese-zodiac` — 生肖年龄查询 — 查询出生年份生肖属相和年龄

**建议**：待确认：年龄计算与生肖年龄查询有重叠

## Slug（2 个）

- `slugify-string` — 字符串转 Slug — 将文本转换为 URL 友好的小写连字符 slug
- `text-slug` — URL Slug 生成 — 将文本转换为 URL 友好 slug 格式

**建议**：保留 `slugify-string`，其余删除并 301 重定向。字符串转 slug 双生

## Emoji（3 个）

- `emoji-picker` — Emoji 选择器 — 按分类浏览搜索 emoji 表情并一键复制
- `emoji-search` — Emoji 搜索 — 输入关键词快速搜索 emoji 并点击复制
- `random-emoji` — 随机 Emoji 生成器 — 随机生成 emoji 表情符号

**建议**：保留 `emoji-search`，其余删除并 301 重定向。选择器/搜索/随机生成三合一

## User Agent（2 个）

- `user-agent` — User Agent — 查看当前浏览器的 User-Agent 字符串
- `user-agent-parser` — User-Agent 解析器 — 解析 User-Agent 提取浏览器/操作系统/设备信息

**建议**：保留 `user-agent-parser`，其余删除并 301 重定向。UA 列表与 UA 解析合并

## 掷骰子（2 个）

- `dice-roller` — 掷骰子 — 模拟掷骰子支持自定义面数和一次投掷数量
- `dice-dnd` — D&D 骰子 — 龙与地下城游戏专用多面骰子

**建议**：保留 `dice-dnd`，其余删除并 301 重定向。普通骰子与 D&D 骰子合并

## 颜色转换（5 个）

- `hex-to-rgb` — HEX 转 RGB — 将十六进制颜色代码转换为 RGB 颜色值
- `rgb-to-hex` — RGB 转 HEX — 将 RGB 颜色值转换为十六进制颜色代码
- `hex-to-hsl` — HEX 转 HSL — 将十六进制颜色代码转换为 HSL 颜色值
- `hsl-to-hex` — HSL 转 HEX — 将 HSL 颜色值转换为十六进制颜色代码
- `hex-converter` — Hex RGB Decimal 转换 — 颜色值在 HEX/RGB/Decimal 格式之间互相转换

**建议**：保留 `hex-converter`，其余删除并 301 重定向。HEX/RGB/HSL 互转合并为一个颜色转换器

## HMAC（2 个）

- `hmac-generator` — HMAC 生成器 — 使用密钥计算 HMAC 签名支持 SHA1/256/384/512
- `hmac-verify` — HMAC 验证器 — 使用密钥验证 HMAC 签名正确性

**建议**：保留 `hmac-generator`，其余删除并 301 重定向。HMAC 生成与验证合并

## QR 码（3 个）

- `qr-code-generator` — QR 码生成器 — 将文本或链接内容生成 QR 二维码图片
- `qr-reader` — QR 码读取器 — 上传二维码图片文件并解码其中的文本内容
- `wifi-qr-code` — WiFi QR 码生成器 — 生成包含 WiFi 密码信息的连接二维码

**建议**：待确认：生成/读取/WiFi 三功能，建议保留

## 图片格式互转（12 个）

- `png-to-jpg` — PNG转JPG转换器 — 在浏览器中即时将PNG图片转换为JPG格式。无需上传，100%隐私。
- `jpg-to-png` — JPG转PNG转换器 — 将JPG图片转换为无损PNG格式。快速、免费、安全。
- `webp-to-jpg` — WebP转JPG转换器 — 将WebP图片转换为JPG格式，提高兼容性。完全在浏览器中运行。
- `jpg-to-webp` — JPG转WebP转换器 — 将JPG图片转换为现代WebP格式以减小文件大小。无需上传。
- `webp-to-png` — WebP转PNG转换器 — 将WebP图片转换为无损PNG格式，保留透明度。
- `png-to-webp` — PNG转WebP转换器 — 将PNG转换为WebP以减小文件大小，无质量损失。
- `heic-to-jpg` — HEIC转JPG转换器 — 将iPhone HEIC照片转换为JPG格式。快速、私密，无需上传。
- `heic-to-png` — HEIC转PNG转换器 — 将iPhone的HEIC图片转换为PNG格式，保留透明度。
- `avif-to-jpg` — AVIF转JPG转换器 — 将AVIF图片转换为JPEG以获得最大浏览器兼容性。
- `avif-to-png` — AVIF转PNG转换器 — 将AVIF转换为无损PNG格式。免费，纯浏览器运行。
- `svg-to-png` — SVG转PNG转换器 — 将SVG矢量图形转换为PNG光栅图像。可设置缩放和尺寸。
- `svg-to-jpg` — SVG转JPG转换器 — 将SVG矢量图形转换为JPG格式。无需上传，即时转换。

**建议**：保留 `image-converter`，其余删除并 301 重定向。12 个图片格式互转工具合并为 1 个图片格式转换器（需新建）

## Base 编码（10 个）

- `base32-converter` — Base32 编解码 — 将文本与 Base32 编码格式互相转换
- `base36-encoder` — Base36 编解码 — 将文本与 Base36 编码格式互相转换
- `base45` — Base45 编解码 — 将文本与 Base45 编码格式互相转换
- `base58-converter` — Base58 编解码 — 将文本与 Base58 编码格式互相转换
- `base62-encoder` — Base62 编解码 — 将文本与 Base62 编码格式互相转换
- `base64` — Base64 编解码 — 将普通文本与 Base64 编码格式互相转换
- `base85-converter` — Base85 编解码 — 将文本与 Base85 Ascii85 格式互相转换
- `base91` — Base91 编解码 — 将文本与 Base91 编码格式互相转换
- `base92` — Base92 编解码 — 将文本与 Base92 编码格式互相转换
- `ascii85` — Ascii85 编解码 — 将文本与 ASCII85 编码格式互相转换

**建议**：保留 `base64`，其余删除并 301 重定向。10 个 Base 编码转换合并为 1 个（base64 已存在且功能最全）

## Base64 图（2 个）

- `base64-to-image` — Base64 转图片 — 将 Base64 编码的数据 URL 还原为可下载图片
- `image-to-base64` — 图片转 Base64 — 上传本地图片文件生成 Base64 编码数据 URL

**建议**：保留 `base64-to-image`，其余删除并 301 重定向。Base64 转图/图转 Base64 合并

## 进制转换（4 个）

- `base-converter` — 进制转换 — 二进制/八进制/十进制/十六进制任意互相转换
- `number-base-converter` — 通用进制转换 — 任意进制数字表示互相转换
- `base-convert` — 数字进制转换器 — 即时在十进制、二进制、八进制和十六进制之间转换数字。
- `binary-calculator` — 二进制计算器 — 对二进制数进行加减乘除运算。

**建议**：保留 `number-base-converter`，其余删除并 301 重定向。4 个进制转换合并为 1 个

## 游戏灵敏度（27 个）

- `sensitivity-converter` — 游戏灵敏度转换器 — 在CS2、Valorant、Apex、守望先锋等13款游戏间精确转换鼠标灵敏度。
- `valorant-sensitivity-converter` — Valorant灵敏度转换器 — 将任何游戏的灵敏度转换为Valorant。输入DPI和源灵敏度，即时获得匹配值。
- `cs2-sensitivity-converter` — CS2灵敏度转换器 — 将任何游戏的灵敏度转换为CS2。输入DPI和源灵敏度，即时获得匹配值。
- `apex-sensitivity-converter` — Apex英雄灵敏度转换器 — 将任何游戏的灵敏度转换为Apex英雄。基于cm/360精确计算。
- `overwatch2-sensitivity-converter` — 守望先锋2灵敏度转换器 — 将任何游戏的灵敏度转换为守望先锋2。输入DPI和源灵敏度即时获结果。
- `pubg-sensitivity-converter` — 绝地求生灵敏度转换器 — 将任何FPS游戏灵敏度转换为绝地求生。精确鼠标灵敏度计算。
- `fortnite-sensitivity-converter` — 堡垒之夜灵敏度转换器 — 将鼠标灵敏度转换为堡垒之夜格式。支持所有主要FPS游戏。
- `cod-sensitivity-converter` — 使命召唤灵敏度转换器 — 将任何游戏灵敏度转换为使命召唤。精确cm/360计算。
- `bf2042-sensitivity-converter` — 战地2042灵敏度转换器 — 将任何FPS游戏灵敏度转换为战地2042格式。
- `halo-sensitivity-converter` — 光环无限灵敏度转换器 — 将FPS灵敏度转换为光环无限。精确cm/360计算。
- `warframe-sensitivity-converter` — 星际战甲灵敏度转换器 — 将FPS灵敏度转换为星际战甲。精确鼠标灵敏度计算。
- `cs2-to-valorant-sensitivity` — CS2转Valorant灵敏度转换器 — 即时将CS2/CS:GO灵敏度转换为Valorant。保持精确的cm/360手感。
- `valorant-to-cs2-sensitivity` — Valorant转CS2灵敏度转换器 — 将Valorant灵敏度转换为CS2/CS:GO。两款游戏相同的cm/360。
- `apex-to-valorant-sensitivity` — Apex转Valorant灵敏度转换器 — 将Apex英雄灵敏度转换为Valorant。保留精确的鼠标手感。
- `valorant-to-apex-sensitivity` — Valorant转Apex灵敏度转换器 — 将Valorant灵敏度转换为Apex英雄。精确cm/360计算。
- `cs2-to-apex-sensitivity` — CS2转Apex灵敏度转换器 — 将CS2灵敏度转换为Apex英雄。跨游戏保持相同鼠标手感。
- `apex-to-cs2-sensitivity` — Apex转CS2灵敏度转换器 — 将Apex英雄灵敏度转换为CS2。两款游戏相同的cm/360。
- `overwatch2-to-valorant-sensitivity` — 守望先锋2转Valorant灵敏度转换器 — 将守望先锋2灵敏度转换为Valorant。精确cm/360匹配。
- `valorant-to-overwatch2-sensitivity` — Valorant转守望先锋2灵敏度转换器 — 将Valorant灵敏度转换为守望先锋2。精确cm/360计算。
- `cs2-to-overwatch2-sensitivity` — CS2转守望先锋2灵敏度转换器 — 将CS2灵敏度转换为守望先锋2。保持鼠标手感。
- `overwatch2-to-cs2-sensitivity` — 守望先锋2转CS2灵敏度转换器 — 将守望先锋2灵敏度转换为CS2。跨游戏相同cm/360。
- `pubg-to-cs2-sensitivity` — 绝地求生转CS2灵敏度转换器 — 将绝地求生灵敏度转换为CS2。基于cm/360精确转换。
- `cs2-to-pubg-sensitivity` — CS2转绝地求生灵敏度转换器 — 将CS2灵敏度转换为绝地求生。精确鼠标灵敏度计算。
- `fortnite-to-valorant-sensitivity` — 堡垒之夜转Valorant灵敏度转换器 — 将堡垒之夜灵敏度转换为Valorant。保持精确的cm/360。
- `valorant-to-fortnite-sensitivity` — Valorant转堡垒之夜灵敏度转换器 — 将Valorant灵敏度转换为堡垒之夜。两款游戏相同鼠标手感。
- `cod-to-cs2-sensitivity` — 使命召唤转CS2灵敏度转换器 — 将使命召唤灵敏度转换为CS2。精确cm/360计算。
- `cs2-to-cod-sensitivity` — CS2转使命召唤灵敏度转换器 — 将CS2灵敏度转换为使命召唤。精确鼠标灵敏度匹配。

**建议**：保留 `sensitivity-converter`，其余删除并 301 重定向。27 个灵敏度转换器合并为 1 个通用转换器（需扩展灵敏度转换器支持全游戏）

## 经典密码（8 个）

- `affine-cipher` — Affine 密码 — 使用仿射密码算法加密和解密文本
- `atbash-cipher` — Atbash 密码 — 使用 Atbash 字母逆向替换加密解密文本
- `autokey-cipher` — Autokey 密码 — 使用自动密钥密码算法加密解密文本
- `beaufort-cipher` — Beaufort 密码 — 使用博福特密码算法加密解密文本
- `playfair-cipher` — Playfair 密码 — 使用 Playfair 双字母密码加密解密
- `rail-fence-cipher` — Rail Fence 密码 — 使用 Rail Fence 栅栏密码算法加密解密文本
- `rot13` — ROT 密码 — 使用 ROT13 轮转 13 位加密解密文本
- `cipher-tool` — Vigenère 密码 — 使用维吉尼亚密码算法加密和解密文本

**建议**：保留 `cipher-tool`，其余删除并 301 重定向。8 个经典密码工具合并为 1 个（cipher-tool 是 Vigenere，需扩展）

## 签文（11 个）

- `zhougong-lingsign` — 周公灵签 — 一百支周公灵签，万事皆可问，静心默念所问之事后抽签，吉凶休咎尽在签中。
- `chegong-lingsign` — 车公灵签 — 车公灵签共九十六支，源自民间信仰，卜问运势、出行、婚姻、财运等事。
- `tudigong-lingsign` — 土地公灵签 — 土地公灵签共三十二支，护佑一方平安，问家宅、财运、出行等日常诸事皆宜。
- `wanggong-lingsign` — 王公灵签 — 王公灵签共五十支，卜问功名事业、财利家宅诸事，一事一签，心诚则灵。
- `lvzu-lingsign` — 吕祖灵签 — 一百支吕祖灵签，相传为吕洞宾仙师所传，默念「吕祖仙师，指点迷津」并陈述所问后抽签。
- `fozu-lingsign` — 佛祖灵签 — 佛祖灵签共五十一支，礼佛求签，问消灾解厄、谋事求财，心诚则灵。
- `guandi-lingsign` — 关帝灵签 — 一百支关帝灵签，以关圣帝君之忠义为凭，默念姓名与所问之事后抽签断疑难。
- `yudi-lingsign` — 玉帝灵签 — 玉帝灵签共二十八支，敬问天庭主宰，卜问吉凶祸福、前程际遇。
- `yuelao-lingsign` — 月老灵签 — 一百支月老灵签，专问姻缘婚恋、情路缘分，默念心中所念之人与所求之事后抽签。
- `huangdaxian-lingsign` — 黄大仙灵签 — 一百支黄大仙灵签，默念姓名与所问之事后抽签，签文断吉凶、附典故详解。
- `guanyin-lingsign` — 观音灵签 — 观音灵签共一百支，供奉观世音菩萨，问事求谋、趋吉避凶，皆可一卜。

**建议**：待确认：各签文内容不同（神祇不同），但界面模板一样，可合并为 1 个签文工具选择神祇

## 计时器（4 个）

- `chronometer` — 计时器 — 启动秒表精确计时并支持分段记录时间
- `countdown-timer` — 倒计时器 — 设置目标日期时间进行实时倒计时显示
- `interval-timer` — 间歇计时器 — 设置间隔循环提醒的计时器工具
- `timer-stopwatch` — 计时器与秒表 — 精确秒表计时支持分段计时功能

**建议**：待确认：秒表/倒计时/间歇/计时器四合一或保留

## JSON→代码（12 个）

- `json-to-csharp` — JSON 转 C# 类 — 将 JSON 数据转换为 C# 类定义代码
- `json-to-go` — JSON → Go 结构体 — 将 JSON 数据转换为 Go 语言结构体定义
- `json-to-rust` — JSON → Rust 结构体 — 将 JSON 数据转换为 Rust 语言结构体
- `json-to-swift` — JSON → Swift 结构体 — 将 JSON 数据转换为 Swift 语言结构体
- `json-to-kotlin` — JSON → Kotlin 数据类 — 将 JSON 数据转换为 Kotlin data class
- `json-to-dart` — JSON → Dart 类 — 将 JSON 数据转换为 Dart 语言类定义
- `json-to-java` — JSON 转 Java POJO — 将 JSON 数据转换为 Java POJO 类
- `json-to-python` — JSON → Python 数据类 — 将 JSON 数据转换为 Python dataclass
- `json-to-typescript` — JSON 转 TypeScript — 将 JSON 数据转换为 TypeScript 接口
- `json-schema-to-ts` — JSON Schema 转 TypeScript — 将 JSON Schema 转换为 TypeScript 接口定义
- `graphql-to-ts` — GraphQL Schema 转 TypeScript — 粘贴 GraphQL SDL，自动将 type/interface/enum/input/union 转换为 TypeScript 类型定义，并输出解析统计。
- `js-to-ts` — JavaScript 转 TypeScript — 将 JavaScript 代码转换为 TypeScript 添加类型

**建议**：保留 `json-to-typescript`，其余删除并 301 重定向。12 个 JSON→代码生成器合并为 1 个多语言生成器（需新建）

## 速查表（5 个）

- `git-cheatsheet` — Git 速查表 — 浏览搜索常用 Git 命令和参数
- `markdown-cheatsheet` — Markdown 速查卡 — 常用 Markdown 语法与渲染预览，点击条目复制语法。
- `python-cheatsheet` — Python 速查卡 — Python 常用语法与示例，支持分类过滤与搜索，点击条目复制。
- `typescript-cheatsheet` — TypeScript 速查卡 — TS 常用类型语法与示例，支持分类过滤与搜索，点击条目复制。
- `hashcat-cheatsheet` — hashcat 模式速查 — 100+ 常用 hashcat 模式速查表：按模式号或名称搜索、按类别筛选，点击行复制「模式号 | 类型」。

**建议**：待确认：不同主题速查表，内容不同，建议保留

## CSP（2 个）

- `csp-builder` — CSP 策略构建器 — 可视化构建 Content Security Policy 策略
- `csp-validator` — CSP 策略验证 — 验证 CSP 策略语法和指令正确性

**建议**：待确认：构建与验证互补，建议保留

## API Key（2 个）

- `api-key-generator` — API Key 生成器 — 生成随机安全的 API 访问密钥令牌
- `api-key-detector` — API Key 识别器 — 粘贴文本，自动识别 AWS、Google、GitHub、Stripe 等平台的密钥格式并展示打码示例

**建议**：待确认：生成与识别互补，建议保留

## 系统d（2 个）

- `systemd-unit-generator` — systemd 单元生成器 — 填写服务信息，一键生成完整的 systemd 单元文件。
- `systemd-timer-generator` — systemd 定时器生成器 — 生成 systemd 定时器与配套服务文件，支持 cron 表达式自动转换。

**建议**：待确认：unit 与 timer 生成互补，建议保留

## 环境变量（2 个）

- `env-converter` — 环境变量转换 — .env/JSON/YAML 环境变量格式互相转换
- `variable-name-gen` — 变量名生成器 — 生成各种风格的编程变量名建议

**建议**：待确认：格式转换与命名生成，建议保留

## 待确认工具清单说明

- 建议删除的工具：主页卡片删除、6 语言 home.json 删键、目录删除、server.js + netlify.toml 加 301 重定向到保留工具
- 需新建的工具（image-converter / 多语言 JSON→代码 / 通用灵敏度转换器）：需要额外开发
