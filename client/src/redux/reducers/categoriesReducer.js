import SaleActionsConstants from "../actions/actionConstants/sale/saleActionConstants";
import CategoriesActionsConstants from '../actions/actionConstants/Categories/CategoriesActionConstants';
import ProductsActionsConstants from '../actions/actionConstants/Products/ProductsActionConstants';
import reducerUtilities, { PRODUCT_TYPE } from "./reducerUtilities";
import SaleFunctions from "./SaleReducerFunctions/Sale";
import CategoriesFunctions from './CategoriesReducerFunctions/CategoriesReducer';
import ProductFunctions from "./ProductsReducerFunctions/ProductReducer";
import ProductSparePartsFunctions from "./ProductsReducerFunctions/ProductSparePartsReducer";
import ProductDiagramFunctions from "./ProductsReducerFunctions/ProductDiagramReducer";
import ProductImagesFunctions from "./ProductsReducerFunctions/ProductImagesReducer";
import ProductPropsFunctions from "./ProductsReducerFunctions/ProductPropReducer";
import RentActionsConstants from '../actions/actionConstants/rent/rentActionConstants';
import RentReducerFunctions from "./RentReducerFunctions/Rent";

const initState = {
    categories: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;    
    try {        
        switch(type) {
            case SaleActionsConstants.GET_SALE: {
                return SaleFunctions[type](state, payload);
            }
            case RentActionsConstants.GET_RENT: {
                return RentReducerFunctions[type](state, payload);
            }
            case CategoriesActionsConstants.ADD_CATEGORY:
            case CategoriesActionsConstants.DELETE_CATEGORY: 
            case CategoriesActionsConstants.UPDATE_CATEGORY:
            case CategoriesActionsConstants.EDIT_CATEGORY: {
                return CategoriesFunctions[type](state, payload);
            }
            case ProductsActionsConstants.ADD_PRODUCT:
            case ProductsActionsConstants.UPDATE_PRODUCT:
            case ProductsActionsConstants.DELETE_PRODUCT:
            case ProductsActionsConstants.PATCH_PRODUCT: {
                const type_condition = reducerUtilities.type_condition(payload.product_type, PRODUCT_TYPE.SaleProducts);
                return ProductFunctions[type](state, payload, type_condition ? PRODUCT_TYPE.SaleProducts : PRODUCT_TYPE.RentProducts);
            }
            case ProductsActionsConstants.PROPS_ACTIONS.ADD_PRODUCT_PROP:
            case ProductsActionsConstants.PROPS_ACTIONS.UPDATE_PRODUCT_PROP:
            case ProductsActionsConstants.PROPS_ACTIONS.DELETE_PRODUCT_PROP:
            case ProductsActionsConstants.PROPS_ACTIONS.PATCH_PRODUCT_PROP: {
                const type_condition = reducerUtilities.type_condition(payload.product_type, PRODUCT_TYPE.SaleProducts);
                return ProductPropsFunctions[type](state, payload, type_condition ? PRODUCT_TYPE.SaleProducts : PRODUCT_TYPE.RentProducts);
            }
            case ProductsActionsConstants.IMAGES_ACTIONS.ADD_PRODUCT_IMAGE:
            case ProductsActionsConstants.IMAGES_ACTIONS.UPDATE_PRODUCT_IMAGE:
            case ProductsActionsConstants.IMAGES_ACTIONS.DELETE_PRODUCT_IMAGE: {
                const type_condition = reducerUtilities.type_condition(payload.product_type, PRODUCT_TYPE.SaleProducts);
                return ProductImagesFunctions[type](state, payload, type_condition ? PRODUCT_TYPE.SaleProducts : PRODUCT_TYPE.RentProducts);
            }
            case ProductsActionsConstants.DIAGRAM_ACTIONS.ADD_DIAGRAM:
            case ProductsActionsConstants.DIAGRAM_ACTIONS.UPDATE_DIAGRAM:
            case ProductsActionsConstants.DIAGRAM_ACTIONS.PATCH_DIAGRAM:
            case ProductsActionsConstants.DIAGRAM_ACTIONS.DELETE_DIAGRAM: {
                const type_condition = reducerUtilities.type_condition(payload.product_type, PRODUCT_TYPE.SaleProducts);
                return ProductDiagramFunctions[type](state, payload, type_condition ? PRODUCT_TYPE.SaleProducts : PRODUCT_TYPE.RentProducts);
            }
            case ProductsActionsConstants.SPARE_PARTS_ACTIONS.ADD_SPARE_PART:
            case ProductsActionsConstants.SPARE_PARTS_ACTIONS.UPDATE_SPARE_PART:
            case ProductsActionsConstants.SPARE_PARTS_ACTIONS.PATCH_SPARE_PART_PROP:
            case ProductsActionsConstants.SPARE_PARTS_ACTIONS.DELETE_SPARE_PART: {
                const type_condition = reducerUtilities.type_condition(payload.product_type, PRODUCT_TYPE.SaleProducts);
                return ProductSparePartsFunctions[type](state, payload, type_condition ? PRODUCT_TYPE.SaleProducts : PRODUCT_TYPE.RentProducts);
            }
            default: {
                return state;
            }
        }
    } catch(err) {
        console.log(err);
    }
};

export default reducer;