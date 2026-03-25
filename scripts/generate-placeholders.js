const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const images = [
  {
    name: 'hero-placeholder-1.png',
    bgColor: '#0a0a0a',
    title: 'CAMPAIGN 01',
    subtitle: 'Billboard Campaign'
  },
  {
    name: 'hero-placeholder-2.png',
    bgColor: '#0d1b2a',
    title: 'CAMPAIGN 02',
    subtitle: 'Transit Advertising'
  },
  {
    name: 'hero-placeholder-3.png',
    bgColor: '#1a1a1a',
    title: 'CAMPAIGN 03',
    subtitle: 'Digital OOH'
  },
  {
    name: 'hero-placeholder-4.png',
    bgColor: '#0a1628',
    title: 'CAMPAIGN 04',
    subtitle: 'Place-Based Ads'
  }
];

const width = 1920;
const height = 1080;
const outDir = path.join(__dirname, '../public/videos');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

images.forEach(imgData => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = imgData.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(imgData.title, width / 2, height / 2 - 40);

  // Subtitle
  ctx.fillStyle = '#EB0000';
  ctx.font = 'bold 60px sans-serif';
  ctx.fillText(imgData.subtitle, width / 2, height / 2 + 80);

  // Save to file
  const outPath = path.join(outDir, imgData.name);
  const out = fs.createWriteStream(outPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  out.on('finish', () => console.log(`Created ${imgData.name}`));
});
