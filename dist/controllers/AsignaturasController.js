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
const Asignaturas_1 = __importDefault(require("../models/Asignaturas"));
const UnidadesAp_1 = __importDefault(require("../models/UnidadesAp"));
const database_1 = require("../config/database");
const asignaturaController = {
    createAsignatura: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newAsignatura = yield Asignaturas_1.default.create(req.body);
            res.status(201).json(newAsignatura);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getAsignaturas: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const asignaturas = yield Asignaturas_1.default.findAll();
            res.status(200).json(asignaturas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getAsignaturaById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            console.log(`Buscando asignatura con id: ${id}`);
            // Buscar la asignatura por su ID
            const asignatura = yield Asignaturas_1.default.findByPk(id, {
                include: [{
                        model: UnidadesAp_1.default,
                        as: 'unidadesAp'
                    }]
            });
            if (!asignatura) {
                console.log(`Asignatura con id: ${id} no encontrada`);
                return res.status(404).json({ message: "Asignatura no encontrada" });
            }
            console.log(`Asignatura encontrada: ${JSON.stringify(asignatura)}`);
            res.status(200).json(asignatura);
        }
        catch (error) {
            console.error(`Error al obtener la asignatura con unidades: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }),
    updateAsignatura: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield Asignaturas_1.default.update(req.body, { where: { id_asignaturas: req.params.id } });
            if (updated) {
                const updatedAsignatura = yield Asignaturas_1.default.findByPk(req.params.id);
                res.status(200).json(updatedAsignatura);
            }
            else {
                res.status(404).json({ message: "Asignatura no encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteAsignatura: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield database_1.sequelize.transaction();
        try {
            const { id } = req.params;
            // Eliminar las unidades de aprendizaje asociadas a la asignatura
            const unidadesDeleted = yield UnidadesAp_1.default.destroy({
                where: { id_asignaturas: id },
                transaction
            });
            // Eliminar la asignatura
            const deleted = yield Asignaturas_1.default.destroy({
                where: { id_asignaturas: id },
                transaction
            });
            if (deleted) {
                yield transaction.commit();
                res.status(200).json({ message: "Asignatura y unidades eliminadas exitosamente" });
            }
            else {
                yield transaction.rollback();
                res.status(404).json({ message: "Asignatura no encontrada" });
            }
        }
        catch (error) {
            yield transaction.rollback();
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateAsignatura: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const asignatura = yield Asignaturas_1.default.findByPk(req.params.id);
            if (!asignatura) {
                return res.status(404).json({ message: "Asignatura no encontrada" });
            }
            yield Asignaturas_1.default.update(req.body, { where: { id_asignaturas: req.params.id } });
            const updatedAsignatura = yield Asignaturas_1.default.findByPk(req.params.id);
            res.status(200).json(updatedAsignatura);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = asignaturaController;
