"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LocalidadesController_1 = __importDefault(require("../controllers/LocalidadesController"));
const router = (0, express_1.Router)();
router.post("/localidades", LocalidadesController_1.default.createLocalidad);
router.get("/localidades", LocalidadesController_1.default.getAllLocalidades);
router.get("/localidades/:id", LocalidadesController_1.default.getLocalidad);
router.put("/localidades/:id", LocalidadesController_1.default.updateLocalidad);
router.patch("/localidades/:id", LocalidadesController_1.default.partialUpdateLocalidad);
router.delete("/localidades/:id", LocalidadesController_1.default.deleteLocalidad);
exports.default = router;
