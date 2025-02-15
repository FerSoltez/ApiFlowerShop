import { Request, Response } from "express";
import Localidad from "../models/Localidades";

const localidadController = {
  createLocalidad: async (req: Request, res: Response) => {
    try {
      const newLocalidad = await Localidad.create(req.body);
      res.status(201).json(newLocalidad);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getAllLocalidades: async (req: Request, res: Response) => {
    try {
      const localidades = await Localidad.findAll();
      res.status(200).json(localidades);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getLocalidad: async (req: Request, res: Response) => {
    try {
      const localidad = await Localidad.findByPk(req.params.id);
      if (localidad) {
        res.status(200).json(localidad);
      } else {
        res.status(404).json({ message: "Localidad no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateLocalidad: async (req: Request, res: Response) => {
    try {
      const [updated] = await Localidad.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const updatedLocalidad = await Localidad.findByPk(req.params.id);
        res.status(200).json(updatedLocalidad);
      } else {
        res.status(404).json({ message: "Localidad no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteLocalidad: async (req: Request, res: Response) => {
    try {
      const deleted = await Localidad.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.status(200).json({ message: "Localidad eliminada exitosamente" });
      } else {
        res.status(404).json({ message: "Localidad no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateLocalidad: async (req: Request, res: Response) => {
    try {
      const localidad = await Localidad.findByPk(req.params.id);
      if (!localidad) {
        return res.status(404).json({ message: "Localidad no encontrada" });
      }
      await Localidad.update(req.body, { where: { id: req.params.id } });
      const updatedLocalidad = await Localidad.findByPk(req.params.id);
      res.status(200).json(updatedLocalidad);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};

export default localidadController;
