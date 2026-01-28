const client = require('prom-client');

// Métricas do Sistema (CPU/Memória)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Contador de Pedidos
const ordersTotal = new client.Counter({
    name: 'fastfood_orders_total',
    help: 'Total de pedidos',
    labelNames: ['status']
});

// Tempo de resposta
const httpRequestDuration = new client.Histogram({
    name: 'fastfood_http_request_duration_seconds',
    help: 'Tempo de duração das requisições HTTP',
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5]
});

// Contador de requisições HTTP (Para RPS)
const httpRequestTotal = new client.Counter({
    name: 'fastfood_http_request_total',
    help: 'Total de requisições HTTP',
    labelNames: ['route', 'method', 'status_code']
})

module.exports = {
    ordersTotal,
    httpRequestDuration,
    httpRequestTotal,
    register: client.register
};