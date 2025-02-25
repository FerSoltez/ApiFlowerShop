import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRoutes from './routes/ProductsRoutes';
import usuariosRoutes from './routes/UsuariosRoutes';
import localidadesRoutes from './routes/LocalidadesRoutes';
import municipiosRoutes from './routes/MunicipiosRoutes';
import asignaturasRoutes from './routes/AsignaturasRoutes';
import unidadesapRoutes from './routes/UnidadesApRoutes';
import usersRoutes from './routes/UsersRoutes';
import commentsRoutes from './routes/CommentsRoutes';

dotenv.config();
const app: Application = express();

// Middlewares  
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productsRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", localidadesRoutes);
app.use("/api", municipiosRoutes);
app.use("/api", asignaturasRoutes);
app.use("/api", unidadesapRoutes);
app.use("/api", usersRoutes);
app.use("/api", commentsRoutes);

// Ruta de prueba
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("¡API en funcionamiento!");
});

// Manejador de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal");
});

// Puerto del servidor
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
