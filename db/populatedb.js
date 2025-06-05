require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');
  } catch (err) {
    console.error('❌ Connection error:', err);
  } finally {
    await sequelize.close();
  }
}

testConnection();