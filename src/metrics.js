const client = require('prom-client');

// Métricas do sistema (CPU/Memória)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Contador de pedidos
const ordersTotal = new client.Counter({
    name: 'fastfood_orders_total',
    help: 'Total de pedidos',
    labelNames: ['status'] // Label para o status do pedido
});

// Métrica de duração das requisições HTTP
const httpRequestDuration = new client.Histogram({
    name: 'fastfood_http_request_duration_seconds',
    help: 'Duração das requisições HTTP',
    buckets: [0.1, 0.5, 1, 2.5, 5, 10]
});

// Métrica contador de requisições HTTP
const httpRequestTotal = new client.Counter({
    name: 'fastfood_http_request_total',
    help: 'Total de requisições HTTP',
    labelNames: ['method', 'route', 'status'] // Labels para o método, caminho e status
});

module.exports = {
    ordersTotal,
    httpRequestTotal,
    httpRequestDuration,
    register: client.register
};
