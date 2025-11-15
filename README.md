# FastFood API 🍔

API simples de sistema de pedidos (FastFood) construída em **Node.js + Express** com **MySQL**.  
Tudo roda **100% local** via Docker Compose.

---

## ✅ O que tem no projeto

- **API REST** com endpoints de:
  - Produtos
  - Clientes
  - Pedidos
- **MySQL** como banco de dados
- **Swagger UI** para documentação interativa
- **Docker Compose** para subir tudo com um comando

---

## 🧱 Estrutura do projeto

```text
fastfood-observability/
  ├── src/
  │   ├── controllers/       # Lógica de negócio dos endpoints
  │   ├── models/            # Models do Sequelize (Produto, Cliente, Pedido)
  │   ├── routes/            # Rotas da API
  │   ├── database/          # Configuração do Sequelize + MySQL
  │   ├── swaggerDocs/       # Documentação Swagger
  │   ├── index.js           # Entrypoint da aplicação
  │   └── server.js          # Configuração do Express
  ├── Dockerfile
  ├── docker-compose.yml
  ├── package.json
  └── .env                   # Variáveis de ambiente
```

---

## 🚀 Como rodar

### Opção 1: Docker Compose (recomendado)

**Pré-requisitos:**
- Docker e Docker Compose instalados

**Passos:**

```bash
cd fastfood-observability
docker-compose up -d
```

A API estará disponível em:
- **Swagger**: http://localhost:3000/api-docs
- **Healthcheck**: http://localhost:3000/health

Para ver os logs:
```bash
docker logs -f fastfood-observability-api
```

Para parar:
```bash
docker-compose down
```

---

### Opção 2: Rodar local (sem Docker)

**Pré-requisitos:**
- Node.js 18+
- MySQL 8.0 rodando localmente (com as credenciais do `.env`)

**Passos:**

```bash
cd fastfood-observability
npm install
npm start
```

A API estará disponível em http://localhost:3000

---

## 📘 Endpoints disponíveis

Acesse o **Swagger** em http://localhost:3000/api-docs para testar interativamente:

### Health
- `GET /health` - Verifica se a API está rodando

### Produtos
- `GET /api/produtos` - Lista todos os produtos
- `POST /api/produtos` - Cria um novo produto

### Clientes
- `GET /api/clientes` - Lista todos os clientes
- `POST /api/clientes` - Cadastra um novo cliente

### Pedidos
- `GET /api/pedidos` - Lista todos os pedidos
- `POST /api/pedidos` - Cria um novo pedido

---

## 🗄️ Banco de dados

O `docker-compose.yml` já sobe um MySQL 8.0 automaticamente com:

- **Database**: `fastfood`
- **Usuário**: `fastfood`
- **Senha**: `fastfood`
- **Porta**: `3306`

O Sequelize cria as tabelas automaticamente na primeira execução.

---

## 🛠️ Tecnologias

- **Node.js** + **Express**
- **MySQL** (via Sequelize ORM)
- **Swagger** (documentação)
- **Docker** + **Docker Compose**

---

## 📄 Licença

MIT
