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

const relational_options = {
  onDelete: 'cascade', 
  foreignKey: { allowNull: false },
  hooks: true
};

SaleCategoriesModel.hasMany(SaleProductsModel, relational_options);
SaleProductsModel.belongsTo(SaleCategoriesModel, relational_options);

RentCategoriesModel.hasMany(RentalProductsModel, relational_options);
RentalProductsModel.belongsTo(RentCategoriesModel, relational_options);

ProductsModel.hasOne(RentalProductsModel, relational_options);
RentalProductsModel.belongsTo(ProductsModel, relational_options);

ProductsModel.hasOne(SaleProductsModel, relational_options);
SaleProductsModel.belongsTo(ProductsModel, relational_options);

ProductsModel.hasMany(ProductsImagesModel, relational_options);
ProductsImagesModel.belongsTo(ProductsModel, relational_options);

ProductsModel.hasMany(ProductPropsModel, relational_options);
ProductPropsModel.belongsTo(ProductsModel, relational_options);

ProductsModel.hasMany(ProductPartsDiagramModel, relational_options);
ProductPartsDiagramModel.belongsTo(ProductsModel, relational_options);

ProductPartsDiagramModel.hasMany(SparePartsModel, relational_options);
SparePartsModel.belongsTo(ProductPartsDiagramModel, relational_options);

ProjectsModel.hasMany(ProjectsImagesModel, relational_options);
ProjectsImagesModel.belongsTo(ProjectsModel, relational_options);

CustomersModel.hasMany(RentalAgreementModel, relational_options);
RentalAgreementModel.belongsTo(CustomersModel, relational_options);

RentalProductsModel.belongsToMany(RentalAgreementModel, {
  ...relational_options,
  through: RentalAgreementListModel
});

RentalProductsModel.hasOne(ServiceBookModel, relational_options);
ServiceBookModel.belongsTo(RentalProductsModel, relational_options);

ServiceBookModel.hasMany(ServiceReportsModel, relational_options);
ServiceReportsModel.belongsTo(ServiceBookModel, relational_options);

SparePartsModel.belongsToMany(ServiceReportsModel, {
  ...relational_options,
  through: PartsChangedModel
});
