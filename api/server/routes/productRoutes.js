import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router()
router.get('/', ProductController.getAllProducts)
router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.getProducts)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)
export default router;