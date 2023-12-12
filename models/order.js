'use strict';
const { Model } = require('sequelize');
const {Orderdetail} = require('./orderdetail'); 
const {Customer} = require('./customer');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define associations here
      Order.belongsTo(models.Customer, { foreignKey: 'customerId' });

      Order.hasMany(models.Orderdetail, {
        foreignKey: 'orderid' ,
        onDelete: 'CASCADE',
      });
    }
  }
  Order.init({
    totalprice: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER ,
    userId: DataTypes.INTEGER ,
    payment: DataTypes.INTEGER,
    refund: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'order', // Set the table name to match your schema
    updatedAt: false,
  });
  return Order;
};
