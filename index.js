const express = require('express')
const mongodb = require('mongodb-legacy')
const cors = require('cors')
const bcrypt = require('bcrypt')

const clientes = require('./routes/clientes')
const habitaciones = require('./routes/habitaciones')
const reservas = require('./routes/reserva')
const login = require('./routes/login')

const app = express()
const MongoClient = mongodb.MongoClient;

app.listen(3000)
app.use(cors())
app.use(express.static('public'))
app.use(express.json())


//routers
app.use('/api/clientes', clientes)
app.use('/api/habitaciones', habitaciones)
app.use('/api/reservas', reservas)
app.use('/api/login', login)

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
    if (err !== undefined) {
        throw new Error(err)
    } else {
        app.locals.db = client.db('hotel')
    }
})






