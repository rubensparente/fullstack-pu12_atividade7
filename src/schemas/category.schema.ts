import z from "../../node_modules/zod/index.cjs";

const createCategorySchema = z.object({
    name: z.string().min(3, "O nome tem que ter mais que 3 caracteres").max(100, "O nome tem que ter até 100 caracteres !"),
    description: z.string().optional(),
})

const categoryParamsSchema = z.object({
    id: z.string().uuid("Formato de id de categoria invalido"),
})

// Schema mais flexível - aceita números ou strings e tem valores padrão
const categoryQueryPaginationSchema = z.object({
    page: z.union([z.string(), z.number()]).optional().default(1).transform(val => Number(val)).pipe(z.number().min(1, "Page deve ser no mínimo 1")),
    size: z.union([z.string(), z.number()]).optional().default(10).transform(val => Number(val)).pipe(z.number().min(1, "Size deve ser no mínimo 1").max(100, "Size deve ser no máximo 100"))
})

export {createCategorySchema, categoryParamsSchema, categoryQueryPaginationSchema}