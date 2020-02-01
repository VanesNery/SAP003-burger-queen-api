'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    type: DataTypes.STRING,
    isExtras: DataTypes.BOOLEAN,
    hasOptions: DataTypes.STRING
  }, {});
  products.associate = function(models) {
    products.hasMany(models.items);
  };
  return products;
};