import type { Request, Response } from "express";

// Simulação de banco de dados
let products: any[] = [];

export class ProductController {
    findAll(req: Request, res: Response) {
        const { category } = req.validatedQuery;
        
        let filteredProducts = [...products];
        
        if (category) {
            filteredProducts = filteredProducts.filter(
                product => product.categoryId === category
            );
        }
        
        return res.json(filteredProducts);
    }

    findById(req: Request, res: Response) {
        const { id } = req.validatedParams;
        
        const product = products.find(p => p.id === id);
        
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        
        return res.json(product);
    }

    create(req: Request, res: Response) {
        const newProduct = {
            id: crypto.randomUUID(),
            ...req.validatedBody
        };
        
        products.push(newProduct);
        return res.status(201).json(newProduct);
    }

    update(req: Request, res: Response) {
        const { id } = req.validatedParams;
        const updateData = req.validatedBody;
        
        const productIndex = products.findIndex(p => p.id === id);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        
        const updatedProduct = {
            ...products[productIndex],
            ...updateData
        };
        
        products[productIndex] = updatedProduct;
        return res.json(updatedProduct);
    }

    delete(req: Request, res: Response) {
        const { id } = req.validatedParams;
        
        const productIndex = products.findIndex(p => p.id === id);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        
        products.splice(productIndex, 1);
        return res.status(204).send();
    }
}