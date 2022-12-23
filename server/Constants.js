const PRODUCT_TYPE = {
    RENT: "Rent",
    SALE: "Sale"
};

const DISPLAY_TYPE = {
    PRODUCTS: "products",
    CATEGORIES: "categories"
};

const TIME_DATE_FORMAT = "DD/MM/YYYY dddd HH:mm";

const html_remove_regex = /(<([^>]+)>)/gi;

const Constants = {
    PRODUCT_TYPE,
    TIME_DATE_FORMAT,
    DISPLAY_TYPE,
    html_remove_regex
};

export default Constants;