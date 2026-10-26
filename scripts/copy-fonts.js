const fs = require('fs'), path = require('path');
const fonts = { 'hind-siliguri': [400, 500, 600, 700], 'ibm-plex-mono': [400, 500, 600], 'schibsted-grotesk': [400, 500, 600, 700] };
for (const [pkg, weights] of Object.entries(fonts)) {
  const src = path.join('node_modules', '@fontsource', pkg), dst = path.join('www', 'fonts', pkg);
  fs.mkdirSync(path.join(dst, 'files'), { recursive: true });
  for (const w of weights) {
    fs.copyFileSync(path.join(src, w + '.css'), path.join(dst, w + '.css'));
    for (const f of fs.readdirSync(path.join(src, 'files')))
      if (f.endsWith('-' + w + '-normal.woff2')) fs.copyFileSync(path.join(src, 'files', f), path.join(dst, 'files', f));
  }
}
console.log('Fonts copied to www/fonts');
