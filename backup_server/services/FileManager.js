import fs from 'fs';
import path from 'path';
import moment from 'moment';

async function CreateDir() {
    try {
        const date = moment().format("DD_MM_YYYY");
        const base_folder = process.env.BASE_FOLDER;
        const folder = path.resolve(path.join(base_folder, date));
        const check_dir = fs.existsSync(folder);
        if(!check_dir) {
            const created_folder = fs.mkdirSync(folder);
            return created_folder;
        }
        return folder;
    } catch (err) {
        return false;
    }
}

function CreateFile(file_name, location, data) {
    try {
        const file_full_location = path.join(location, file_name);
        fs.appendFileSync(file_full_location, data);
    } catch (err) {
        throw err;
    }
}

const FileManager = {
    CreateDir,
    CreateFile
};

export default FileManager;