import CategoriesDB from "./storage/Categories.js";
import ImageService from "./ImageService.js";
import RentService from "./RentService.js";
import PdfService from "./PdfServices/index.js";

async function GetCategory(id) {
    return await CategoriesDB.GetCategoryById(id);
}

async function GetRentCategory(id) {
    return await CategoriesDB.GetRentCategory(id);
}

async function AddCategory(name, image, product_type){
    const [categoryImage] = image;
    return await CategoriesDB.AddCategory(name, categoryImage, product_type);
}

async function DeleteCategory(id) {
    const category = await CategoriesDB.GetOnlyCategoryById(id);
    const delete_image = ImageService.DeleteStoredImages(category.Image); 
    return [await Promise.all([CategoriesDB.DeleteCategory(id), delete_image])];
}

async function EditCategory(name, id) {
    return await CategoriesDB.EditCategory(name, id);
}

async function CreateRentalIncomeCategoryReport(category) {
    const parse_category_from_db = {...category};
    parse_category_from_db.RentProducts = await Promise.all(parse_category_from_db.RentProducts.map(product => RentService.ParseRentalProductForPdf(product)));
    parse_category_from_db.SumIncome = parse_category_from_db.RentProducts.reduce((accumulator, product) => accumulator + product.SumRentalIncome, 0);
    parse_category_from_db.SumService = parse_category_from_db.RentProducts.reduce((accumulator, product) => accumulator + product.ServicePrice, 0);
    parse_category_from_db.SumNetIncome = parse_category_from_db.SumIncome - parse_category_from_db.SumService;
    return await PdfService.CreateRentalCategoryPdf(parse_category_from_db);
}

const CategoriesService = {
    GetCategory,
    AddCategory,
    DeleteCategory,
    EditCategory,
    CreateRentalIncomeCategoryReport,
    GetRentCategory
};

export default CategoriesService;