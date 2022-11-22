import RentalAgreementsService from "../services/RentalAgreementsService.js";

async function GetAgreements(req, res) {
    try {
        const { customer, close } = req.query;
        const agreements = await RentalAgreementsService.GetAllAgreements(close, customer);
        return res.status(200).json(agreements);
    } catch (err) {
        console.log(err)
    }
}

async function GetRentalAgreement(req, res) {
    try {
        const { id } = req.params;
        const { pdf } = req.query;
        const agreement = pdf ? await RentalAgreementsService.GetAgreementPdf(id) : await RentalAgreementsService.GetAgreement(id);
        if(pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(agreement);
        }
        return res.status(200).json(agreement);
    } catch (err) {
        console.log(err);
    }
}

async function AddAgreement(req, res) {
    try {
        const { Tools, Location, FuelAmount, FuelPrice, TransportAmount, TransportPrice, ...customer } = req.body;
        const { id } = req.params;
        const file = req.file;
        const new_agreement = id ?  
            await RentalAgreementsService.AddAgreementOldCustomer(Tools, Location, FuelAmount, FuelPrice, TransportAmount, TransportPrice, file, id) :
            await RentalAgreementsService.AddAgreement(Tools, Location, FuelAmount, FuelPrice, TransportAmount, TransportPrice, file, customer);
        return res.status(200).json(new_agreement);
    } catch (err) {
        console.log(err)
    }
}

async function CloseAgreement(req, res) {
    try {
        const { FuelAmount, FuelPrice, TransportAmount, TransportPrice } = req.body;
        const { id } = req.params;
        const file = req.file;
        await RentalAgreementsService.CloseAgreement(id, FuelAmount, FuelPrice, TransportAmount, TransportPrice, file);
        return res.status(200).json();
    } catch (err) {
        console.log(err)
    }
}

async function DeleteAgreement(req, res) {
    try {
        const { id } = req.params;
        await RentalAgreementsService.DeleteAgreement(id);
        return res.status(200).json();
    } catch (err) {
        console.log(err)
    }
}

const RentalAgreementsController = {
    GetAgreements,
    AddAgreement,
    CloseAgreement,
    DeleteAgreement,
    GetRentalAgreement
};

export default RentalAgreementsController;