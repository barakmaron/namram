import { CategoriesModel, StaticPagesModel } from "./models/index.js";

const GetCategoryTypeEnum = () => {
    const { Type } = CategoriesModel.getAttributes();
    return Type.type.values;
}

const GetStaticPagesTypeEnum = () => {
    const { DisplayType } = StaticPagesModel.getAttributes();
    return DisplayType.type.values;
}

const DbConstants = {
    GetCategoryTypeEnum,
    GetStaticPagesTypeEnum
};

export default DbConstants;