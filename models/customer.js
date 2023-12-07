'use strict';
const { Model } = require('sequelize');
const {Order} = require('./order') ; 
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, {
        foreignKey: 'customerId' ,
        onDelete: 'CASCADE',
      });
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customer', // Set the table name to match your schema
    createdAt: false,
    updatedAt: false,
  });
  return Customer;
};
