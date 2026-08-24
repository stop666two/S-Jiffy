const fs = require('fs');
for (const d of ['ip-location', 'ip-lookup']) {
  const s = fs.readFileSync('projects/' + d + '/index.html', 'utf8');
  const sc = s.match(/<script>([\s\S]*?)<\/script>/)[1];
  console.log('===== ' + d + ' =====');
  console.log(sc);
}
