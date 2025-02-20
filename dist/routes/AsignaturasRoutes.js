"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AsignaturasController_1 = __importDefault(require("../controllers/AsignaturasController"));
const router = (0, express_1.Router)();
router.post("/asignaturas", AsignaturasController_1.default.createAsignatura);
router.get("/asignaturas", AsignaturasController_1.default.getAsignaturas);
router.get("/asignaturas/:id", AsignaturasController_1.default.getAsignaturaById);
router.put("/asignaturas/:id", AsignaturasController_1.default.updateAsignatura);
router.patch("/asignaturas/:id", AsignaturasController_1.default.updateAsignatura);
router.delete("/asignaturas/:id", AsignaturasController_1.default.deleteAsignatura);
router.get("/asignaturas/:id/unidades", AsignaturasController_1.default.getAsignaturaWithUnidades);
exports.default = router;
