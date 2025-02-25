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
const Comments_1 = __importDefault(require("../models/Comments"));
const Userss_1 = __importDefault(require("../models/Userss"));
const commentController = {
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newComment = yield Comments_1.default.create(req.body);
            res.status(201).json(newComment);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getComments: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield Comments_1.default.findAll();
            res.status(200).json(comments);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getCommentById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_comment } = req.params;
        try {
            const comment = yield Comments_1.default.findByPk(id_comment, {
                include: [{ model: Userss_1.default, as: 'user' }]
            });
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json(comment);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield Comments_1.default.update(req.body, { where: { id_comment: req.params.id_comment } });
            if (updated) {
                const updatedComment = yield Comments_1.default.findByPk(req.params.id_comment);
                res.status(200).json(updatedComment);
            }
            else {
                res.status(404).json({ message: "Comment not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield Comments_1.default.destroy({ where: { id_comment: req.params.id_comment } });
            if (deleted) {
                res.status(200).json({ message: "Comment deleted successfully" });
            }
            else {
                res.status(404).json({ message: "Comment not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateComment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comment = yield Comments_1.default.findByPk(req.params.id_comment);
            if (!comment) {
                return res.status(404).json({ message: "Comentario no encontrado" });
            }
            yield Comments_1.default.update(req.body, { where: { id_comment: req.params.id_comment } });
            const updatedComment = yield Comments_1.default.findByPk(req.params.id_comment);
            res.status(200).json(updatedComment);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = commentController;
