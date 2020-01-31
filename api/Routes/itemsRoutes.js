import { Router } from 'express'
import ItemController from '../Controllers/ItemsController';

const router = Router()
router.get('/', ItemController.getAllItems)
router.post('/', ItemController.addItem)
router.get('/:id', ItemController.getaddItem)
router.put('/:id', ItemController.updatedItem)
router.delete('/:id', ItemController.deleteItem)
export default router