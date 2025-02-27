"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const ProductsRoutes_1 = __importDefault(require("./routes/ProductsRoutes"));
const UsuariosRoutes_1 = __importDefault(require("./routes/UsuariosRoutes"));
const LocalidadesRoutes_1 = __importDefault(require("./routes/LocalidadesRoutes"));
const MunicipiosRoutes_1 = __importDefault(require("./routes/MunicipiosRoutes"));
const AsignaturasRoutes_1 = __importDefault(require("./routes/AsignaturasRoutes"));
const UnidadesApRoutes_1 = __importDefault(require("./routes/UnidadesApRoutes"));
const UsersRoutes_1 = __importDefault(require("./routes/UsersRoutes"));
const CommentsRoutes_1 = __importDefault(require("./routes/CommentsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares  
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api", ProductsRoutes_1.default);
app.use("/api", UsuariosRoutes_1.default);
app.use("/api", LocalidadesRoutes_1.default);
app.use("/api", MunicipiosRoutes_1.default);
app.use("/api", AsignaturasRoutes_1.default);
app.use("/api", UnidadesApRoutes_1.default);
app.use("/api", UsersRoutes_1.default);
app.use("/api", CommentsRoutes_1.default);
// Ruta de prueba
app.get("/", (req, res, next) => {
    res.send("¡API en funcionamiento!");
});
// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal");
});
// Puerto del servidor
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
