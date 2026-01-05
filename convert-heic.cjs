// Run: npm install heic-convert fs-extra
// Then: node convert-heic.js

const fs = require('fs-extra');
const path = require('path');
const convert = require('heic-convert');

async function convertHeicToJpeg(inputPath, outputPath) {
  const inputBuffer = await fs.readFile(inputPath);
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.9
  });
  await fs.writeFile(outputPath, outputBuffer);
  console.log(`Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
}

async function processDirectory(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.toUpperCase().endsWith('.HEIC')) {
      const outputPath = filePath.replace(/\.HEIC$/i, '.jpg');
      try {
        await convertHeicToJpeg(filePath, outputPath);
        // Optionally delete the original HEIC file
        // await fs.unlink(filePath);
      } catch (error) {
        console.error(`Failed to convert ${file}:`, error.message);
      }
    }
  }
}

async function main() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  console.log('Converting HEIC files to JPEG...');
  await processDirectory(imagesDir);
  console.log('Done!');
}

main().catch(console.error);
