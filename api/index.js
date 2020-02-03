import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './server/routes/productRoutes';
import ordersRoutes from './server/routes/ordersRoutes';
import tablesRoutes from './server/routes/tablesRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/tables', tablesRoutes);

app.get('*', (req, res) => res.status(200).send({
    message: 'Esta é a API do Burguer Queen'
}));

app.listen(port, () => {
    console.log(`app is running on PORT ${port}`)
});

export default app;