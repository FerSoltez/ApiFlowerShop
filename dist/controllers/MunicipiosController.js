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
const Municipios_1 = __importDefault(require("../models/Municipios"));
const municipioController = {
    createMunicipio: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMunicipio = yield Municipios_1.default.create(req.body);
            res.status(201).json(newMunicipio);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getAllMunicipios: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const municipios = yield Municipios_1.default.findAll();
            res.status(200).json(municipios);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getMunicipio: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const municipio = yield Municipios_1.default.findByPk(req.params.id);
            if (municipio) {
                res.status(200).json(municipio);
            }
            else {
                res.status(404).json({ message: "Municipio no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateMunicipio: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield Municipios_1.default.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedMunicipio = yield Municipios_1.default.findByPk(req.params.id);
                res.status(200).json(updatedMunicipio);
            }
            else {
                res.status(404).json({ message: "Municipio no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteMunicipio: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield Municipios_1.default.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Municipio eliminado exitosamente" });
            }
            else {
                res.status(404).json({ message: "Municipio no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateMunicipio: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const municipio = yield Municipios_1.default.findByPk(req.params.id);
            if (!municipio) {
                return res.status(404).json({ message: "Municipio no encontrado" });
            }
            yield Municipios_1.default.update(req.body, { where: { id: req.params.id } });
            const updatedMunicipio = yield Municipios_1.default.findByPk(req.params.id);
            res.status(200).json(updatedMunicipio);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = municipioController;
