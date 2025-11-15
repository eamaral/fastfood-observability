const express = require('express');
const pedidosController = require('../controllers/pedidosController');

const router = express.Router();

router.get('/', pedidosController.listar);
router.post('/', pedidosController.criar);

module.exports = router;


