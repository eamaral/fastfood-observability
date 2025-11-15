const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FastFood Observability API',
      version: '1.0.0',
      description:
        'API simples de sistema de pedidos para demonstrações de observability com Prometheus, Grafana e Alloy.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Ambiente local'
      }
    ]
  },
  apis: ['./src/swaggerDocs/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;


