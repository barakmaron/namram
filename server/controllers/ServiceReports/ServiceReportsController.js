import ServiceReportsService from "../../services/ServiceReports/ServiceReportsService.js";
import parts_changed from './PartsChangedController.js';

async function GetServiceReports(req, res) {
    try {
        const service_reports = await ServiceReportsService.GetServiceReports();
        return res.status(200).json(service_reports);
    } catch (err) {

    }
}

async function GetServiceReport(req, res) {
    try {
        const { id } = req.params;
        const { pdf } = req.query;
        const service_report = pdf ? await ServiceReportsService.GetServiceReportPdf(id) : await ServiceReportsService.GetServiceReport(id);
        if(pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(service_report);
        }
        return res.status(200).json(service_report);
    } catch (err) {
        console.log(err)
    }
}

async function AddServiceReport(req, res) {
    try {
        const { product_id, Problem } = req.body;
        const service_report = await ServiceReportsService.AddServiceReport(product_id, Problem);
        return res.status(200).json(service_report);
    } catch (err) {
        console.log(err);
    }
}

async function GetServiceBook(req, res) {
    try {
        const { id } = req.params;
        const service_book = await ServiceReportsService.GetServiceBook(id);
        res.set('Content-Type', 'text/html');
        return res.send(service_book);
    } catch (err) {
        console.log(err);
    }
}

async function PatchServiceReport(req, res) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await ServiceReportsService.PatchServiceReport(id, param_name, value);
        return res.status(200).json();
    } catch (err) {
        console.log(err)
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