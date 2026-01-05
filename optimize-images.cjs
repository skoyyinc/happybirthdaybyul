const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'images');
const soundDir = path.join(__dirname, 'public', 'sound');

// Image optimization settings
const JPEG_QUALITY = 75; // 0-100, lower = smaller file size
const PNG_QUALITY = 80;
const WEBP_QUALITY = 75;
const MAX_WIDTH = 1920; // Maximum width in pixels
const MAX_HEIGHT = 1920; // Maximum height in pixels

async function optimizeImage(filePath, fileName) {
  try {
    const ext = path.extname(fileName).toLowerCase();
    const baseName = path.basename(fileName, ext);

    // Skip if not an image
    if (!['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'].includes(ext)) {
      return;
    }

    console.log(`Optimizing: ${fileName}`);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if too large
    let resizeOptions = {};
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      resizeOptions = {
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: 'inside',
        withoutEnlargement: true
      };
    }

    // Determine output format and quality
    let outputPath = filePath;
    let optimizeOptions = {};

    if (ext === '.jpg' || ext === '.jpeg' || ext === '.JPG' || ext === '.JPEG') {
      optimizeOptions = {
        quality: JPEG_QUALITY,
        mozjpeg: true, // Use mozjpeg for better compression
      };

      await image
        .resize(resizeOptions)
        .jpeg(optimizeOptions)
        .toFile(filePath + '.tmp');

    } else if (ext === '.png' || ext === '.PNG') {
      optimizeOptions = {
        quality: PNG_QUALITY,
        compressionLevel: 9,
        palette: true, // Use palette-based images when possible
      };

      await image
        .resize(resizeOptions)
        .png(optimizeOptions)
        .toFile(filePath + '.tmp');

    } else if (ext === '.webp') {
      optimizeOptions = {
        quality: WEBP_QUALITY,
      };

      await image
        .resize(resizeOptions)
        .webp(optimizeOptions)
        .toFile(filePath + '.tmp');
    }

    // Get file sizes
    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.statSync(filePath + '.tmp').size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

    // Replace original with optimized
    fs.unlinkSync(filePath);
    fs.renameSync(filePath + '.tmp', filePath);

    console.log(`  ✓ Reduced by ${savings}% (${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB)`);

  } catch (error) {
    console.error(`  ✗ Error optimizing ${fileName}:`, error.message);
  }
}

async function processDirectory(directory) {
  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath);
    } else if (item.isFile()) {
      // Optimize image files
      await optimizeImage(fullPath, item.name);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  console.log(`Settings:
  - JPEG Quality: ${JPEG_QUALITY}%
  - PNG Quality: ${PNG_QUALITY}%
  - WebP Quality: ${WEBP_QUALITY}%
  - Max Dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}px
  `);

  if (!fs.existsSync(imagesDir)) {
    console.error('Error: images directory not found!');
    process.exit(1);
  }

  const startTime = Date.now();

  await processDirectory(imagesDir);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`\n✅ Optimization complete! (${duration}s)`);
  console.log('\nNext steps:');
  console.log('1. Run: npm run build');
  console.log('2. Deploy the updated site');
}

main().catch(console.error);
