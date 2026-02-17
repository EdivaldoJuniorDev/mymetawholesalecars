import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const assetsDir = path.resolve(process.cwd(), 'client', 'src', 'assets');
const carAnimationSrc = path.resolve(process.cwd(), 'assets', 'car-animation.mp4');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  const pngFiles = files.filter(file => file.endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files to optimize.`);

  for (const file of pngFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, file.replace('.png', '.webp'));

    console.log(`Converting ${file} to WebP...`);
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`Finished ${file} -> ${path.basename(outputPath)}`);
  }
}

function optimizeVideo() {
  const outputPath = path.join(assetsDir, 'car-animation.webm');
  
  console.log(`Converting video to WebM...`);
  try {
    // Using VP9 with reasonable settings for web background
    execSync(`ffmpeg -y -i "${carAnimationSrc}" -c:v libvpx-vp9 -crf 30 -b:v 0 -an "${outputPath}"`, { stdio: 'inherit' });
    console.log(`Finished video conversion -> car-animation.webm`);
  } catch (error) {
    console.error(`Error converting video:`, error);
  }
}

async function main() {
  try {
    await optimizeImages();
    optimizeVideo();
    console.log('Asset optimization complete!');
  } catch (error) {
    console.error('Optimization failed:', error);
  }
}

main();
