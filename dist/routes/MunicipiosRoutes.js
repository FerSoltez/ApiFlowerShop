"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MunicipiosController_1 = __importDefault(require("../controllers/MunicipiosController"));
const router = (0, express_1.Router)();
router.post("/municipios", MunicipiosController_1.default.createMunicipio);
router.get("/municipios", MunicipiosController_1.default.getAllMunicipios);
router.get("/municipios/:id", MunicipiosController_1.default.getMunicipio);
router.put("/municipios/:id", MunicipiosController_1.default.updateMunicipio);
router.patch("/municipios/:id", MunicipiosController_1.default.partialUpdateMunicipio);
router.delete("/municipios/:id", MunicipiosController_1.default.deleteMunicipio);
exports.default = router;
