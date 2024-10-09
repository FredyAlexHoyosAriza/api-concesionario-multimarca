import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from 'dotenv'

 // puesto que se encuentra en la ruta raiz no se requiere especificar la ruta: dotenv.config({ path: '../.env' });
dotenv.config();
const uri = process.env.DATABASE_URL;

let cachedClient = null;
let cachedDb = null;

export const dbConection = async () => {
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient };
  } else {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    // El cliente es la entidad que usa la DB y requiere un string de conexión y un objeto
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      cachedClient = client;
      // Se asigna una base de datos específica (Concesionario)
      cachedDb = client.db("Concesionario");// conexion o referencia a la DB remota
      return { db: cachedDb, client: cachedClient };
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error;
    }
  }
}
