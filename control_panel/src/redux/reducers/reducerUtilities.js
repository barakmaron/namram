const destructorCategory = (categories, category_id) => {
    const category = categories.find(category => category.id === category_id);
    const filtered_categories = categories.filter(category => category.id !== category_id);
    return { category, filtered_categories };
};

const destructorArray = (array, object_id, by = 'id') => {
    const object = { ...array.find(object => object[by] === object_id) };
    const filtered_array = [ ...array.filter(object => object[by] !== object_id) ];
    return { object, filtered_array };
};

const type_condition = (type_send, type_to_check) => type_to_check.toLowerCase().includes(type_send);

const reducerUtilities = {
    destructorCategory,
    destructorArray, 
    type_condition
};

export const PRODUCT_TYPE = {
    SaleProducts: "SaleProducts",
    RentProducts: "RentProducts"

};

export default reducerUtilities;