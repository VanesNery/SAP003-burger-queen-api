'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    clientName: DataTypes.STRING,
    id_table: DataTypes.INTEGER,
    time: DataTypes.DATE,
    finalTime: DataTypes.DATE,
    total: DataTypes.DECIMAL(5,2),
    status: DataTypes.STRING,
  }, {});
  orders.associate = function(models) {
    orders.hasMany(models.items);
    orders.belongsTo(models.tables);
  };
  return orders;
};