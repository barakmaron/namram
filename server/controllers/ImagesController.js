import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function GetImage(req, res) {
    try {
        const { file_name } = req.params;   
        res.setHeader('content-type', "image/jpeg");     
        return res.sendFile(path.join(__dirname, `../Images/${file_name}`));
    } catch (err) {
        throw err;
    }
}


const ImagesController = {
    GetImage
};

export default ImagesController;