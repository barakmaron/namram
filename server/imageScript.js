import { promisify } from 'util';
import sharp from 'sharp';
import fs from 'fs';

const readdir = promisify(fs.readdir);

async function processWebPImages(folderPath) {
    try {
        const files = await readdir(folderPath);
        for (const file of files) {
            if (file.endsWith('.webp') && !file.includes('_')) {
                const buffer = fs.readFileSync(`${folderPath}/${file}`);
                await sharp(buffer)
                    .webp({ quality: 100 })
                    .resize({ width: 56, height: 56 })
                    .toFile(`./Images/${file.split('.')[0]}_thumb.webp`);

                console.log(`Processed image: ${file}`);
            }
        }
    } catch (error) {
        console.error('Error processing images:', error);
    }
}

processWebPImages('Images');
