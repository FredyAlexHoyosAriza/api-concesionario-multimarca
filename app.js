// La siguiente es una directiva, parece un comentario, pero no, su función es deshabilitar el checkeo
// de tipos en archivos javaScript, los cuales al no ser typeScript no son tipados
// @ts-nocheck

import { dbConection } from "./database/dbConection.js";
import apiRouter from './routes/index.js';

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
const port = process.env.PORT;
let client;

/* CHAT: Cuando usas app.use(express.json());, lo que ocurre es que Express incluye un middleware que
analiza (parsea) el cuerpo de las solicitudes HTTP y determina si el contenido está en formato JSON.
Este middleware luego convierte ese contenido en un objeto JavaScript que estará disponible en req.body.
En términos simples:
app.use(express.json()) añade un middleware que escucha todas las solicitudes entrantes y verifica si
el cuerpo de la solicitud contiene datos en formato JSON.
Si el cuerpo está en formato JSON, este middleware lo parsea y coloca el resultado como un objeto
JavaScript en req.body.
Si no contiene JSON, o no se envía un cuerpo válido, req.body estará vacío o indefinido, dependiendo
ladel caso. */

/* PROBANDO GET*/

// http://localhost:5000/vehiculo: en esta ruta se imprime Hello World! cuando se hace get en la ruta
// app.get("/vehiculo", (req, res) => {
//   //El arrow function se ejecuta cuando se hace petición get en la ruta
//   // res.send(
//   //   `<h1>Esta es la respuesta para una petición get en la ruta http://localhost:${port}/vehiculo</h1>`
//   // );
//   const vehiculos = [
//     // arreglo de objetos javaScript (casi pero no es formato json)
//     // el método send del objeto res en express internamente realiza la conversión al formato json
//     // por ello en la ruta del navegador se observa este arreglo de objetos en formato json
//     { marca: "Toyota", modelo: 2020, gama: "Yaris" },
//     { marca: "Toyota", modelo: 2021, gama: "Corolla" },
//     { marca: "Toyota", modelo: 2022, gama: "CX30" },
//     { marca: "Ford", modelo: 2010, gama: "Fiesta" },
//   ];
//   res.send(vehiculos);
//   //En este punto ya se puede recibir una petición en una ruta partícular y entregar una respuesta en esta ruta
// });

/* PROBANDO POST*/

// app.post("/vehiculo/nuevo", (req, res) => {
//   // Para poder generar una petición post, put, patch o delete sin necesidad de un front se requieren
//   // programas que me permiten probar rutas creadas para un backend o endpoints. Entre los programas
//   // más conocidos para esta tarea se encuentran: postman e insomnia
//   //La acción en el arrow function solo se ejecuta ante una petición POST
//   try {
//     // Las claves esperadas que deben estar presentes en req.body
//     const expectedKeys = ["marca", "modelo", "gama", "color"];
//     // Obtenemos las claves del objeto JSON que recibimos
//     const actualKeys = Object.keys(req.body);

//     /* Otra forma de comparar:
//     JSON.stringify(Object.keys(req.body)) === JSON.stringify(['marca', 'modelo', 'gama']) */
//     // Validación: si el número de claves y los valores coinciden
//     const areEqual =
//       actualKeys.length === expectedKeys.length &&
//       actualKeys.every((key, index) => key === expectedKeys[index]);

//     if (!areEqual) {
//       // Si no son iguales, devolvemos un error de validación
//       throw new Error(
//         "Los datos proporcionados no coinciden con el formato esperado."
//       );
//     }

//     // Si todo está bien, continuamos con el procesamiento de la solicitud
//     res
//       .status(200)
//       .json({ message: "Datos válidos y procesados correctamente" });
//   } catch (error) {
//     // Capturamos cualquier error (como un problema con el formato de req.body o fallos en la validación)
//     res.status(400).json({ error: error.message });
//   }
// });

async function startServer() {
  try {
    // Conectar al cluster y retornar un base de datos específica
    const { client: mongoClient } = await dbConection();
    client = mongoClient;
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
    const server = app.listen(port, () => {
      //Por aquí se escucha la petición
      // Esta es la función que se ejecuta en la terminal cuando la app empieza a escuchar
      console.log(`Concesionario app listening on port ${port}`);
    });

    // Cerrar la conexión de MongoDB cuando el servidor se cierre
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
