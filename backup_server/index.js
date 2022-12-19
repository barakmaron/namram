import dotenv from 'dotenv';
import moment from 'moment';
import Login from './controllers/AuthController.js';
import GetDatabase from './controllers/DatabaseController.js';
import GetRentalAgreements from './controllers/RentalAgreements.js';
import FileManager from './services/FileManager.js';
dotenv.config();

async function main(){
    try {
        await Login();
        const folder = await FileManager.CreateDir();
        const database = await GetDatabase();
        FileManager.CreateFile("database.sql", folder, database);
        const rental_agreements = await GetRentalAgreements();
        FileManager.CreateFile("rental_agreements.html", folder, rental_agreements);
    } catch (err) {
        const date = moment().format('DD_MM_YYYY');
        FileManager.CreateFile(`error_log_${date}.txt`, './', err.toString());
    }
}

main();