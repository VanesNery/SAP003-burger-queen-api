import { Router } from 'express'
import OrdersController from '../controllers/OrdersController';

const router = Router()
router.get('/', OrdersController.getAllOrders)
router.get('/items/:id', OrdersController.getAllOrdersItems);
router.post('/', OrdersController.addOrder);
router.post('/items', OrdersController.addOrdersItems);
router.get('/:id', OrdersController.getOrder);
router.put('/:id', OrdersController.updatedOrder);
router.put('/items/:id', OrdersController.updateOrdersItems);
router.delete('/:id', OrdersController.deleteOrder);
router.delete('/items/:id', OrdersController.deleteOrdersItems);
export default router