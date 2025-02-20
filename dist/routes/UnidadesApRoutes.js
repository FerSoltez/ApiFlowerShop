"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UnidadesApController_1 = __importDefault(require("../controllers/UnidadesApController"));
const router = (0, express_1.Router)();
router.post("/unidades-aprendizaje", UnidadesApController_1.default.createUnidadAprendizaje);
router.get("/unidades-aprendizaje", UnidadesApController_1.default.getUnidadesAprendizaje);
router.get("/unidades-aprendizaje/:id", UnidadesApController_1.default.getUnidadAprendizajeById);
router.put("/unidades-aprendizaje/:id", UnidadesApController_1.default.updateUnidadAprendizaje);
router.patch("/unidades-aprendizaje/:id", UnidadesApController_1.default.updateUnidadAprendizaje);
router.delete("/unidades-aprendizaje/:id", UnidadesApController_1.default.deleteUnidadAprendizaje);
exports.default = router;
