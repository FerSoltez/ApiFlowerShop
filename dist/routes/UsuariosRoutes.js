"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = __importDefault(require("../controllers/UsuariosController"));
const router = (0, express_1.Router)();
router.post("/usuarios", UsuariosController_1.default.createUsuario);
router.get("/usuarios", UsuariosController_1.default.getAllUsuarios);
router.get("/usuarios/:id", UsuariosController_1.default.getUsuario);
router.put("/usuarios/:id", UsuariosController_1.default.updateUsuario);
router.patch("/usuarios/:id", UsuariosController_1.default.partialUpdateUsuario);
router.delete("/usuarios/:id", UsuariosController_1.default.deleteUsuario);
exports.default = router;
