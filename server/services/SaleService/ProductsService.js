import SaleProductsDB from "../storage/Sale/Products.js";

async function AddProduct(category, name, serial_number, text, price, images, props){
    const props_as_array = Object.keys(props).map((key) => props[key]);
    const parsed_props = [];
    props_as_array.forEach((value, index) => {
        if(index < props_as_array.length - 1 &&  index % 2 === 0)
            parsed_props.push({ 
                name: value,
                value: props_as_array[index + 1]
            });
    });
    return await SaleProductsDB.AddProduct(category, name, serial_number, text, price, images, parsed_props);
}

async function DeleteProduct(id) {
    return await SaleProductsDB.DeleteProduct(id);
}

async function PatchProduct(id, param_name, value) {
    switch (param_name) {
        case "Name": {
            return await SaleProductsDB.PatchName(id, value);
        }
        case "Price": {
            return await SaleProductsDB.PatchPrice(id, value);
        }
    }
    
}

const ProductsService = {
    AddProduct,
    DeleteProduct,
    PatchProduct
};

export default ProductsService;