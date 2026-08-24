const fs = require('fs');
for (const d of ['ip-location', 'ip-lookup']) {
  const p = 'projects/' + d + '/index.html';
  const s = fs.readFileSync(p, 'utf8');
  const urls = s.match(/https?:\/\/[^'"\s]+/g) || [];
  console.log('===', d, '===');
  console.log('apis:', urls.filter(u => !u.includes('w3.org')).slice(0, 10).join(' '));
  const h1 = s.match(/<h1[^>]*>([^<]*)<\/h1>/);
  console.log('title:', h1 && h1[1]);
  const desc = s.match(/tool-desc[^>]*>([^<]*)</);
  console.log('desc:', desc && desc[1]);
  const fetchUrls = s.match(/fetch\(['"`]([^'"`]+)['"`]/g) || [];
  console.log('fetch calls:', fetchUrls.join(' | '));
  console.log('script size:', (s.match(/<script>([\s\S]*?)<\/script>/) || [])[1]?.length);
}
