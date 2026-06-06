const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const res = await fetch('https://rohanskt.github.io/web/');
    const html = await res.text();
    const out = path.resolve(__dirname, '..', 'src', 'data');
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, 'importedSite.html'), html, 'utf8');
    console.log('Saved site HTML to', out);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
