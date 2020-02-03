import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./api/server/routes/productRoutes.js";
import ordersRoutes from "./api/server/routes/ordersRoutes";
import itemsRoutes from "./api/server/routes/itemsRoutes";
import tablesRoutes from "./api/server/routes/tablesRoutes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/tables", tablesRoutes);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Bem-Vindo a API Burguer Queen"
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

module.exports = app;