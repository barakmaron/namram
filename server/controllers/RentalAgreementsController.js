import RentalAgreementsService from "../services/RentalAgreementsService.js";
import { StatusCode } from 'status-code-enum';

async function GetAgreements(req, res, next) {
    try {
        const { customer, close, SerialNumber, StartDate, EndDate, pdf } = req.query;
        let agreements;
        if (SerialNumber || (StartDate && EndDate))
            agreements = await RentalAgreementsService.SearchAgreements(SerialNumber, StartDate, EndDate);
        else
            agreements = await RentalAgreementsService.GetAllAgreements(close, customer);
        agreements = pdf ? await RentalAgreementsService.GetAgreementPdf(agreements, "חיפוש הסכמים") : agreements;
        if (pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(agreements);
        }
        return res.status(StatusCode.SuccessOK).json(agreements);
    } catch (err) {
        next(err);
    }
}

async function GetRentalAgreement(req, res, next) {
    try {
        const { id } = req.params;
        const { pdf } = req.query;
        let agreement = await RentalAgreementsService.GetAgreement(id);
        agreement = pdf ? await RentalAgreementsService.GetAgreementPdf([agreement], agreement.SerialNumber) : agreement;
        if (pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(agreement);
        }
        return res.status(StatusCode.SuccessOK).json(agreement);
    } catch (err) {
        next(err);
    }
}

async function AddAgreement(req, res, next) {
    try {
        const { Tools, Location, FuelAmount, FuelPrice, TransportAmount, TransportPrice, filesNames, ...customer } = req.body;
        const { id } = req.params;
        const new_agreement = id ?
            await RentalAgreementsService.AddAgreementOldCustomer(Tools, Location, FuelAmount, FuelPrice, TransportAmount, TransportPrice, filesNames, id) :
            await RentalAgreementsService.AddAgreement(Tools, Location, FuelAmount, FuelPrice, TransportAmount, TransportPrice, filesNames, customer);
        return res.status(StatusCode.SuccessOK).json(new_agreement);
    } catch (err) {
        console.log(err)
    }
}

async function CloseAgreement(req, res, next) {
    try {
        const { FuelAmount, FuelPrice, TransportAmount, TransportPrice, filesNames } = req.body;
        const { id } = req.params;
        await RentalAgreementsService.CloseAgreement(id, FuelAmount, FuelPrice, TransportAmount, TransportPrice, filesNames);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function DeleteAgreement(req, res, next) {
    try {
        const { id } = req.params;
        await RentalAgreementsService.DeleteAgreement(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
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