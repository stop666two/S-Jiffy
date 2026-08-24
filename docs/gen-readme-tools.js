const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');

const start = h.indexOf('var tools = [');
const end = h.indexOf('];', start);
const src = h.slice(start, end);

const entries = [];
const re = /\{ name:\s*"([^"]*)",\s*desc:\s*"((?:[^"\\]|\\.)*)",\s*link:\s*'projects\/([^']*)\/',\s*cats:\s*\[([^\]]*)\]\s*\}/g;
let m;
while ((m = re.exec(src)) !== null) {
  entries.push({ name: m[1], desc: m[2], slug: m[3], cats: m[4].split(',').map(s => s.trim().replace(/"/g, '')).filter(Boolean) });
}

const counts = {};
const lists = {};
for (const e of entries) {
  for (const c of e.cats) {
    counts[c] = (counts[c] || 0) + 1;
    (lists[c] = lists[c] || []).push(e.name);
  }
}

const catOrder = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
let out = '';
out += `> 共 **${entries.length} 个**工具，覆盖 **${Object.keys(counts).length} 个分类**。分类计数与工具清单由首页注册数据自动生成。\n\n`;
out += '| 分类 | 数量 |\n|---|---|\n';
for (const c of catOrder) out += `| ${c} | ${counts[c]} |\n`;
out += '\n';
for (const c of catOrder) {
  out += `### ${c} (${counts[c]})\n${lists[c].join(' · ')}\n\n`;
}
fs.writeFileSync('docs/readme-tools-generated.md', out, 'utf8');
console.log('entries=' + entries.length + ' cats=' + Object.keys(counts).length);
console.log(out.slice(0, 1500));
