import type { Request, Response } from "express";

// Simulação de banco de dados
let categories: any[] = [];

export class CategoryController {
    findAll(req: Request, res: Response) {
        // Os dados já foram validados pelo middleware
        const page = req.validatedQuery?.page || 1;
        const size = req.validatedQuery?.size || 10;
        
        console.log(`📄 Listando categorias - Página: ${page}, Tamanho: ${size}`);
        
        // Calcular índices para paginação
        const start = (page - 1) * size;
        const end = start + size;
        const paginatedCategories = categories.slice(start, end);
        
        return res.json({
            data: paginatedCategories,
            page: Number(page),
            size: Number(size),
            total: categories.length,
            totalPages: Math.ceil(categories.length / size)
        });
    }
    
    findById(req: Request, res: Response) {
        const { id } = req.validatedParams;
        const category = categories.find(c => c.id === id);
        
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        
        return res.json(category);
    }
    
    create(req: Request, res: Response) {
        const newCategory = {
            id: crypto.randomUUID(),
            ...req.validatedBody
        };
        
        categories.push(newCategory);
        console.log(`✅ Categoria criada: ${newCategory.name} (${newCategory.id})`);
        return res.status(201).json(newCategory);
    }
    
    update(req: Request, res: Response) {
        const { id } = req.validatedParams;
        const categoryIndex = categories.findIndex(c => c.id === id);
        
        if (categoryIndex === -1) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        
        const updatedCategory = {
            ...categories[categoryIndex],
            ...req.body
        };
        
        categories[categoryIndex] = updatedCategory;
        console.log(`✏️ Categoria atualizada: ${updatedCategory.name} (${id})`);
        return res.json(updatedCategory);
    }
    
    delete(req: Request, res: Response) {
        const { id } = req.validatedParams;
        const categoryIndex = categories.findIndex(c => c.id === id);
        
        if (categoryIndex === -1) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        
        const deletedCategory = categories[categoryIndex];
        categories.splice(categoryIndex, 1);
        console.log(`🗑️ Categoria deletada: ${deletedCategory.name} (${id})`);
        return res.status(204).send();
    }
}