const express = require('express');
const produtosController = require('../controllers/produtosController');

const router = express.Router();

router.get('/', produtosController.listar);
router.post('/', produtosController.criar);

module.exports = router;


