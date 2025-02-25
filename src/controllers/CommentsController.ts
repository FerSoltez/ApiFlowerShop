import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comments";
import User from "../models/Userss"

const commentController = {
  createComment: async (req: Request, res: Response) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getComments: async (_req: Request, res: Response) => {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getCommentById: async (req: Request, res: Response) => {
    const { id_comment } = req.params;

    try {
      const comment = await Comment.findByPk(id_comment, {
        include: [{ model: User, as: 'user' }]
      });
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateComment: async (req: Request, res: Response) => {
    try {
      const [updated] = await Comment.update(req.body, { where: { id_comment: req.params.id_comment } });
      if (updated) {
        const updatedComment = await Comment.findByPk(req.params.id_comment);
        res.status(200).json(updatedComment);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteComment: async (req: Request, res: Response) => {
    try {
      const deleted = await Comment.destroy({ where: { id_comment: req.params.id_comment } });
      if (deleted) {
        res.status(200).json({ message: "Comment deleted successfully" });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateComment: async (req: Request, res: Response, next: NextFunction) => {    try {
      const comment = await Comment.findByPk(req.params.id_comment);
      if (!comment) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }
      await Comment.update(req.body, { where: { id_comment: req.params.id_comment } });
      const updatedComment = await Comment.findByPk(req.params.id_comment);
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};

export default commentController;