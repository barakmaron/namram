import { promisify } from 'util';
import sharp from 'sharp';
import fs from 'fs';

const readdir = promisify(fs.readdir);

async function processWebPImages(folderPath) {
    try {
        // Read the list of files in the folder
        const files = await readdir(folderPath);

        // Iterate over each file
        for (const file of files) {
            if (file.split('_').length <= 1 && file.split('.')[1] === 'webp') {
                // Read the image file
                const buffer = fs.readFileSync(`${folderPath}/${file}`);

                // Process the image using sharp
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

// Replace 'path/to/your/webp/images/folder' with the actual path to your WebP image folder
processWebPImages('Images');
