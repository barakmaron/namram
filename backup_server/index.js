import dotenv from 'dotenv';
import moment from 'moment';
import Login from './controllers/AuthController.js';
import GetDatabase from './controllers/DatabaseController.js';
import GetRentalAgreements from './controllers/RentalAgreements.js';
import FileManager from './services/FileManager.js';
dotenv.config();

async function main(){
    try {
        console.log("Trying to login");
        await Login();
        console.log("Logged in");
        console.log("Trying to create dir");
        const folder = await FileManager.CreateDir();
        console.log("Dir created");
        console.log("Trying to get DataBase");
        const database = await GetDatabase();
        console.log("Got database");
        console.log("Trying to save database");
        FileManager.CreateFile("database.sql", folder, database);
        console.log("Database saved");
        console.log("Trying to get rental agreements");
        const rental_agreements = await GetRentalAgreements();
        console.log("Got rental agreements");
        console.log("Trying to save rental agreements");
        FileManager.CreateFile("rental_agreements.html", folder, rental_agreements);
        console.log("Rental agreements saved");
    } catch (err) {
        const date = moment().format('DD_MM_YYYY');
        FileManager.CreateFile(`error_log_${date}.txt`, './', err.toString());
    }
}

main();