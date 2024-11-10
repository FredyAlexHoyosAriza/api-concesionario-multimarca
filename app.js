// La siguiente es una directiva, parece un comentario, pero no, su función es deshabilitar el checkeo
// de tipos en archivos javaScript, los cuales al no ser typeScript no son tipados
// @ts-nocheck

import { dbConection } from "./database/dbConection.js";
import apiRouter from './routes/index.js';

//------------Para validación de access token----------------------------
import { auth } from 'express-oauth2-jwt-bearer'
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,//identificador de api de auth0
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,//endpoint de auth0 para enviar token
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG//Metodo de encriptación de token
});
//-----------------------------------------------------------------------

// En proyectos de back en node el import solia conocerse como require, a continuación se muestra la
// forma en la que solía importarse la librería express dentro del archivo de arranque del back
// const express = require('express');
import express from "express";
import cors from 'cors';
const app = express(); // A esta variable se le agregan las rutas, los métodos y todo lo necesario.
/* Aparentemente express.json() pone en true una bandera en el objeto app, lo que le indica que los
datos que se recibirán en el body de las solicitudes estan en formato JSON y por ende debe parsearlos
para convertirlos en elementos válidos en javaScript; objetos o arreglos de objetos de javaScript, que
puedan ser usados y manipulados sin inconveniente dentro del código del back*/
app.use(express.json());
app.use(cors());

/*Aquí se establece la validación de token de atuh0 para la cual habrá respuesta, si es ok el flujo
continuará. Aquí se establece la necesidad de un token válido para todos los endpoints de forma
general; cualquier petición al back requerirá un token válido */
app.use(jwtCheck); //Se agrega middleware de validación de token (primer anillo de seguridad)
const PORT = process.env.PORT || 5000;

/* CHAT: Cuando usas app.use(express.json());, lo que ocurre es que Express incluye un middleware que
analiza (parsea) el cuerpo de las solicitudes HTTP y determina si el contenido está en formato JSON.
Este middleware luego convierte ese contenido en un objeto JavaScript que estará disponible en req.body.
En términos simples:
app.use(express.json()) añade un middleware que escucha todas las solicitudes entrantes y verifica si
el cuerpo de la solicitud contiene datos en formato JSON.
Si el cuerpo está en formato JSON, este middleware lo parsea y coloca el resultado como un objeto
JavaScript en req.body.
Si no contiene JSON, o no se envía un cuerpo válido, req.body estará vacío o indefinido, dependiendo
del caso. */

async function startServer() {
  try {
    // Conectar al cluster y retornar el cliente (la entidad que usa la DB)
    const { client } = await dbConection();
    app.use('/api', apiRouter); // middleware

    // app.post("/vehiculos/nuevo", async (req, res) => {
    //   try {

    //     // Insertar el nuevo vehículo en la base de datos
    //     const result = await db.collection("Vehiculos").insertOne(req.body);

    //     res.status(201).json({ message: 'Vehículo insertado exitosamente', id: result.insertedId });
    //   } catch (error) {
    //     console.error("Error al insertar el vehículo:", error);
    //     res.status(500).json({ error: "No se pudo insertar el vehículo" });
    //   }
    // });

    // app.get("/vehiculos", async (req, res) => {
    //   try {
    //     // Accede a una colección dentro de la base de datos
    //     const collection = db.collection("Vehiculos");

    //     // Realiza una operación, por ejemplo, encontrar documentos
    //     const vehiculos = await collection.find({}).toArray();
    //     // console.log("Documentos encontrados:", vehiculos);
    //     res.status(200).json(vehiculos); //no se requeriria status(200) lo realiza express; es implicito
    //   } catch (error) {
    //     console.error("Error al obtener vehículos:", error);
    //     res.status(500).send("Error al obtener vehículos"); //.json({ error: error.message });
    //   }
    // });

    // Se prende app de tal forma que escucha todo lo que se encuentra en el puerto 5000
    const server = app.listen(PORT, () => {
      //Por aquí se escucha la petición
      // Esta es la función que se ejecuta en la terminal cuando la app empieza a escuchar
      console.log(`Concesionario app listening on PORT ${PORT}`);
    });

    // Ante un evento Crtl + C: Cerrar la conexión de MongoDB cuando el servidor se cierre
    process.on("SIGINT", async () => {
      console.log("\nCerrando servidor...");
      if (client) {
        // Verifica si client no es null
        try {
          await client.close(); // Cerrar la conexión de MongoDB
          console.log("Conexión con MongoDB cerrada.");
        } catch (error) {
          console.error("Error al cerrar la conexión con MongoDB:", error);
        }
      }

      // Ahora cierra el servidor
      server.close((err) => {
        if (err) {
          console.error("Error al cerrar el servidor:", err);
          process.exit(1); // Salida con error si no puede cerrar el servidor
        } else {
          console.log("Servidor cerrado.");
          process.exit(0); // Salida exitosa
        }
      });
    });
  } catch (error) {
    // console.error('Error al iniciar el servidor:', error);
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1); // Salir si hay un problema al iniciar
  }
}

startServer();
