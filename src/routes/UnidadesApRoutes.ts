import { Router } from "express";
import unidadesApController from "../controllers/UnidadesApController";

const router = Router();

router.post("/unidades-aprendizaje", unidadesApController.createUnidadAprendizaje);
router.get("/unidades-aprendizaje", unidadesApController.getUnidadesAprendizaje);
router.get("/unidades-aprendizaje/:id", unidadesApController.getUnidadAprendizajeById);
router.put("/unidades-aprendizaje/:id", unidadesApController.updateUnidadAprendizaje);
router.patch("/unidades-aprendizaje/:id", unidadesApController.updateUnidadAprendizaje as any);
router.delete("/unidades-aprendizaje/:id", unidadesApController.deleteUnidadAprendizaje);

export default router;
