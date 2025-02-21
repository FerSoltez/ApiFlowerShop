import { Request, Response } from "express";
import Asignatura from "../models/Asignaturas";
import UnidadAprendizaje from "../models/UnidadesAp";
import { sequelize } from '../config/database';

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
    const { id } = req.params;

    try {
      console.log(`Buscando asignatura con id: ${id}`);
      
      // Buscar la asignatura por su ID
      const asignatura = await Asignatura.findByPk(id, {
        include: [{
          model: UnidadAprendizaje,
          as: 'unidadesAp'
        }]
      });

      if (!asignatura) {
        console.log(`Asignatura con id: ${id} no encontrada`);
        return res.status(404).json({ message: "Asignatura no encontrada" });
      }

      console.log(`Asignatura encontrada: ${JSON.stringify(asignatura)}`);

      res.status(200).json(asignatura);
    } catch (error) {
      console.error(`Error al obtener la asignatura con unidades: ${(error as Error).message}`);
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateAsignatura: async (req: Request, res: Response) => {
    try {
      const [updated] = await Asignatura.update(req.body, { where: { id_asignaturas: req.params.id } });
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
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;

      // Eliminar las unidades de aprendizaje asociadas a la asignatura
      const unidadesDeleted = await UnidadAprendizaje.destroy({
        where: { id_asignaturas: id },
        transaction
      });

      // Eliminar la asignatura
      const deleted = await Asignatura.destroy({
        where: { id_asignaturas: id },
        transaction
      });

      if (deleted) {
        await transaction.commit();
        res.status(200).json({ message: "Asignatura y unidades eliminadas exitosamente" });
      } else {
        await transaction.rollback();
        res.status(404).json({ message: "Asignatura no encontrada" });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateAsignatura: async (req: Request, res: Response) => {
    try {
      const asignatura = await Asignatura.findByPk(req.params.id);
      if (!asignatura) {
        return res.status(404).json({ message: "Asignatura no encontrada" });
      }
      await Asignatura.update(req.body, { where: { id_asignaturas: req.params.id } });
      const updatedAsignatura = await Asignatura.findByPk(req.params.id);
      res.status(200).json(updatedAsignatura);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

};

export default asignaturaController;