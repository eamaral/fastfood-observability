const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const client = require('prom-client');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const routes = require('./routes');

const app = express();

// Métricas do sistema (CPU/Memória)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Contador de pedidos
const ordersTotal = new client.Counter({
    name: 'fastfood_orders_total',
    help: 'Total de pedidos',
    labelNames: ['status'] // Label para o status do pedido
});

const httpRequestDuration = new client.Histogram({
    name: 'fastfood_http_request_duration_seconds',
    help: 'Duração das requisições HTTP',
    buckets: [0.1, 0.5, 1, 2.5, 5, 10]
});

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

// Expor as métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
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


