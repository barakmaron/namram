import categoriesAction from '../../actions/actionConstants/CategoriesActionConstants';


function GetCategory(state, payload) {
    return {
        ...state,
        categories: payload
    };
}

const CategoriesFunctions = {
    [categoriesAction.GET_CATEGORY]: GetCategory,
};

export default CategoriesFunctions;