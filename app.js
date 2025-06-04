const express = require('express')
const app = express()
const port = 3000
const route = require('./route')
const cors = require('cors')
const path = require('path')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(express.json());
app.use(route)

app.listen(port,()=>{
    console.log(`app is listening on ${port}`)
})
app.get(('/'),(req,res)=>{
    res.send('apaaaa')
})