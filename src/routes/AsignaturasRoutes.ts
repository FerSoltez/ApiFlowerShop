import { Router, RequestHandler } from "express";
import asignaturaController from '../controllers/AsignaturasController';

const router = Router();

router.post("/asignaturas", asignaturaController.createAsignatura);
router.get("/asignaturas", asignaturaController.getAsignaturas);
router.get("/asignaturas/:id", asignaturaController.getAsignaturaById);
router.put("/asignaturas/:id", asignaturaController.updateAsignatura);
router.patch("/asignaturas/:id", asignaturaController.updateAsignatura as any);
router.delete("/asignaturas/:id", asignaturaController.deleteAsignatura);
router.get("/asignaturas/:id/unidades", asignaturaController.getUnidadesByAsignaturaId as unknown as RequestHandler);

export default router;
