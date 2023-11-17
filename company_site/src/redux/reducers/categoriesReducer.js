import SaleActionsConstants from "../actions/actionConstants/saleActionConstants";
import CategoriesActionsConstants from '../actions/actionConstants/CategoriesActionConstants';
import SaleFunctions from "./ReducerFunctions/Sale";
import CategoriesFunctions from './ReducerFunctions/CategoriesReducer';
import RentActionsConstants from '../actions/actionConstants/rentActionConstants';
import RentReducerFunctions from "./ReducerFunctions/Rent";

const initState = {
    categories: [],
    diagrams: []
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
            case CategoriesActionsConstants.GET_CATEGORY: {
                return CategoriesFunctions[type](state, payload);
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