import { Router } from 'express'
import ItemsController from '../controllers/ItemsController';

const itemsRoutes = Router()
itemsRoutes.get('/', ItemsController.getAllItems)
itemsRoutes.post('/', ItemsController.addItem)
itemsRoutes.get('/:id', ItemsController.getItem)
itemsRoutes.put('/:id', ItemsController.updatedItem)
itemsRoutes.delete('/:id', ItemsController.deleteItem)
module.exports = itemsRoutes