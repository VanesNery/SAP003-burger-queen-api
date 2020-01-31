import models from '../../models/index';

const getAll = async (req, res) => {
    const orders = await models.orders.findAll({raw: true});
    res.json(orders);
};

export default {
    getAll
}