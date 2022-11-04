import ACTIONS from "../actions/actionConstants/sale/saleActionConstants";

const initState = {
    categories: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_SALE: {
            return { 
                ...state, 
                categories: payload 
            };
        }
        case ACTIONS.CATEGORIES.ADD_CATEGORY: {
            return {
                ...state,
                categories: [ ...state.categories, {
                    ...payload, 
                    SaleProducts: []
                }]
            };
        }
        case ACTIONS.CATEGORIES.UPDATE_CATEGORY: {
            let filtered_categories = state.categories;
            if(payload.id)
                filtered_categories = state.categories.filter(category => category.id !== payload.id);
            else
                filtered_categories.length = state.categories.length - 1;
            return {
                ...state,
                categories: [ ...filtered_categories, payload.category ]
            };
        }
        case ACTIONS.CATEGORIES.DELETE_CATEGORY: {
            const filtered_categories = state.categories.filter(category => category.id !== payload);
            return { 
                ...state, 
                categories: [ ...filtered_categories ]
            };
        }
        case ACTIONS.CATEGORIES.EDIT_CATEGORY: {
            const category = state.categories.find(category => category.id === payload.id);
            const filtered_categories = state.categories.filter(category => category.id !== payload.id);
            category.Name = payload.name;
            return { 
                ...state, 
                categories: [ ...filtered_categories, category ]
            };
        }
        case ACTIONS.PRODUCTS.ADD_PRODUCT: {
            const data = Object.fromEntries(payload.form);
            const category = state.categories.find(category => category.id === payload.category_id);
            const filtered_categories = state.categories.filter(category => category.id !== data.category_id);  
            category.SaleProducts.push(data);
            return { 
                ...state, 
                categories: [ ...filtered_categories, category ]
            };
        }
        case ACTIONS.PRODUCTS.UPDATE_PRODUCT: {
            const { product } = payload;
            const category = state.categories.find(category => category.id === product.SaleCategoryId);
            const filtered_categories = state.categories.filter(category => category.id !== product.SaleCategoryId);  
            category.SaleProducts.pop();
            category.SaleProducts.push(product);
            return { 
                ...state, 
                categories: [ ...filtered_categories, category ]
            };
        }
        case ACTIONS.PRODUCTS.DELETE_PRODUCT: {
            const { category_id, product_id } = payload;
            const category = state.categories.find(category => category.id === category_id);
            const filtered_categories = state.categories.filter(category => category.id !== category_id);
            category.SaleProducts = category.SaleProducts.filter(product => product.ProductId !== product_id);
            return { 
                ...state, 
                categories: [ ...filtered_categories, category ]
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;