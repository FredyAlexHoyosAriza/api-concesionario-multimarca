// La siguiente es una directiva, parece un comentario, pero no, su función es deshabilitar el checkeo
// de tipos en archivos javaScript, los cuales al no ser typeScript no son tipados
// @ts-nocheck

import ServerlessHttp from "serverless-http";
import express from "express";
import cors from "cors";
import { dbConection } from "./database/dbConection.js";
import apiRouter from "./routes/index.js";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
app.use(express.json());
app.use(cors());

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
});

// Middleware para inicializar la base de datos solo si es necesario
app.use(async (req, res, next) => {
  try {
    await dbConection(); // La conexión está cacheada, así que se reutiliza sin reconectar.
    next();
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
    res.status(500).json({ error: "Error de conexión a la base de datos." });
  }
});

// Configuración de rutas y middleware de autenticación
app.use(jwtCheck);
app.use("/api", apiRouter);

// Manejo de errores de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador de errores genérico
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err);
  res.status(500).json({ error: "Error en el servidor, intenta más tarde." });
});

// Exporta el handler para Lambda
export const handler = ServerlessHttp(app);
