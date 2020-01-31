import express from "express";
import cors from "cors";
import productRoutes from "./Routes/productRoutes";
import ordersRoutes from "./Routes/ordersRoutes";
import itemsRoutes from "./Routes/itemsRoutes";
import tablesRoutes from "./Routes/tablesRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

export default app;
