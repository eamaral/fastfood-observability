const { Pedido, Cliente, Produto, PedidoItem } = require('../models');
const { ordersTotal } = require('../metrics');

async function listar(req, res) {
  const pedidos = await Pedido.findAll({
    include: [
      { model: Cliente },
      { model: Produto }
    ]
  });

  return res.json(pedidos);
}

async function criar(req, res) {
  const { clienteId, itens } = req.body;

  if (!clienteId || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({
      error: 'Campos clienteId e itens (array com { produtoId, quantidade }) são obrigatórios.'
    });
  }

  const cliente = await Cliente.findByPk(clienteId);
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado.' });
  }

  let total = 0;
  const itensCalculados = [];

  for (const item of itens) {
    const produto = await Produto.findByPk(item.produtoId);
    if (!produto) {
      return res.status(404).json({ error: `Produto ${item.produtoId} não encontrado.` });
    }

    const quantidade = item.quantidade || 1;
    const precoUnitario = Number(produto.preco);
    const subtotal = quantidade * precoUnitario;
    total += subtotal;

    itensCalculados.push({
      produto,
      quantidade,
      precoUnitario,
      subtotal
    });
  }

  const pedido = await Pedido.create({
    clienteId,
    total,
    status: 'CRIADO'
  });

  // Incrementar métrica de pedidos
  ordersTotal.inc({ status: pedido.status });

  for (const item of itensCalculados) {
    await PedidoItem.create({
      pedidoId: pedido.id,
      produtoId: item.produto.id,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      subtotal: item.subtotal
    });
  }

  const pedidoCompletos = await Pedido.findByPk(pedido.id, {
    include: [
      { model: Cliente },
      { model: Produto }
    ]
  });

  return res.status(201).json(pedidoCompletos);
}

module.exports = {
  listar,
  criar
};



