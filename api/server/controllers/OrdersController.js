import orderService from "../services/orderService";
import Utils from "../utils/Utils";

const util = new Utils();

class OrdersController {
  static async getAllOrders(req, res) {
    try {
      const allOrders = await orderService.getAllOrders();
      if (allOrders.length > 0) {
        util.setSuccess(200, "Orders retrieved", allOrders);
      } else {
        util.setSuccess(200, "No Order found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addOrder(req, res) {
    if (!req.body.id_table || !req.body.Status) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newOrder = req.body;
    try {
      const createdOrder = await orderService.addOrders(newOrder);
      util.setSuccess(201, "Order Added!", createdOrder);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedOrder(req, res) {
    const alteredOrder = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateOrder = await orderService.updateOrders(id, alteredOrder);
      if (!updateOrder) {
        util.setError(404, `Cannot find Order with the id: ${id}`);
      } else {
        util.setSuccess(200, "Order updated", updateOrder);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theOrder = await orderService.getOrders(id);

      if (!theOrder) {
        util.setError(404, `Cannot find Order with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Order", theOrder);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteOrder(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const OrderToDelete = await orderService.deleteOrders(id);

      if (OrderToDelete) {
        util.setSuccess(200, "Order deleted");
      } else {
        util.setError(404, `Order with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getOrderItems(req, res) {
    const id = req.params.id;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res)
    }
    try {
      const theItems = await orderService.getOrderItems(id);
      if (!theItens) {
        util.setError(404, `Cannot find Order itens with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Order itens', theItems)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async addOrdersItems(req, res) {
    const id = req.params.id;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res)
    }
  }

  static async getAllOrdersItems(req, res) {
    try {
      const allOrdersItems = await OrderService.getallOrderItems()
      if (allOrdersItems.length > 0) {
        util.setSuccess(200, 'Order itens retrieved', allOrdersItems)
      } else {
        util.setSuccess(200, 'No Order itens found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
  static async updateOrdersItems(req, res) {
    const alteredOrderItem = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrderItem = await OrderService.updateOrderItem(id, alteredOrderItem)
      if (!updateOrderItem) {
        util.setError(404, `Cannot find order with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Order item updated', updateOrderItem)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrdersItems(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderItemToDelete = await OrderService.deleteOrderItem(id);

      if (orderItemToDelete) {
        util.setSuccess(200, 'Order item deleted')
      } else {
        util.setError(404, `Order item with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrdersController;
