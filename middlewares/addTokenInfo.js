import jwt from 'jsonwebtoken';

const addTokenInfo = (req, res, next) => {
  try {
    // Extraer el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Token de autorización no encontrado o inválido" });
    }

    // Remover 'Bearer ' para obtener solo el token
    const token = authHeader.split(' ')[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);

    // Extraer userInfo desde el token decodificado
    const userInfo = decodedToken['http://localhost/userInfo'];

    // console.log('userInfo: ', userInfo);

    // Validar que userInfo exista en el token decodificado
    if (!userInfo || typeof userInfo !== 'object') {
      return res.status(400).json({ error: "Información del token incompleta o ausente" });
    }

    // Extraer el ID y colocarlo en req.params.id
    // req.params.id = userInfo.id;

    // Asignar directamente userInfo a req.body
    req.body = userInfo;

    // Pasar al siguiente middleware
    next();
  } catch (error) {
    // Manejar errores y enviar una respuesta si es necesario
    return res.status(500).json({ error: "Error al procesar el token" });
  }
};

export default addTokenInfo;
