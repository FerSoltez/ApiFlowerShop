"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const router = (0, express_1.Router)();
router.get('/products', ProductsController_1.default.getAllProducts);
router.get('/products/:id', ProductsController_1.default.getProducts);
router.post('/products', ProductsController_1.default.createProducts);
router.put('/products/:id', ProductsController_1.default.updateProducts);
router.delete('/products/:id', ProductsController_1.default.deleteProducts);
router.patch('/products/:id', ProductsController_1.default.partialUpdateProducts); // Si necesitas actualizaciones parciales
exports.default = router;
