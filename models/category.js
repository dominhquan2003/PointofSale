'use strict';
const { Model } = require('sequelize');
const {Product} = require('./product')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  Category.init({
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
  }, {
    sequelize,
    tableName: 'category',
    modelName: 'Category',
    createdAt: false,
    updatedAt: false,
  },
  );
 

  return Category;
};
