import { Router } from 'express'
import TableController from '../Controllers/TablesController';

const tablesRoutes = Router()
tablesRoutes.get('/', TableController.getAllTables)
tablesRoutes.post('/', TableController.addTable)
tablesRoutes.get('/:id', TableController.getTable)
tablesRoutes.put('/:id', TableController.updatedTable)
tablesRoutes.delete('/:id', TableController.deleteTable)
export default tablesRoutes