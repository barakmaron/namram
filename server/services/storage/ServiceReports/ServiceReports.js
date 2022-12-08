import { PartsChangedModel, ProductPartsDiagramModel, ProductsModel, RentalProductsModel, ProductDiagramsListModel, ServiceReportsModel, SparePartsModel } from '../../../db/models/index.js';
import ChangedPartDb from './ChangedPart.js';

async function GetServiceReports() {
    return await ServiceReportsModel.findAll({
        where: {
            EndDate: null
        }, 
        include: [{
            model: RentalProductsModel,
            include: {
                model: ProductsModel,
                include: {
                    model: ProductDiagramsListModel,
                    include: {
                        model: ProductPartsDiagramModel,
                        include: SparePartsModel
                    }
                }
            }
        }, {
            model: PartsChangedModel,
            include: {
                model: SparePartsModel,
                include: {
                    model: ProductPartsDiagramModel,
                    attributes: ['ModelName']
                }
            }
        }]
    });
}

async function GetServiceReportById(id) {
    return await ServiceReportsModel.findOne({
        where: {
            id: id
        }, 
        include: [{
            model: RentalProductsModel,
            include: {
                model: ProductsModel,
                include: {
                    model: ProductPartsDiagramModel,
                    include: SparePartsModel
                }
            }
        }, {
            model: PartsChangedModel,
            include: {
                model: SparePartsModel,
                include: {
                    model: ProductPartsDiagramModel,
                    attributes: ['ModelName']
                }
            }
        }]
    });
}

async function GetServiceReportsByProductId(id) {
    return await RentalProductsModel.findOne({
        include: [{
            model: ProductsModel,
            where: {
                id: id
            },       
            include: {
                model: ProductDiagramsListModel,
                include: {
                    model: ProductPartsDiagramModel,
                    include: SparePartsModel
                }
            }
        }, {
            model: ServiceReportsModel,            
            include: {
                model: PartsChangedModel,
                include: {
                    model: SparePartsModel,
                    include: {
                        model: ProductPartsDiagramModel,
                        attributes: ['ModelName']
                    }
                }
            }
        }]
    });
}

async function GetProductByServiceReportId(id) {
    return await RentalProductsModel.findOne({ 
          
        include: [{
            model: ProductsModel,
            include: {
                model: ProductDiagramsListModel,
                include: {
                    model: ProductPartsDiagramModel,
                    include: SparePartsModel
                }
            }
        }, {
            model: ServiceReportsModel,
            where: {
                id: id
            },                 
            include: {
                model: PartsChangedModel,
                include: {
                    model: SparePartsModel,
                    include: {
                        model: ProductPartsDiagramModel,
                        attributes: ['ModelName']
                    }
                }
            }
        }]
    });
}

async function AddServiceReport(product_id, problem) {
    const report = await ServiceReportsModel.create({
        Problem: problem,
        RentProductId: product_id
    });
    return await GetServiceReportById(report.id);
}

async function PatchServiceReport(id, param_name, value) {
    return await ServiceReportsModel.update({
        [param_name]: value
    }, {
        where: {
            id: id
        }
    });
}

const ServiceReportsDb = {
    GetServiceReports,
    AddServiceReport,
    GetServiceReportById,
    GetServiceReportsByProductId,
    GetProductByServiceReportId,
    PatchServiceReport,
    ChangedPartDb
};

export default ServiceReportsDb;