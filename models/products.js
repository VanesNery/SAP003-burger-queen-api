'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(5,2),
    type: DataTypes.STRING,
    isextras: DataTypes.BOOLEAN,
    hasoptions: DataTypes.STRING
  }, {});
  products.associate = function(models) {
    products.hasMany(models.items);
  };
  return products;
};
