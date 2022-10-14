import Sequelize from 'sequelize';
import Categories from './Categories.js';
import Products from './Products.js';
import ProductsImages from './ProductsImages.js';
import ProductProps from './ProductProps.js';
import ProductPartsDiagram from './ProductPartsDiagram.js';
import SpareParts from './SpareParts.js';
import Users from './Users.js';
import Blogs from './Blogs.js';
import Projects from './Projects.js';
import ProjectsImages from './ProjectsImages.js';
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

export const CategoriesModel = Categories(sequelize, Sequelize.DataTypes);
export const ProductsModel = Products(sequelize, Sequelize.DataTypes);
export const ProductsImagesModel = ProductsImages(sequelize, Sequelize.DataTypes);
export const ProductPropsModel = ProductProps(sequelize, Sequelize.DataTypes);
export const ProductPartsDiagramModel = ProductPartsDiagram(sequelize, Sequelize.DataTypes);
export const SparePartsModel = SpareParts(sequelize, Sequelize.DataTypes);
export const UsersModel = Users(sequelize, Sequelize.DataTypes);
export const BlogsModel = Blogs(sequelize, Sequelize.DataTypes);
export const ProjectsModel = Projects(sequelize, Sequelize.DataTypes);
export const ProjectsImagesModel = ProjectsImages(sequelize, Sequelize.DataTypes);

CategoriesModel.hasMany(ProductsModel);
ProductsModel.belongsTo(CategoriesModel);

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