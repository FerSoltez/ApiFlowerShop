import { Router } from "express";
import commentController from "../controllers/CommentsController";

const router = Router();

router.post("/comments", commentController.createComment);
router.get("/comments", commentController.getComments);
router.get("/comments/:id_comment", commentController.getCommentById);
router.put("/comments/:id_comment", commentController.updateComment);
router.patch("/comments/:id_comment", commentController.partialUpdateComment as any);
router.delete("/comments/:id_comment", commentController.deleteComment);

export default router;