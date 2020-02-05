import database from "../src/models";

class orderService {
  static async getAllOrders() {
    try {
      return await database.orders.findAll({
        include: [
          { model: database.tables, as: "tables" },
          { model: database.products, as: "products", duplicating: true }
        ]
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addOrders(newOrders) {
    try {
      return await database.orders.create(newOrders);
    } catch (error) {
      throw error;
    }
  }

  static async updateOrders(id, updateOrders) {
    try {
      const ordersToUpdate = await database.orders.findOne({
        where: { id: Number(id) }
      });

      if (ordersToUpdate) {
        await database.orders.update(updateOrders, {
          where: { id: Number(id) }
        });

        return updateOrders;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOrders(id) {
    try {
      const theOrders = await database.items.findOne({
        where: { id: Number(id) }
      });

      return theOrders;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrders(id) {
    try {
      const ordersToDelete = await database.orders.findOne({
        where: { id: Number(id) }
      });

      if (ordersToDelete) {
        const deletedOrders = await database.orders.destroy({
          where: { id: Number(id) }
        });
        return deletedOrders;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOrderItems(id) {
    try {
      const theItens = await database.items.findAll({
        where: { OrderId: Number(id) }
      })
      return theItens;
    } catch (error) {
      throw error
    }
  }

  static async updateOrderItem(id, updateOrdersItems) {
    try {
      const itemToUpdate = await database.orders.findOne({
        where: { id: Number(id) }
      })
      if (itemToUpdate) {
        await database.orders.update(updateOrdersItems, { where: { id: Number(id) } })
        return updateOrderItem;
      }
      return null;
    } catch (error) {
      throw error
    }
  }
  static async deleteOrderItem(id) {
    try {
      const itemToDelete = await database.items.findOne({ where: { id: Number(id) } })
      if (itemToDelete) {
        const deletedOrderItem = await database.items.destroy({
          where: { id: Number(id) }
        })
        return deletedOrderItem;
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default orderService;