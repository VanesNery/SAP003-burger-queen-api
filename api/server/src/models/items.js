"use strict";
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      productId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      options: DataTypes.STRING
    },
    {}
  );
  items.associate = function(models) {
    // associations can be defined here
  };
  return items;
};
