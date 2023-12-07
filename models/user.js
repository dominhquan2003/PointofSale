'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    role: DataTypes.STRING,
    address: DataTypes.STRING,
    avatar: DataTypes.STRING,
    lock_status: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User', // Set the table name to match your schema
    updatedAt: false,

  });
  return User;
};
