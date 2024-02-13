import Props from './PropsService.js';
import Images from './ImagesService.js';
import ScheduledService from './ScheduledService.js';
import ProductsDB from '../storage/Products/index.js';
import Diagrams from './DiagramsService.js';
import SpareParts from './SparePartsService.js';
import Constants from '../../Constants.js';
import ImageService from '../ImageService.js';

function destructorProps(props) {
    const ret = [];
    const props_as_array = Object.keys(props).map((key) => props[key]);
    props_as_array.forEach((value, index) => {
        if(index < props_as_array.length - 1 &&  index % 2 === 0)
            ret.push({ 
                name: value,
                value: props_as_array[index + 1]
            });
    });
    return ret;
}

async function AddProduct(category, name, serial_number, text, price, files, props, product_type){
    const { DayPrice, WeekPrice, MonthPrice, Display, HourClock, Identifier } = product_type.includes(Constants.PRODUCT_TYPE.RENT.toLowerCase()) && props;  
    delete props.DayPrice;
    delete props.WeekPrice;
    delete props.MonthPrice;
    delete props.Display;
    delete props.HourClock; 
    delete props.Identifier; 
    const parsed_props = destructorProps(props);
    return await ProductsDB.AddProduct(
        category, 
        name, 
        serial_number, 
        text, 
        price || { DayPrice, WeekPrice, MonthPrice }, 
        files, 
        parsed_props, 
        product_type,
        Display, 
        HourClock,
        Identifier);
}

async function DeleteProduct(id, product_type) {
    const product = await ProductsDB.GetProductById(id);
    const delete_images = product.ProductsImages.map(image => ImageService.DeleteStoredImages(image.Image));    
    return [await Promise.all([ProductsDB.DeleteProduct(id, product_type), ...delete_images])];
}

async function ChangeProductCategory(id, newCategory) {
    return await ProductsDB.ChangeProductCategory(id, newCategory);
}

async function PatchProduct(id, param_name, value) {
    switch (param_name) {
        case "Name": {
            return await ProductsDB.PatchName(id, value);
        }
        case "Price": {
            return await ProductsDB.PatchPrice(id, value);
        }
        case "DayPrice":
        case "WeekPrice":
        case "MonthPrice":
        case "Display":
        case "HourClock": {
            return await ProductsDB.PatchRentProp(id, value, param_name);
        }
        case "Text": {
            return await ProductsDB.PatchText(id, value);
        }
        case "SerialNumber": {
            return await ProductsDB.PatchSerialNumber(id, value);
        }
    }    
}

const ProductsService = {
    Props,
    Images,
    Diagrams,
    SpareParts,
    ScheduledService,
    AddProduct,
    DeleteProduct, 
    PatchProduct,
    ChangeProductCategory
};

export default ProductsService;