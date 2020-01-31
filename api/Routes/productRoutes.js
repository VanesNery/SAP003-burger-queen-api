import { Router } from 'express'
import ProductController from '../Controllers/ProductController';

const router = Router()
router.get('/products', ProductController.getAll)
router.post('/products', ProductController.addProduct)
router.get('/products/:productid', ProductController.getProduct)
router.put('/products/:productid', ProductController.updatedProduct)
router.delete('/products/:productid', ProductController.deleteProduct)
export default router