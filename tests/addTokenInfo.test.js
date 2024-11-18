import jwt from 'jsonwebtoken';
import addTokenInfo from '../middlewares/addTokenInfo'; // Ajusta la ruta según tu estructura


// Los mocks se usan para objetos o métodos traídos de librerías
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

describe('addTokenInfo Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {}, body: {}, params: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('Debe retornar 401 si el encabezado Authorization está ausente', () => {
    addTokenInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token de autorización no encontrado o inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Debe retornar 401 si el encabezado Authorization no empieza con "Bearer "', () => {
    req.headers.authorization = 'InvalidToken';
    addTokenInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token de autorización no encontrado o inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Debe retornar 400 si userInfo está ausente o no es un objeto en el token decodificado', () => {
    req.headers.authorization = 'Bearer mockToken';
    jwt.decode.mockReturnValue({}); // Token decodificado sin userInfo
    addTokenInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Información del token incompleta o ausente' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Debe pasar al siguiente middleware si el token contiene userInfo válido', () => {
    req.headers.authorization = 'Bearer mockToken';
    const mockUserInfo = { id: '123', name: 'John Doe' };
    jwt.decode.mockReturnValue({ 'http://localhost/userInfo': mockUserInfo });
    addTokenInfo(req, res, next);
    expect(req.body).toEqual(mockUserInfo);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('Debe retornar 500 si ocurre un error inesperado', () => {
    req.headers.authorization = 'Bearer mockToken';
    jwt.decode.mockImplementation(() => {
      throw new Error('Error de decodificación');
    });
    addTokenInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al procesar el token' });
    expect(next).not.toHaveBeenCalled();
  });
});
