# API Concesionario Multimarca 🚗

API Concesionario Multimarca es una aplicación backend desarrollada en **Node.js** con **Express** que proporciona una API RESTful para gestionar un concesionario de vehículos multimarca. Implementa el patrón de diseño **Modelo-Vista-Controlador (MVC)** y utiliza **MongoDB** para el almacenamiento de datos. La autenticación y autorización se manejan mediante **Auth0** con **JWT**, permitiendo la actualización de datos de usuario tanto en la base de datos como en Auth0.

## Características 🌟

- **Gestín de Vehículos**: CRUD completo para vehículos, incluyendo creación, lectura, actualización y eliminación.
- **Gestín de Usuarios**: CRUD para usuarios, con roles diferenciados (`user` y `admin`), y posibilidad de actualización de datos en Auth0.
- **Autenticación y Autorización**: Integración con Auth0 para autenticación basada en JWT, con middleware para validar y extraer información del token.
- **Validación de Datos**: Uso de **Joi** para la validación de esquemas de datos en las solicitudes.
- **Conexión a Base de Datos**: Gestión de la conexión a MongoDB desde la carpeta `database` utilizando la librería oficial de MongoDB.
- **Middleware Personalizados**: Implementación de middleware para agregar información del usuario desde el token a `req.body` y para validar esquemas de Joi.
- **Gestión de Bloqueo de Usuarios**: Control del estado de bloqueo de usuarios mediante el atributo `blocked` en Auth0.
- **Branch de Pruebas**: Existe una rama dedicada a pruebas para asegurar la estabilidad del sistema antes de fusionar cambios a la rama principal.

## Tecnologías Utilizadas 🛠️

- **Node.js** - Entorno de ejecución para el servidor.
- **Express** - Framework para la creación de aplicaciones web y APIs.
- **MongoDB** - Base de datos NoSQL para el almacenamiento de información.
- **Auth0** - Plataforma de autenticación y autorización.
- **Joi** - Biblioteca para la validación de esquemas de datos.
- **JWT (JSON Web Tokens)** - Estándar para la autenticación basada en tokens.

## Instalación y Configuración 🚀

### 1. Clonar el Repositorio

```bash
git clone https://github.com/FredyAlexHoyosAriza/api-concesionario-multimarca.git
cd api-concesionario-multimarca
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_AUDIENCE=your_auth0_audience
JWT_SECRET=your_jwt_secret
```

### 4. Ejecutar la Aplicación

```bash
npm start
```

La API estará disponible en [http://localhost:4000](http://localhost:4000).

## Estructura del Proyecto 📁

```plaintext
api-concesionario-multimarca/
├── controllers/        # Controladores que manejan la lógica de negocio
│   ├── authController.js
│   ├── userController.js
│   ├── vehicleController.js
│   └── ...
├── database/           # Configuración y conexión a la base de datos
│   └── mongoConnection.js
├── middlewares/        # Middleware personalizados
│   ├── authMiddleware.js
│   ├── joiMiddleware.js
│   └── ...
├── models/             # Modelos de datos (esquemas de MongoDB)
│   ├── userModel.js
│   ├── vehicleModel.js
│   └── ...
├── routes/             # Definición de rutas de la API
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── vehicleRoutes.js
│   └── ...
├── utils/              # Utilidades y funciones auxiliares
│   └── ...
├── .env                # Variables de entorno
├── app.js              # Configuración principal de la aplicación
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo ✨
```

## Uso de la API 🌍

### Endpoints Principales

#### Vehículos

- `GET /api/vehicles` - Obtener la lista de vehículos.
- `POST /api/vehicles` - Crear un nuevo vehículo (requiere rol de administrador).
- `GET /api/vehicles/:id` - Obtener detalles de un vehículo específico.
- `PUT /api/vehicles/:id` - Actualizar información de un vehículo (requiere rol de administrador).
- `DELETE /api/vehicles/:id` - Eliminar un vehículo (requiere rol de administrador).

#### Usuarios

- `GET /api/users` - Obtener la lista de usuarios (requiere rol de administrador).
- `POST /api/users` - Crear un nuevo usuario.
- `GET /api/users/:id` - Obtener detalles de un usuario específico.
- `PUT /api/users/:id` - Actualizar información de un usuario.
- `DELETE /api/users/:id` - Eliminar un usuario (requiere rol de administrador).

## Contribuciones 🤝

1. Haz un fork del proyecto.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m 'Añadir nueva funcionalidad'`.
4. Sube tus cambios: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

## Licencia 📄

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto 📬

- **GitHub**: [FredyAlexHoyosAriza](https://github.com/FredyAlexHoyosAriza)
- **LinkedIn**: [Fredy Alexander Hoyos Ariza](https://www.linkedin.com/in/fredy-alexander-hoyos-ariza-3b7122167/)

---

✨ ¡Gracias por revisar este proyecto! Espero que te sea útil. 🚀

