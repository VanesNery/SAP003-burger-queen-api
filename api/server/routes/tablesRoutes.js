import { Router } from 'express';
import TablesController from '../controllers/TablesController';

const router = Router()
router.get('/', TablesController.getAllTables)
router.post('/', TablesController.addTable)
router.get('/:id', TablesController.getTable)
router.put('/:id', TablesController.updatedTable)
router.delete('/:id', TablesController.deleteTable)
export default router