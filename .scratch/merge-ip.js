const fs = require('fs');

// 1. index.html: remove ip-location entry
let s = fs.readFileSync('index.html', 'utf8');
const line = `        { name: "IP 地理定位", desc: "根据 IP 地址查询其地理位置信息", link: 'projects/ip-location/', cats: ["网络工具","数据处理"] },`;
const idx = s.indexOf(line);
console.log('index.html entry found:', idx !== -1);
if (idx !== -1) s = s.replace(line + '\r\n', '').replace(line + '\n', '');
fs.writeFileSync('index.html', s);

// 2. home.json: remove ip-location keys
for (const l of ['en', 'zh-CN', 'zh-TW', 'zh-HK', 'es', 'ja']) {
  const p = 'assets/i18n/' + l + '/home.json';
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  let n = 0;
  for (const k of Object.keys(d)) {
    if (k.startsWith('home.tool.projects/ip-location/')) { delete d[k]; n++; }
  }
  fs.writeFileSync(p, JSON.stringify(d, null, 2));
  console.log(l, 'removed', n, 'keys');
}

// 3. remove directory
fs.rmSync('projects/ip-location', { recursive: true, force: true });
console.log('projects/ip-location removed:', !fs.existsSync('projects/ip-location'));
