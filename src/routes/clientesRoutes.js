const express = require('express');
const clientesController = require('../controllers/clientesController');

const router = express.Router();

router.get('/', clientesController.listar);
router.post('/', clientesController.criar);

module.exports = router;


