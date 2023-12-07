'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Account.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'Account', // Set the table name to match your schema
    createdAt: false,
    updatedAt: false,
  });
  return Account;
};
