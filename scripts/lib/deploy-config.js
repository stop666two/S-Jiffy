'use strict';
// 部署配置的单一数据源：server.js（本地服务）、netlify.toml（Netlify）、
// _headers + _redirects（Cloudflare Pages / GitHub Pages）、vercel.json 都由本文件生成。
// 改配置只改这里，然后跑 `node scripts/gen-deploy-config.js` 重新生成四份产物。

// 与生产一致的内容安全策略：本地服务器发送同一份 CSP，避免本地能跑、线上被拦。
var CSP = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; connect-src 'self' https://api.ipify.org https://ip-api.com https://ipinfo.io https://ipapi.co https://dns.google https://huggingface.co https://modelscope.cn https://cdn.jsdelivr.net https://open.er-api.com https://frankfurter.app https://api.frankfurter.app https://ipleak.net https://*.browserleaks.net; frame-src https:; img-src 'self' data: https://www.gravatar.com; upgrade-insecure-requests";

/**
 * 按路径放宽的 CSP：只给确有必要的一页，不放松全站。
 * image-converter 懒加载 heic2any（emscripten 版 libheif），它在初始化时会用
 * new Function 创建胶水代码，被 script-src 拦下后 HEIC 转换完全不可用。
 * 单独给这一页加 'unsafe-eval'，其余页面仍保持收紧策略。
 */
var PATH_CSP = [
  {
    match: '/projects/image-converter/',
    csp: CSP.replace("script-src 'self' 'unsafe-inline'", "script-src 'self' 'unsafe-inline' 'unsafe-eval'")
  }
];

/** 按 URL 路径取应下发的 CSP（无匹配则用全站默认值）。 */
function cspForPath(urlPath) {
  for (var i = 0; i < PATH_CSP.length; i++) {
    if (urlPath.indexOf(PATH_CSP[i].match) === 0) return PATH_CSP[i].csp;
  }
  return CSP;
}

// 所有环境共用的安全响应头（不含 CSP，单独给出以便其他平台复用）。
var SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer'
};

// 缓存策略：页面不缓存（发版即生效），assets 缓存一天，i18n 词典短期缓存并允许后台刷新。
// 只允许一条 /assets/* 规则：Cloudflare Pages 对同名响应头是拼接而非覆盖，
// 两条重叠规则会让 /assets/i18n/* 同时拿到两个 Cache-Control 值（含义不确定）。
// assets 没有内容哈希，所以统一 5 分钟 + 后台刷新，兼顾新鲜度与重复访问。
var CACHE_RULES = [
  { match: '/assets/', value: 'public, max-age=300, stale-while-revalidate=86400' },
  { match: '/', value: 'no-cache' }
];

