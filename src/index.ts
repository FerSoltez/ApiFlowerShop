import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import cors from "cors";
import ProductsRoutes from "../src/routes/ProductsRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares  
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/productos", ProductsRoutes);

// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
