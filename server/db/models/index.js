import Sequelize from 'sequelize';
import SaleCategories from './SaleCategories.js';
import Products from './Products.js';
import ProductsImages from './ProductsImages.js';
import ProductProps from './ProductProps.js';
import ProductPartsDiagram from './ProductPartsDiagram.js';
import SpareParts from './SpareParts.js';
import Users from './Users.js';
import Blogs from './Blogs.js';
import Projects from './Projects.js';
import ProjectsImages from './ProjectsImages.js';
import RentalProducts from './RentProducts.js';
import SaleProducts from './SaleProducts.js';
import ServiceBook from './ServiceBook.js';
import ServiceReports from './ServiceReports.js';
import PartsChanged from './PartsChanged.js';
import RentalAgreement from './RentalAgreement.js';
import RentalAgreementList from './RentalAgreementList.js';
import Customers from './Customers.js';
import RentCategories from './RentCategories.js';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  }
);

export const SaleCategoriesModel = SaleCategories(sequelize, Sequelize.DataTypes);
export const RentCategoriesModel = RentCategories(sequelize, Sequelize.DataTypes);
export const ProductsModel = Products(sequelize, Sequelize.DataTypes);
export const RentalProductsModel = RentalProducts(sequelize, Sequelize.DataTypes);
export const SaleProductsModel = SaleProducts(sequelize, Sequelize.DataTypes);
export const ProductsImagesModel = ProductsImages(sequelize, Sequelize.DataTypes);
export const ProductPropsModel = ProductProps(sequelize, Sequelize.DataTypes);
export const ProductPartsDiagramModel = ProductPartsDiagram(sequelize, Sequelize.DataTypes);
export const SparePartsModel = SpareParts(sequelize, Sequelize.DataTypes);
export const ServiceBookModel = ServiceBook(sequelize, Sequelize.DataTypes);
export const ServiceReportsModel = ServiceReports(sequelize, Sequelize.DataTypes);
export const PartsChangedModel = PartsChanged(sequelize, Sequelize.DataTypes);
export const RentalAgreementModel = RentalAgreement(sequelize, Sequelize.DataTypes);
export const RentalAgreementListModel = RentalAgreementList(sequelize, Sequelize.DataTypes);
export const CustomersModel = Customers(sequelize, Sequelize.DataTypes);
export const UsersModel = Users(sequelize, Sequelize.DataTypes);
export const BlogsModel = Blogs(sequelize, Sequelize.DataTypes);
export const ProjectsModel = Projects(sequelize, Sequelize.DataTypes);
export const ProjectsImagesModel = ProjectsImages(sequelize, Sequelize.DataTypes);

SaleCategoriesModel.hasMany(SaleProductsModel);
SaleProductsModel.belongsTo(SaleCategoriesModel);

RentCategoriesModel.hasMany(RentalProductsModel);
RentalProductsModel.belongsTo(RentCategoriesModel);

ProductsModel.hasOne(RentalProductsModel);
RentalProductsModel.belongsTo(ProductsModel);

ProductsModel.hasOne(SaleProductsModel);
SaleProductsModel.belongsTo(ProductsModel);

ProductsModel.hasMany(ProductsImagesModel);
ProductsImagesModel.belongsTo(ProductsModel);

ProductsModel.hasMany(ProductPropsModel);
ProductPropsModel.belongsTo(ProductsModel);

ProductsModel.hasMany(ProductPartsDiagramModel);
ProductPartsDiagramModel.belongsTo(ProductsModel);

ProductPartsDiagramModel.hasMany(SparePartsModel);
SparePartsModel.belongsTo(ProductPartsDiagramModel);

ProjectsModel.hasMany(ProjectsImagesModel);
ProjectsImagesModel.belongsTo(ProjectsModel);

CustomersModel.hasMany(RentalAgreementModel);
RentalAgreementModel.belongsTo(CustomersModel);

RentalAgreementModel.hasOne(RentalAgreementListModel);
RentalAgreementListModel.belongsTo(RentalAgreementModel);

RentalProductsModel.hasOne(ServiceBookModel);
ServiceBookModel.belongsTo(RentalProductsModel);

ServiceBookModel.hasMany(ServiceReportsModel);
ServiceReportsModel.belongsTo(ServiceBookModel);

// ServiceReportsModel.hasMany(SparePartsModel, {
//   through: PartsChangedModel
// });
SparePartsModel.belongsToMany(ServiceReportsModel, {
  through: PartsChangedModel
});
