const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.resolve(__dirname, '..', 'public', 'resume.pdf');
if (!fs.existsSync(pdfPath)) {
  console.error('resume.pdf not found at', pdfPath);
  process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(data => {
  const text = data.text || '';
  const headings = ['summary','objective','education','experience','skills','projects','certifications','languages','interests','contact','achievements'];
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const sections = {};
  let current = 'summary';
  sections[current] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    // match a heading when the common heading word appears anywhere in the line
    const matched = headings.find(h => lower.includes(h));
    if (matched && sections[current].length > 0) {
      current = matched;
      sections[current] = [];
      continue;
    }
    sections[current].push(line);
  }

  const resume = {
    name: lines[0] || 'Rohan Sakthivel',
    sections,
    rawText: text
  };

  const outDir = path.resolve(__dirname, '..', 'src', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'resume.json'), JSON.stringify(resume, null, 2), 'utf8');
  console.log('Wrote resume.json to', path.join(outDir, 'resume.json'));
}).catch(err => { console.error(err); process.exit(1); });
