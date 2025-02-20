import { Request, Response } from "express";
import Asignatura from "../models/Asignaturas";
import UnidadAp from "../models/UnidadesAp";


const asignaturaController = {
  createAsignatura: async (req: Request, res: Response) => {
    try {
      const newAsignatura = await Asignatura.create(req.body);
      res.status(201).json(newAsignatura);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getAsignaturas: async (_req: Request, res: Response) => {
    try {
      const asignaturas = await Asignatura.findAll();
      res.status(200).json(asignaturas);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getAsignaturaById: async (req: Request, res: Response) => {
    try {
      const asignatura = await Asignatura.findByPk(req.params.id);
      if (asignatura) {
        res.status(200).json(asignatura);
      } else {
        res.status(404).json({ message: "Asignatura no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateAsignatura: async (req: Request, res: Response) => {
    try {
      const [updated] = await Asignatura.update(req.body, { where: { id_asignatura: req.params.id } });
      if (updated) {
        const updatedAsignatura = await Asignatura.findByPk(req.params.id);
        res.status(200).json(updatedAsignatura);
      } else {
        res.status(404).json({ message: "Asignatura no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteAsignatura: async (req: Request, res: Response) => {
    try {
      const deleted = await Asignatura.destroy({ where: { id_asignatura: req.params.id } });
      if (deleted) {
        res.status(200).json({ message: "Asignatura eliminada exitosamente" });
      } else {
        res.status(404).json({ message: "Asignatura no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateAsignatura: async (req: Request, res: Response) => {
    try {
      const asignatura = await Asignatura.findByPk(req.params.id);
      if (!asignatura) {
        return res.status(404).json({ message: "Asignatura no encontrada" });
      }
      await Asignatura.update(req.body, { where: { id_asignatura: req.params.id } });
      const updatedAsignatura = await Asignatura.findByPk(req.params.id);
      res.status(200).json(updatedAsignatura);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getAsignaturaWithUnidades: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const asignatura = await Asignatura.findByPk(id, {
        include: [{ model: UnidadAp, as: "unidades" }],
      });

      if (!asignatura) {
        return res.status(404).json({ message: "Asignatura no encontrada" });
      }

      res.status(200).json(asignatura);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default asignaturaController;
