import express from "express";
import { categoryRouter } from "./routers/category.router.js";
import { productRouter } from "./routers/product.router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/category", categoryRouter);
app.use("/products", productRouter);

// Rota de boas-vindas
app.get("/", (req, res) => {
    res.json({ 
        message: "API de Categorias e Produtos",
        endpoints: {
            categories: ["GET /category", "GET /category/:id", "POST /category", "PUT /category/:id", "DELETE /category/:id"],
            products: ["GET /products", "GET /products/:id", "POST /products", "PUT /products/:id", "DELETE /products/:id"]
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});