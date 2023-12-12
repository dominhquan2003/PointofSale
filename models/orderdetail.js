'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orderdetail extends Model {
    static associate(models) {
      Orderdetail.belongsTo(models.Order, { foreignKey: 'orderid' });
      Orderdetail.belongsTo(models.Product, { foreignKey: 'productid' });

    }
  }
  Orderdetail.init({
    orderid:DataTypes.INTEGER,
    productid:DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Orderdetail',
    tableName: 'orderdetail', // Set the table name to match your schema
    createdAt: false,
    updatedAt: false,
  });
  return Orderdetail;
};
