"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: "products", key: "id" }
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: { model: "orders", key: "id" }
      },
      extrasId: {
        type: Sequelize.INTEGER,
        references: { model: "products", key: "id" }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      options: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("items");
  }
};
