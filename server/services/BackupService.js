import Encryption from "./Encryption.js";
import GetBackupDataBase from "./storage/backup.js";

async function GetDataBase() {
    const database = await GetBackupDataBase();
    return Encryption.Encrypt(database);
}


const BackupService = {
    GetDataBase
};

export default BackupService;