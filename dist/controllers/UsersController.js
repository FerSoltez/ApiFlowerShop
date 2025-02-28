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
const Userss_1 = __importDefault(require("../models/Userss"));
const Comments_1 = __importDefault(require("../models/Comments"));
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Encriptar la contraseña
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            const newUser = yield Userss_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getUsers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield Userss_1.default.findAll();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getUserLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            console.log(`Buscando usuario con email: ${email}`);
            // Buscar el usuario por su email
            const user = yield Userss_1.default.findOne({
                where: { email },
                include: [{
                        model: Comments_1.default,
                        as: 'comments'
                    }]
            });
            if (!user) {
                console.log(`Usuario con email: ${email} no encontrado`);
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            // Verificar la contraseña
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                console.log(`Contraseña incorrecta para el usuario con email: ${email}`);
                // Restar un intento
                user.attempts -= 1;
                yield user.save();
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }
            console.log(`Usuario encontrado: ${JSON.stringify(user)}`);
            res.status(200).json(user);
        }
        catch (error) {
            console.error(`Error al obtener el usuario con comentarios: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield Userss_1.default.update(req.body, { where: { user_id: req.params.user_id } });
            if (updated) {
                const updatedUser = yield Userss_1.default.findByPk(req.params.user_id);
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield database_1.sequelize.transaction();
        try {
            const { user_id } = req.params;
            // Eliminar los comentarios asociados al usuario
            const commentsDeleted = yield Comments_1.default.destroy({
                where: { id_user: user_id },
                transaction
            });
            // Eliminar el usuario
            const deleted = yield Userss_1.default.destroy({
                where: { user_id: user_id },
                transaction
            });
            if (deleted) {
                yield transaction.commit();
                res.status(200).json({ message: "Usuario y comentarios eliminados exitosamente" });
            }
            else {
                yield transaction.rollback();
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
        catch (error) {
            yield transaction.rollback();
            res.status(500).json({ error: error.message });
        }
    }),
    deleteAllData: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield database_1.sequelize.transaction();
        try {
            // Eliminar todos los comentarios
            yield Comments_1.default.destroy({
                where: {},
                transaction
            });
            // Eliminar todos los usuarios
            yield Userss_1.default.destroy({
                where: {},
                transaction
            });
            yield transaction.commit();
            res.status(200).json({ message: "Todos los datos eliminados exitosamente" });
        }
        catch (error) {
            yield transaction.rollback();
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield Userss_1.default.findByPk(req.params.user_id);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            yield Userss_1.default.update(req.body, { where: { user_id: req.params.user_id } });
            const updatedUser = yield Userss_1.default.findByPk(req.params.user_id);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = userController;
