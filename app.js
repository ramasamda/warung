require('dotenv').config()  // panggil dotenv paling atas

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const route = require('./route')
const cors = require('cors')
const path = require('path')

const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack))

// Contoh ngecek waktu server sekali aja
client.query('SELECT NOW()')
  .then(res => console.log('Server time:', res.rows[0]))
  .catch(err => console.error(err))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(express.json());
app.use(route)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('apaaaa')
})
