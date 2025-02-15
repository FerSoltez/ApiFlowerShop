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
const Localidades_1 = __importDefault(require("../models/Localidades"));
const localidadController = {
    createLocalidad: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newLocalidad = yield Localidades_1.default.create(req.body);
            res.status(201).json(newLocalidad);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getAllLocalidades: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const localidades = yield Localidades_1.default.findAll();
            res.status(200).json(localidades);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getLocalidad: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const localidad = yield Localidades_1.default.findByPk(req.params.id);
            if (localidad) {
                res.status(200).json(localidad);
            }
            else {
                res.status(404).json({ message: "Localidad no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateLocalidad: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield Localidades_1.default.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedLocalidad = yield Localidades_1.default.findByPk(req.params.id);
                res.status(200).json(updatedLocalidad);
            }
            else {
                res.status(404).json({ message: "Localidad no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteLocalidad: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield Localidades_1.default.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Localidad eliminada exitosamente" });
            }
            else {
                res.status(404).json({ message: "Localidad no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateLocalidad: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const localidad = yield Localidades_1.default.findByPk(req.params.id);
            if (!localidad) {
                return res.status(404).json({ message: "Localidad no encontrada" });
            }
            yield Localidades_1.default.update(req.body, { where: { id: req.params.id } });
            const updatedLocalidad = yield Localidades_1.default.findByPk(req.params.id);
            res.status(200).json(updatedLocalidad);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = localidadController;