// 被合并工具的旧地址 -> 新地址（135 组）。带不带结尾斜杠都要 301。
var REDIRECTS = [
  ["/projects/apex-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/apex-to-cs2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/apex-to-valorant-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/api-key-detector", "/projects/api-key-generator/"],
  ["/projects/area-converter", "/projects/length-converter/"],
  ["/projects/ascii85", "/projects/base64/"],
  ["/projects/avif-to-jpg", "/projects/image-converter/"],
  ["/projects/avif-to-png", "/projects/image-converter/"],
  ["/projects/base-convert", "/projects/number-base-converter/"],
  ["/projects/base-converter", "/projects/number-base-converter/"],
  ["/projects/base32-converter", "/projects/base64/"],
  ["/projects/base36-encoder", "/projects/base64/"],
  ["/projects/base45", "/projects/base64/"],
  ["/projects/base58-converter", "/projects/base64/"],
  ["/projects/base62-encoder", "/projects/base64/"],
  ["/projects/base85-converter", "/projects/base64/"],
  ["/projects/base91", "/projects/base64/"],
  ["/projects/base92", "/projects/base64/"],
  ["/projects/bf2042-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/binary-calculator", "/projects/number-base-converter/"],
  ["/projects/chegong-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/chinese-zodiac", "/projects/age-calculator/"],
  ["/projects/chronometer", "/projects/timer-stopwatch/"],
  ["/projects/cod-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/cod-to-cs2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/compose-snippets", "/projects/docker-compose-converter/"],
  ["/projects/countdown-timer", "/projects/timer-stopwatch/"],
  ["/projects/cron-expression", "/projects/crontab-generator/"],
  ["/projects/crontab-validator", "/projects/crontab-generator/"],
  ["/projects/cs2-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/cs2-to-apex-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/cs2-to-cod-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/cs2-to-overwatch2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/cs2-to-pubg-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/cs2-to-valorant-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/csp-validator", "/projects/csp-builder/"],
  ["/projects/date-add", "/projects/date-calculator/"],
  ["/projects/date-difference", "/projects/date-calculator/"],
  ["/projects/date-range-generator", "/projects/date-formatter/"],
  ["/projects/day-of-year", "/projects/date-formatter/"],
  ["/projects/dice-roller", "/projects/dice-dnd/"],
  ["/projects/diff-checker", "/projects/text-diff/"],
  ["/projects/diff-percentage", "/projects/percentage-calculator/"],
  ["/projects/dockerfile-lint", "/projects/dockerfile-generator/"],
  ["/projects/emoji-picker", "/projects/emoji-search/"],
  ["/projects/encoding-converter", "/projects/text-encoder/"],
  ["/projects/encoding-detector", "/projects/text-encoder/"],
  ["/projects/fortnite-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/fortnite-to-valorant-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/fozu-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/graphql-to-ts", "/projects/json-to-typescript/"],
  ["/projects/guandi-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/guanyin-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/halo-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/hash-comparison", "/projects/hash-generator/"],
  ["/projects/hashcat-cheatsheet", "/projects/git-cheatsheet/"],
  ["/projects/heic-to-jpg", "/projects/image-converter/"],
  ["/projects/heic-to-png", "/projects/image-converter/"],
  ["/projects/hex-to-hsl", "/projects/hex-converter/"],
  ["/projects/hex-to-rgb", "/projects/hex-converter/"],
  ["/projects/hmac-verify", "/projects/hmac-generator/"],
  ["/projects/hsl-to-hex", "/projects/hex-converter/"],
  ["/projects/html-entity-lookup", "/projects/html-entities/"],
  ["/projects/html-table-extractor", "/projects/html-table-generator/"],
  ["/projects/huangdaxian-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/image-to-base64", "/projects/base64-to-image/"],
  ["/projects/interval-timer", "/projects/timer-stopwatch/"],
  ["/projects/jpg-to-png", "/projects/image-converter/"],
  ["/projects/jpg-to-webp", "/projects/image-converter/"],
  ["/projects/js-to-ts", "/projects/json-to-typescript/"],
  ["/projects/json-minify", "/projects/json-minify-advanced/"],
  ["/projects/json-prettify", "/projects/json-formatter/"],
  ["/projects/json-schema-to-ts", "/projects/json-to-typescript/"],
  ["/projects/json-to-csharp", "/projects/json-to-typescript/"],
  ["/projects/json-to-dart", "/projects/json-to-typescript/"],
  ["/projects/json-to-go", "/projects/json-to-typescript/"],
  ["/projects/json-to-java", "/projects/json-to-typescript/"],
  ["/projects/json-to-kotlin", "/projects/json-to-typescript/"],
  ["/projects/json-to-python", "/projects/json-to-typescript/"],
  ["/projects/json-to-rust", "/projects/json-to-typescript/"],
  ["/projects/json-to-swift", "/projects/json-to-typescript/"],
  ["/projects/line-wrapper", "/projects/text-wrapper/"],
  ["/projects/lorem-ipsum", "/projects/lorem-ipsum-generator/"],
  ["/projects/lorem-ipsum-word", "/projects/lorem-ipsum-generator/"],
  ["/projects/lvzu-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/mac-address-lookup", "/projects/mac-address-generator/"],
  ["/projects/markdown-cheatsheet", "/projects/git-cheatsheet/"],
  ["/projects/mime-types", "/projects/mime-lookup/"],
  ["/projects/overwatch2-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/overwatch2-to-cs2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/overwatch2-to-valorant-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/png-to-jpg", "/projects/image-converter/"],
  ["/projects/png-to-webp", "/projects/image-converter/"],
  ["/projects/pubg-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/pubg-to-cs2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/python-cheatsheet", "/projects/git-cheatsheet/"],
  ["/projects/qr-reader", "/projects/qr-code-generator/"],
  ["/projects/r6siege-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/random-emoji", "/projects/emoji-search/"],
  ["/projects/rgb-to-hex", "/projects/hex-converter/"],
  ["/projects/speed-converter", "/projects/length-converter/"],
  ["/projects/sql-prettify", "/projects/sql-format/"],
  ["/projects/svg-to-jpg", "/projects/image-converter/"],
  ["/projects/svg-to-png", "/projects/image-converter/"],
  ["/projects/systemd-timer-generator", "/projects/systemd-unit-generator/"],
  ["/projects/tarkov-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/text-comparison", "/projects/text-diff/"],
  ["/projects/text-diff-char", "/projects/text-diff/"],
  ["/projects/text-frequency", "/projects/text-statistics-adv/"],
  ["/projects/text-slug", "/projects/slugify-string/"],
  ["/projects/text-statistics", "/projects/text-statistics-adv/"],
  ["/projects/text-table", "/projects/ascii-table/"],
  ["/projects/thefinals-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/time-diff", "/projects/date-calculator/"],
  ["/projects/timestamp", "/projects/epoch-converter/"],
  ["/projects/tudigong-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/typescript-cheatsheet", "/projects/git-cheatsheet/"],
  ["/projects/user-agent", "/projects/user-agent-parser/"],
  ["/projects/uuid-v1", "/projects/uuid-generator/"],
  ["/projects/uuid-v6", "/projects/uuid-generator/"],
  ["/projects/valorant-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/valorant-to-apex-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/valorant-to-cs2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/valorant-to-fortnite-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/valorant-to-overwatch2-sensitivity", "/projects/sensitivity-converter/"],
  ["/projects/variable-name-gen", "/projects/env-converter/"],
  ["/projects/volume-converter", "/projects/length-converter/"],
  ["/projects/wanggong-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/warframe-sensitivity-converter", "/projects/sensitivity-converter/"],
  ["/projects/webp-to-jpg", "/projects/image-converter/"],
  ["/projects/webp-to-png", "/projects/image-converter/"],
  ["/projects/whats-my-ip", "/projects/ip-lookup/"],
  ["/projects/wifi-qr-code", "/projects/qr-code-generator/"],
  ["/projects/yudi-lingsign", "/projects/zhougong-lingsign/"],
  ["/projects/yuelao-lingsign", "/projects/zhougong-lingsign/"]
];

module.exports = {
  CSP: CSP,
  PATH_CSP: PATH_CSP,
  cspForPath: cspForPath,
  SECURITY_HEADERS: SECURITY_HEADERS,
  CACHE_RULES: CACHE_RULES,
  REDIRECTS: REDIRECTS
};
