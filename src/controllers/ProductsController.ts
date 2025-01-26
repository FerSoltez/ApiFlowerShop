import { Request, Response } from 'express';
import Products from '../models/Products';

const productsController = {
  createProducts: async (req: Request, res: Response) => {
    try {
      const newProducts = await Products.create(req.body);
      res.status(201).json(newProducts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Products.findAll();
      res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  },

  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await Products.findByPk(req.params.id);
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  },

  updateProducts: async (req: Request, res: Response) => {
    try {
      const [updated] = await Products.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const updatedProducts = await Products.findByPk(req.params.id);
        res.status(200).json(updatedProducts);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteProducts: async (req: Request, res: Response) => {
    try {
      const deleted = await Products.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateProducts: async (req: Request, res: Response) => {
    try {
      const products = await Products.findByPk(req.params.id);
      if (!products) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      await Products.update(req.body, { where: { id: req.params.id } });

      const updatedProducts = await Products.findByPk(req.params.id);
      res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default productsController;
