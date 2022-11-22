import RentService from '../services/RentService.js';

async function GetAllWithNested(req, res) {
    try {
        const available = req.param('available');
        const categories = !available ? await RentService.GetAll() : await RentService.GetAllAvailable();
        return res.status(200).json(categories);
    } catch (err) {
        console.log(err);
    }
}

const RentController = {
    GetAllWithNested
};

export default RentController;