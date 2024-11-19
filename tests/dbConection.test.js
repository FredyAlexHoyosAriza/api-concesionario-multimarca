import { dbConection } from '../database/dbConection.js';
import { MongoClient } from 'mongodb';

// mongodb es la librería, MongoClient y ServerApiVersion son las entidades u objetos
// que se usan de esa librería: import { MongoClient, ServerApiVersion } from "mongodb";
jest.resetModules();
jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(),
    db: jest.fn().mockReturnValue({
      command: jest.fn().mockResolvedValue({ ok: 1 }),
    }),
    close: jest.fn(),
  })),
  ServerApiVersion: {
    v1: 'mockedV1',
  },
}));

describe('Database Connection', () => {
  let cliente;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Asegurarse de que las conexiones se cierren después de las pruebas
    if (cliente && cliente.close) {
      await cliente.close();
    }
  });

  test('Debe lanzar un error si la conexión falla', async () => {
    // Fuerza un error en la conexión
    /* Primero se debe realizar la prueba de error puesto que para que el error aparezca se debe
    llamar a connect, pero esto solo ocurre si cachedClient && cachedDb===false, es decir si
    previamente no hubo conexión exitosa en la cual se guardó client y db */
    MongoClient.mockImplementationOnce(() => ({
      connect: jest.fn().mockRejectedValue(new Error('Error de conexión')),
    }));
    await expect(dbConection()).rejects.toThrow('Error de conexión');
  });

  test('Debe conectarse a la base de datos exitosamente', async () => {
    const { db, client } = await dbConection();

    cliente = client;

    // Verifica que el método connect haya sido llamado
    expect(client.connect).toHaveBeenCalled();
    // Verifica que se haya seleccionado la base de datos "Concesionario"
    expect(client.db).toHaveBeenCalledWith('Concesionario');
    expect(db).toBeTruthy(); // La base de datos simulada debe existir
  });

});
