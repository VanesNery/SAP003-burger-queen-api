'use strict';
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    id_product: DataTypes.INTEGER,
    id_orders: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    options: DataTypes.STRING,
    id_extras: DataTypes.INTEGER
  }, {});
  items.associate = function(models) {
    // associations can be defined here
  };
  return items;
};