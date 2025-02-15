import { Router } from "express";
import municipioController from '../controllers/MunicipiosController';

const router = Router();

router.post("/municipios", municipioController.createMunicipio);
router.get("/municipios", municipioController.getAllMunicipios);
router.get("/municipios/:id", municipioController.getMunicipio);
router.put("/municipios/:id", municipioController.updateMunicipio);
router.patch("/municipios/:id", municipioController.partialUpdateMunicipio as any);
router.delete("/municipios/:id", municipioController.deleteMunicipio);

export default router;
