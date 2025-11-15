const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Redirecionar raiz
app.get('/', (req, res) => {
  res.send('Fastfood Observability API is running. Acesse /api-docs para Swagger.');
});

// Healthcheck simples
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais da API
app.use('/api', routes);

// Tratamento básico de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;


