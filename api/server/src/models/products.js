"use strict";
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    "products",
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      isExtras: DataTypes.BOOLEAN,
      hasOptions: DataTypes.BOOLEAN,
      type: DataTypes.STRING
    },
    {}
  );
  products.associate = function(models) {
    products.hasMany(models.items);
    products.hasMany(models.products);
  };
  return products;
};
