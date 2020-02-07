import { Router } from 'express';
import TablesController from '../controllers/TablesController';

const router = Router()
router.get('/', TablesController.getAllTables)
router.post('/', TablesController.addTable)
router.get('/:id', TablesController.getTables)
router.put('/:id', TablesController.updateTable)
router.delete('/:id', TablesController.deleteTable)
export default router