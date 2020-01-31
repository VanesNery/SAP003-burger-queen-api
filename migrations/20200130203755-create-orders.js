'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientName: {
        type: Sequelize.STRING
      },
      desk: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DATE
      },
      finalTime: {
        type: Sequelize.DATE
      },
      totalPrice: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};