
const API_METHODS = {
    POST: "post",
    GET: "get",
    PUT: "put",
    PATCH: "patch",
    DELETE: "delete"
};

const API_PRODUCT_TYPE = {
    SALE: "sale",
    RENT: "rent"
};

const PRODUCT_TYPE = {
    SaleProducts: "SaleProducts",
    RentProducts: "RentProducts",
    Sale: "SaleProducts",
    Rental: "RentProducts"
};

const CATEGORY_TYPE = {
    Sale: 'SalePage',
    Rental: 'RentPage'
};

const DateFormat = "DD/MM/YYYY";

const DisplayType = {
    products: "PRODUCTS", 
    category: "CATEGORIES"
};
  
const html_remove_regex = /(<([^>]+)>)/gi;

const Constants = {
    API_METHODS,
    API_PRODUCT_TYPE,
    PRODUCT_TYPE,
    DateFormat,
    DisplayType,
    CATEGORY_TYPE,
    html_remove_regex
};

export default Constants;