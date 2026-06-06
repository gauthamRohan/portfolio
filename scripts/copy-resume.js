const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', '..', 'Rohan_Sakthivel_Resume (5).pdf');
const destDir = path.resolve(__dirname, '..', 'public');
const dest = path.join(destDir, 'resume.pdf');

if (!fs.existsSync(src)) {
  console.error('Source resume not found:', src);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('Copied resume to', dest);
