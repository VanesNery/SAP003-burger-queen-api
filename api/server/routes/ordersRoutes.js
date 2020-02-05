import { Router } from 'express'
import OrderController from '../controllers/OrdersController';

const router = Router()
router.get('/', OrderController.getAllOrders)
router.get('/items', OrderController.getAllOrdersItems)
router.get('/items/:id', OrderController.getAllOrdersItems);
router.post('/', OrderController.addOrder);
router.post('/items', OrderController.addOrdersItems);
router.get('/:id', OrderController.getOrder);
router.put('/:id', OrderController.updatedOrder);
router.put('/items/:id', OrderController.updateOrdersItems);
router.delete('/:id', OrderController.deleteOrder);
router.delete('/items/:id', OrderController.deleteOrdersItems);
export default router