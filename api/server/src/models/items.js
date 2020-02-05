"use strict";
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      ProductId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
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
