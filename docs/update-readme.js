const fs = require('fs');
let r = fs.readFileSync('README.md', 'utf8');

const overview = `S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 **548 个**即用型在线工具，覆盖编解码、加密哈希、文本处理、颜色转换、数学计算、网络工具、随机生成、代码生成、DevOps、安全工具、图片处理、音频处理等 **36 个分类**。所有工具均为单页 HTML，无需构建、无需服务端、无需注册，打开即用。`;
r = r.replace(/S-Jiffy 是一个纯静态、零依赖的 Web 工具集，包含 \*\*683 个\*\*即用型在线工具[\s\S]*?打开即用。/, overview);

const feat = `- 相似工具整合 — 功能相近的工具已融合为多功能合一工具（如 Base64 编解码内含 10 种编码、灵签工具内含 11 位神祇、图片批量格式转换内含 12 种互转方向），被合并工具地址自动 301 跳转至对应保留工具
- 一键复制 — 所有工具结果区标配复制按钮`;
r = r.replace(/- 一键复制 — 所有工具结果区标配复制按钮/, feat);

const start = r.indexOf('## 📋 工具总览（683 个 / 36 类）');
const end = r.indexOf('## 🛠 添加新工具');
if (start < 0 || end < 0) { console.error('MARKERS NOT FOUND'); process.exit(1); }
const gen = fs.readFileSync('docs/readme-tools-generated.md', 'utf8');
r = r.slice(0, start) + '## 📋 工具总览（548 个 / 36 类）\n\n' + gen + r.slice(end);

const dev = `每个工具是一个独立目录下的 \`index.html\`：`;
r = r.replace(dev, `> 本清单由 \`docs/gen-readme-tools.js\` 从首页注册数据自动生成（\`node docs/gen-readme-tools.js\`）。\n\n每个工具是一个独立目录下的 \`index.html\`：`);

fs.writeFileSync('README.md', r, 'utf8');
console.log('README updated OK, length=' + r.length);
