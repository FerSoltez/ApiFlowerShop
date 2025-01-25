import { Router } from 'express';
import productsController from '../controllers/ProductsController';

const router = Router();

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProducts);
router.post('/products', productsController.createProducts);
router.put('/products/:id', productsController.updateProducts);
router.delete('/products/:id', productsController.deleteProducts);
router.patch('/products/:id', productsController.partialUpdateProducts as any); // Si necesitas actualizaciones parciales

export default router;
