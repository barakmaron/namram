import { CategoriesModel } from "./models/index.js";

const GetCategoryTypeEnum = () => {
    const { Type } = CategoriesModel.getAttributes();
    return Type.type.values;
}

const DbConstants = {
    GetCategoryTypeEnum
};

export default DbConstants;