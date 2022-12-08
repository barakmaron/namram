import ServiceReportsService from "../../services/ServiceReports/ServiceReportsService.js";
import parts_changed from './PartsChangedController.js';
import { StatusCode } from 'status-code-enum';

async function GetServiceReports(req, res, next) {
    try {
        const service_reports = await ServiceReportsService.GetServiceReports();
        return res.status(StatusCode.SuccessOK).json(service_reports);
    } catch (err) {
        next(err);
    }
}

async function GetServiceReport(req, res, next) {
    try {
        const { id } = req.params;
        const { pdf } = req.query;
        const service_report = pdf ? await ServiceReportsService.GetServiceReportPdf(id) : await ServiceReportsService.GetServiceReport(id);
        if(pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(service_report);
        }
        return res.status(StatusCode.SuccessOK).json(service_report);
    } catch (err) {
        next(err);
    }
}

async function AddServiceReport(req, res, next) {
    try {
        const { product_id, Problem } = req.body;
        const service_report = await ServiceReportsService.AddServiceReport(product_id, Problem);
        return res.status(StatusCode.SuccessOK).json(service_report);
    } catch (err) {
        next(err);
    }
}

async function GetServiceBook(req, res, next) {
    try {
        const { id } = req.params;
        const service_book = await ServiceReportsService.GetServiceBook(id);
        res.set('Content-Type', 'text/html');
        return res.send(service_book);
    } catch (err) {
        next(err);
    }
}

async function PatchServiceReport(req, res, next) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await ServiceReportsService.PatchServiceReport(id, param_name, value);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const ServiceReportsController = {
    GetServiceReports,
    AddServiceReport,
    GetServiceReport,
    GetServiceBook,
    PatchServiceReport,
    parts_changed
};

export default ServiceReportsController;