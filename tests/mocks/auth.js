// tests/mocks/auth.js
// import { auth } from 'express-oauth2-jwt-bearer';

export const mockAuth = jest.fn((req, res, next) => {
  if (req.headers.authorization === 'Bearer mockValidToken') {
    req.auth = { user: 'test-user' }; // Agrega datos simulados al request
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Mockea el middleware de auth
jest.mock('express-oauth2-jwt-bearer', () => ({
  auth: jest.fn(() => mockAuth),
}));
