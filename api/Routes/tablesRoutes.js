import { Router } from 'express'
import TableController from '../Controllers/TablesController';

const router = Router()
router.get('/', TableController.getAllTables)
router.post('/', TableController.addTable)
router.get('/:id', TableController.getaddTable)
router.put('/:id', TableController.updatedTable)
router.delete('/:id', TableController.deleteTable)
export default router