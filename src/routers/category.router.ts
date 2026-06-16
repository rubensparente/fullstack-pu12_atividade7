import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { validateData } from "../middlewares/validateData.js";
import { 
    createCategorySchema, 
    categoryParamsSchema, 
    categoryQueryPaginationSchema 
} from "../schemas/category.schema.js";

const router = Router();
const categoryController = new CategoryController();

// GET /category - Listar categorias com paginação
router.get('/', 
    validateData(categoryQueryPaginationSchema, 'query'), 
    (req, res) => categoryController.findAll(req, res)
);

// GET /category/:id - Buscar categoria por ID
router.get('/:id', 
    validateData(categoryParamsSchema, 'params'), 
    (req, res) => categoryController.findById(req, res)
);

// POST /category - Criar nova categoria
router.post('/', 
    validateData(createCategorySchema, 'body'), 
    (req, res) => categoryController.create(req, res)
);

// PUT /category/:id - Atualizar categoria
router.put('/:id', 
    validateData(categoryParamsSchema, 'params'), 
    (req, res) => categoryController.update(req, res)
);

// DELETE /category/:id - Remover categoria
router.delete('/:id', 
    validateData(categoryParamsSchema, 'params'), 
    (req, res) => categoryController.delete(req, res)
);

export { router as categoryRouter };