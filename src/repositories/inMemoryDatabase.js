// Banco de dados em memória para simplificar o exemplo e focar em observability

const produtos = [
  { id: 1, nome: 'Hambúrguer Clássico', preco: 25.9 },
  { id: 2, nome: 'Batata Frita Média', preco: 9.9 },
  { id: 3, nome: 'Refrigerante Lata', preco: 6.5 }
];

const clientes = [];
const pedidos = [];

module.exports = {
  produtos,
  clientes,
  pedidos
};


