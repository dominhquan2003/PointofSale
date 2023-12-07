'use strict';
const { Model } = require('sequelize');
const {Category} = require('./category');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });

      Product.hasMany(models.Orderdetail, {
        foreignKey: 'productid' ,
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    importprice: DataTypes.INTEGER,
    retailprice: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    image: DataTypes.STRING,
    categoryid: DataTypes.INTEGER,
  
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product', // Set the table name to match your schema
    updatedAt: false,
  });
  
  return Product;
};
