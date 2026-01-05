const fs = require('fs');
const path = require('path');

function getImagesFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  // Only web-compatible formats (exclude HEIC)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

  return files
    .filter(file => {
      const ext = path.extname(file);
      return imageExtensions.includes(ext);
    })
    .sort();
}

function generateManifest() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  const manifest = {};

  const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  folders.forEach(folder => {
    const folderPath = path.join(imagesDir, folder);
    const images = getImagesFromFolder(folderPath);
    if (images.length > 0) {
      manifest[folder] = images;
    }
  });

  const manifestPath = path.join(__dirname, 'src', 'imageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('Image manifest generated successfully!');
  console.log('Folders processed:', Object.keys(manifest).length);
  Object.entries(manifest).forEach(([folder, images]) => {
    console.log(`  ${folder}: ${images.length} images`);
  });
}

generateManifest();
