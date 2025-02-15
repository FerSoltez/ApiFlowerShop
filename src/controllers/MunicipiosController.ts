import { Request, Response } from "express";
import Municipio from "../models/Municipios";

const municipioController = {
  createMunicipio: async (req: Request, res: Response) => {
    try {
      const newMunicipio = await Municipio.create(req.body);
      res.status(201).json(newMunicipio);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getAllMunicipios: async (req: Request, res: Response) => {
    try {
      const municipios = await Municipio.findAll();
      res.status(200).json(municipios);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getMunicipio: async (req: Request, res: Response) => {
    try {
      const municipio = await Municipio.findByPk(req.params.id);
      if (municipio) {
        res.status(200).json(municipio);
      } else {
        res.status(404).json({ message: "Municipio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateMunicipio: async (req: Request, res: Response) => {
    try {
      const [updated] = await Municipio.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const updatedMunicipio = await Municipio.findByPk(req.params.id);
        res.status(200).json(updatedMunicipio);
      } else {
        res.status(404).json({ message: "Municipio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteMunicipio: async (req: Request, res: Response) => {
    try {
      const deleted = await Municipio.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.status(200).json({ message: "Municipio eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Municipio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateMunicipio: async (req: Request, res: Response) => {
    try {
      const municipio = await Municipio.findByPk(req.params.id);
      if (!municipio) {
        return res.status(404).json({ message: "Municipio no encontrado" });
      }
      await Municipio.update(req.body, { where: { id: req.params.id } });
      const updatedMunicipio = await Municipio.findByPk(req.params.id);
      res.status(200).json(updatedMunicipio);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};

export default municipioController;
