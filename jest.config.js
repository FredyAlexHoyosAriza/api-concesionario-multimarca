// jest.config.js
export default {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node', // Si estás probando un entorno de backend
  detectOpenHandles: true,
};
