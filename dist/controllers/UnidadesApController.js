"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnidadesAp_1 = __importDefault(require("../models/UnidadesAp"));
const unidadesApController = {
    createUnidadAprendizaje: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUnidad = yield UnidadesAp_1.default.create(req.body);
            res.status(201).json(newUnidad);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getUnidadesAprendizaje: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unidades = yield UnidadesAp_1.default.findAll();
            res.status(200).json(unidades);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getUnidadAprendizajeById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unidad = yield UnidadesAp_1.default.findByPk(req.params.id);
            if (unidad) {
                res.status(200).json(unidad);
            }
            else {
                res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateUnidadAprendizaje: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield UnidadesAp_1.default.update(req.body, { where: { id_unidad: req.params.id } });
            if (updated) {
                const updatedUnidad = yield UnidadesAp_1.default.findByPk(req.params.id);
                res.status(200).json(updatedUnidad);
            }
            else {
                res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteUnidadAprendizaje: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield UnidadesAp_1.default.destroy({ where: { id_unidad: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Unidad de Aprendizaje eliminada exitosamente" });
            }
            else {
                res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateUnidadAprendizaje: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unidad = yield UnidadesAp_1.default.findByPk(req.params.id);
            if (!unidad) {
                return res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
            }
            yield UnidadesAp_1.default.update(req.body, { where: { id_unidad: req.params.id } });
            const updatedUnidad = yield UnidadesAp_1.default.findByPk(req.params.id);
            res.status(200).json(updatedUnidad);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = unidadesApController;
