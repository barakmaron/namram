import SaleActions from '../../actions/actionConstants/saleActionConstants';

function GetSale(state, payload) {
    return { 
        ...state, 
        categories: payload 
    };
}

const SaleFunctions = {
    [SaleActions.GET_SALE]: GetSale
};

export default SaleFunctions;