import RentService from '../services/RentService.js';
import { StatusCode } from 'status-code-enum';

async function GetAllWithNested(req, res, next) {
    try {
        const { available } = req.query;
        const categories = !available ? await RentService.GetAll() : await RentService.GetAllAvailable();
        return res.status(StatusCode.SuccessOK).json(categories);
    } catch (err) {
        next(err);
    }
}


const RentController = {
    GetAllWithNested
};

export default RentController;