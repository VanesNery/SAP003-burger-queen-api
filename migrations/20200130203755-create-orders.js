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
      id_table: {
        type: Sequelize.INTEGER,
        references: {model: 'tables', key: 'id'}
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
  down: (queryInterface) => {
    return queryInterface.dropTable('orders');
  }
};