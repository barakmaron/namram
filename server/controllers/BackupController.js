import BackupService from '../services/BackupService.js';

async function GetDataBase(req, res, next) {
    try {
        const encrypted_data_base = await BackupService.GetDataBase();
        return res.status(200).json(encrypted_data_base);
    } catch (err) {
        next(err);
    }
}


const BackupController = {
    GetDataBase,
    // GetRentalAgreements
};

export default BackupController;