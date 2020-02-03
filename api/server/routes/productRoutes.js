import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router()
productRoutes.get('/', ProductController.getAllProducts)
productRoutes.post('/', ProductController.addProduct)
productRoutes.get('/:id', ProductController.getProduct)
productRoutes.put('/:id', ProductController.updatedProduct)
productRoutes.delete('/:id', ProductController.deleteProduct)
module.exports = productRoutes