import { Request, Response } from "express";
import UnidadAprendizaje from "../models/UnidadesAp";

const unidadesApController = {
  createUnidadAprendizaje: async (req: Request, res: Response) => {
    try {
      const newUnidad = await UnidadAprendizaje.create(req.body);
      res.status(201).json(newUnidad);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getUnidadesAprendizaje: async (_req: Request, res: Response) => {
    try {
      const unidades = await UnidadAprendizaje.findAll();
      res.status(200).json(unidades);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getUnidadAprendizajeById: async (req: Request, res: Response) => {
    try {
      const unidad = await UnidadAprendizaje.findByPk(req.params.id);
      if (unidad) {
        res.status(200).json(unidad);
      } else {
        res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateUnidadAprendizaje: async (req: Request, res: Response) => {
    try {
      const [updated] = await UnidadAprendizaje.update(req.body, { where: { id_unidad: req.params.id } });
      if (updated) {
        const updatedUnidad = await UnidadAprendizaje.findByPk(req.params.id);
        res.status(200).json(updatedUnidad);
      } else {
        res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteUnidadAprendizaje: async (req: Request, res: Response) => {
    try {
      const deleted = await UnidadAprendizaje.destroy({ where: { id_unidad: req.params.id } });
      if (deleted) {
        res.status(200).json({ message: "Unidad de Aprendizaje eliminada exitosamente" });
      } else {
        res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateUnidadAprendizaje: async (req: Request, res: Response) => {
    try {
      const unidad = await UnidadAprendizaje.findByPk(req.params.id);
      if (!unidad) {
        return res.status(404).json({ message: "Unidad de Aprendizaje no encontrada" });
      }
      await UnidadAprendizaje.update(req.body, { where: { id_unidad: req.params.id } });
      const updatedUnidad = await UnidadAprendizaje.findByPk(req.params.id);
      res.status(200).json(updatedUnidad);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};

export default unidadesApController;
