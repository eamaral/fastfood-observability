const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'fastfood',
  process.env.DB_USER || 'fastfood',
  process.env.DB_PASS || 'fastfood',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

const MAX_RETRIES = Number(process.env.DB_MAX_RETRIES || 10);
const RETRY_DELAY_MS = Number(process.env.DB_RETRY_DELAY_MS || 3000);

async function connectDB(retries = MAX_RETRIES) {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com o MySQL estabelecida com sucesso.');
      await sequelize.sync();
      console.log('✅ Sincronização do Sequelize concluída.');
      return;
    } catch (error) {
      retries -= 1;
      console.error(`❌ Erro ao conectar no MySQL: ${error.message}`);
      if (retries === 0) {
        console.error('❌ Número máximo de tentativas excedido. Encerrando aplicação.');
        process.exit(1);
      }

      console.log(`⏳ Nova tentativa de conexão em ${RETRY_DELAY_MS / 1000}s... (${retries} tentativas restantes)`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

module.exports = { sequelize, connectDB };


