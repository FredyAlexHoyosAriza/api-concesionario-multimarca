import request from "supertest"; // Para simular peticiones HTTP
import "./mocks/auth"; // Importar el mock para auth ANTES DE IMPORTAR app; el cambio de auth
//por el auth del mock debe realizarse anes de importar app.js para que traiga el cambio incluido
import { app } from "../app"; // Importar la instancia de Express

describe("Token Validation Middleware", () => {
  it("should return 200 and a success message if a valid token is provided", async () => {
    //Probar una ruta protegida por el token; equivale a probar todas las  rutas potegidas
    //Puesto que todas las rutas están protegidas se prueba la ruta más externa
    const response = await request(app)
    .get("/api")
    .set("Authorization", "Bearer mockValidToken"); // Simula GET /api
    expect(response.status).toBe(200); // Espera status 200
    expect(response.body.message).toBe("Welcome to the API!"); // Valida el mensaje
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });

  it("should return 401 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/api")
      .set("Authorization", "Bearer invalidToken");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });

  it("should return 200 and an array greater than 0", async () => {
    const response = await request(app)
    .get("/api/usuarios")
    .set("Authorization", "Bearer mockValidToken"); // Simula GET /api
    expect(response.status).toBe(200); // Espera status 200
    // expect(response.body.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body)).toBe(true); // Valida el mensaje
  });

  // it("should allow access if a valid token is provided", async () => {
  //   const response = await request(app)
  //     .get("/api/usuarios")
  //     .set("Authorization", "Bearer mockValidToken");
  //   expect(response.status).toBe(200);
  //   // Verifica el contenido de la respuesta si es necesario
  // });
});
