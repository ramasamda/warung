'use strict';
const { Model } = require('sequelize');
const { encryptPassword } = require('../helper/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // define association here
    }
  }

  Item.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(Item, options) {
        console.log("Sebelum hash:", Item.type);
        Item.type = encryptPassword(Item.type);
        console.log("Sesudah hash:", Item.type);
      }
    },
    sequelize,
    modelName: 'Item',
  });

  return Item;
};
