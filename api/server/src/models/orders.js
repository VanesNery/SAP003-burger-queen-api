"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      clientName: DataTypes.STRING,
      tableId: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      time: DataTypes.DATE,
      finalTime: DataTypes.DATE
    },
    {}
  );
  orders.associate = function(models) {
    orders.hasMany(models.items);
    orders.belongsTo(models.tables);
  };
  return orders;
};
