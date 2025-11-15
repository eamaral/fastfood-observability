const { Produto } = require('../models');

async function listar(req, res) {
  const produtos = await Produto.findAll();
  return res.json(produtos);
}

async function criar(req, res) {
  const { nome, preco } = req.body;

  if (!nome || typeof preco !== 'number') {
    return res.status(400).json({ error: 'Campos nome e preco são obrigatórios.' });
  }

  const produto = await Produto.create({ nome, preco });

  return res.status(201).json(produto);
}

module.exports = {
  listar,
  criar
};



