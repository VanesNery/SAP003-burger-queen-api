import tablesService from "../services/tablesService";
import Utils from "../utils/Utils";

const util = new Utils();

class TablesController {
  static async getAllTables(req, res) {
    try {
      const allTables = await tablesService.getAllTables();
      if (allTables.length > 0) {
        util.setSuccess(200, "Tables retrieved", allTables);
      } else {
        util.setSuccess(200, "No Table found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addTable(req, res) {
    if (!req.body.number) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newTable = req.body;
    try {
      const createdTable = await tablesService.addTable(newTable);
      util.setSuccess(201, "Table Added!", createdTable);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateTable(req, res) {
    const alteredTable = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateTable = await tablesService.updateTable(id, alteredTable);
      if (!updateTable) {
        util.setError(404, `Cannot find Table with the id: ${id}`);
      } else {
        util.setSuccess(200, "Table updated", updateTable);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getTables(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theTable = await tablesService.getTables(id);

      if (!theTable) {
        util.setError(404, `Cannot find Table with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Table", theTable);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteTable(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const TableToDelete = await tablesService.deleteTable(id);

      if (TableToDelete) {
        util.setSuccess(200, "Table deleted");
      } else {
        util.setError(404, `Table with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default TablesController;