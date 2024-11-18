import { dbConection } from '../database/dbConection.js';
import { MongoClient } from 'mongodb';

jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn().mockResolvedValue({
      db: jest.fn(() => 'mockDatabase'),
      close: jest.fn(),
    }),
  },
}));

describe('Database Connection', () => {
  test('Debe conectarse a la base de datos exitosamente', async () => {
    const { db, client } = await dbConection();
    expect(MongoClient.connect).toHaveBeenCalled();
    expect(db).toBe('mockDatabase');
    expect(client).toBeTruthy();
  });

  test('Debe lanzar un error si la conexión falla', async () => {
    MongoClient.connect.mockRejectedValue(new Error('Error de conexión'));
    await expect(dbConection()).rejects.toThrow('Error de conexión');
  });
});
