const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const route = require('./route')
const cors = require('cors')
const path = require('path')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(express.json());
app.use(route)

require('dotenv').config()

const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

client.connect()

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error', err.stack)
  } else {
    console.log('Connected to PostgreSQL. Server time:', res.rows[0])
  }
  client.end() // jangan lupa tutup koneksi
})


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.get(('/'),(req,res)=>{
    res.send('apaaaa')
})