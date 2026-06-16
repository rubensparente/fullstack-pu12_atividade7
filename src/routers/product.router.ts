import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { validateData } from "../middlewares/validateData.js";
import { 
    createProductSchema, 
    productParamsSchema, 
    productQuerySchema 
} from "../schemas/product.schema.js";

const router = Router();
const productController = new ProductController();

// GET /products - Listar produtos com filtro opcional
router.get('/', 
    validateData(productQuerySchema, 'query'), 
    (req, res) => productController.findAll(req, res)
);

// GET /products/:id - Buscar produto por ID
router.get('/:id', 
    validateData(productParamsSchema, 'params'), 
    (req, res) => productController.findById(req, res)
);

// POST /products - Criar novo produto
router.post('/', 
    validateData(createProductSchema, 'body'), 
    (req, res) => productController.create(req, res)
);

// PUT /products/:id - Atualizar produto
router.put('/:id', 
    validateData(productParamsSchema, 'params'),
    validateData(createProductSchema, 'body'),
    (req, res) => productController.update(req, res)
);

// DELETE /products/:id - Remover produto
router.delete('/:id', 
    validateData(productParamsSchema, 'params'), 
    (req, res) => productController.delete(req, res)
);

export { router as productRouter };