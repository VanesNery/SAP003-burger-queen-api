import { Router } from 'express'
import OrderController from '../Controllers/OrderController';

const router = Router()
router.get('/Orders', OrderController.getAll)
router.post('/Orders', OrderController.addOrder)
router.get('/Orders/:Orderid', OrderController.getOrder)
router.put('/Orders/:Orderid', OrderController.updatedOrder)
router.delete('/Orders/:Orderid', OrderController.deleteOrder)
export default router