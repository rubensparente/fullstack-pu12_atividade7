import z from "../../node_modules/zod/index.cjs";

const createProductSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    price: z.number().positive("O preço deve ser um valor positivo"),
    categoryId: z.string().uuid("O categoryId deve ser um UUID válido")
});

const productParamsSchema = z.object({
    id: z.string().uuid("Formato de id de produto inválido")
});

const productQuerySchema = z.object({
    category: z.string().uuid("O filtro de categoria deve ser um UUID válido").optional()
});

export { createProductSchema, productParamsSchema, productQuerySchema };