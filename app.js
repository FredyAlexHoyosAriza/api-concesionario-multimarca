import { dbConection } from "./database/dbConection.js";
import apiRouter from './routes/index.js';
import { auth } from 'express-oauth2-jwt-bearer';
import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Middleware de validación de token de Auth0
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
});
app.use(jwtCheck); // Se agrega el middleware de validación de token

app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const { client } = await dbConection();
    const server = app.listen(PORT, () => {
      console.log(`Concesionario app listening on PORT ${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("\nCerrando servidor...");
      if (client) {
        try {
          await client.close(); 
          console.log("Conexión con MongoDB cerrada.");
        } catch (error) {
          console.error("Error al cerrar la conexión con MongoDB:", error);
        }
      }

      server.close((err) => {
        if (err) {
          console.error("Error al cerrar el servidor:", err);
          process.exit(1);
        } else {
          console.log("Servidor cerrado.");
          process.exit(0);
        }
      });
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
}

// Esta parte asegura que startServer solo se ejecute si app.js es ejecutado directamente
if (require.main === module) {
  startServer();
}

export { app };  // Solo exporta `app` para las pruebas
