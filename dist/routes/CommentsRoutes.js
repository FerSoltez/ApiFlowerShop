"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentsController_1 = __importDefault(require("../controllers/CommentsController"));
const router = (0, express_1.Router)();
router.post("/comments", CommentsController_1.default.createComment);
router.get("/comments", CommentsController_1.default.getComments);
router.get("/comments/:id_comment", CommentsController_1.default.getCommentById);
router.put("/comments/:id_comment", CommentsController_1.default.updateComment);
router.patch("/comments/:id_comment", CommentsController_1.default.partialUpdateComment);
router.delete("/comments/:id_comment", CommentsController_1.default.deleteComment);
exports.default = router;
