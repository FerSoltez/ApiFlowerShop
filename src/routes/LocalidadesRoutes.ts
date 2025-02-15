import { Router } from "express";
import localidadController from '../controllers/LocalidadesController';

const router = Router();

router.post("/localidades", localidadController.createLocalidad);
router.get("/localidades", localidadController.getAllLocalidades);
router.get("/localidades/:id", localidadController.getLocalidad);
router.put("/localidades/:id", localidadController.updateLocalidad);
router.patch("/localidades/:id", localidadController.partialUpdateLocalidad as any);
router.delete("/localidades/:id", localidadController.deleteLocalidad);

export default router;
