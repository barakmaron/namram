import SendApiRequest from "../services/ApiService.js";
import Decrypt from "../services/Decrypt.js";

export default async function GetDatabase() {
    try {
        const encrypted_data = await SendApiRequest(`/backup/database`);
        const database = Decrypt(encrypted_data);
        return database;
    } catch(err) {
        throw err;
    }
}