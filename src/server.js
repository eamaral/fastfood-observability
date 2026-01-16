const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { register, httpRequestTotal, httpRequestDuration } = require('./metrics');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Middleware de métricas HTTP
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    //Incrementa o contador de requisições
    httpRequestTotal.inc({
      method: req.method,
      route,
      status: res.statusCode
    });
    //Registra a duração da requisição
    httpRequestDuration.observe(duration);
  });
  next();
});

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

// Expor as métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.end(metrics);
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


