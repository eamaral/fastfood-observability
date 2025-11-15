const express = require('express');

const produtosRoutes = require('./produtosRoutes');
const clientesRoutes = require('./clientesRoutes');
const pedidosRoutes = require('./pedidosRoutes');

const router = express.Router();

router.use('/produtos', produtosRoutes);
router.use('/clientes', clientesRoutes);
router.use('/pedidos', pedidosRoutes);

module.exports = router;


