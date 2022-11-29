import DbConstants from "../../db/DbConstants.js";
import { CategoriesModel, StaticPagesModel } from "../../db/models/index.js";

async function GetStaticPages() {
    return await StaticPagesModel.findAll({
        include: { 
            model:CategoriesModel,
            attributes: ["Name"]
        }
    });
}

async function GetStaticPageById(id) {
    return await StaticPagesModel.findOne({
        where: {
            id: id
        },
        include: { 
            model:CategoriesModel,
            attributes: ["Name"]
        }
    });
}

async function AddStaticPage(page_route, display_type, category_id) {
    const display_type_enum = DbConstants.GetStaticPagesTypeEnum();
    return await StaticPagesModel.create({
        PageRoute: page_route,
        DisplayType: display_type ? display_type_enum[0] : display_type_enum[1],
        CategoryId: category_id
    });
}

async function DeleteStaticPage(id) {
    return await StaticPagesModel.destroy({
        where: {
            id: id
        }
    });
}

const StaticPagesDb = {
    AddStaticPage,
    GetStaticPages,
    DeleteStaticPage,
    GetStaticPageById
};

export default StaticPagesDb;