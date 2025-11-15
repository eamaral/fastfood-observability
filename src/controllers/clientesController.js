const { Cliente } = require('../models');

async function listar(req, res) {
  const clientes = await Cliente.findAll();
  return res.json(clientes);
}

async function criar(req, res) {
  const { nome, cpf } = req.body;

  if (!nome || !cpf) {
    return res.status(400).json({ error: 'Campos nome e cpf são obrigatórios.' });
  }

  const existente = await Cliente.findOne({ where: { cpf } });
  if (existente) {
    return res.status(409).json({ error: 'Já existe um cliente com esse CPF.' });
  }

  const cliente = await Cliente.create({ nome, cpf });

  return res.status(201).json(cliente);
}

module.exports = {
  listar,
  criar
};



