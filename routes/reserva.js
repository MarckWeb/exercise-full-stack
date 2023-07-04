const express = require('express')
const reservas = express.Router();

reservas.get('/', (req, res)=>{
    req.app.locals.db.collection('reserva').find().toArray((err, data)=>{
        if(err !==undefined){
            throw new Error(err)
        }else{
            //console.log(data)
            res.send(data)
        }
    })
});

reservas.get('/:dni', (req, res)=>{
    console.log(req.params.dni)
    req.app.locals.db.collection('reserva').findOne({cliente:req.params.dni}, (err, data)=>{
        if(err !==undefined){
            throw new Error(err)
        }else{
            //console.log(data)
            res.send(data)
        }
    })
});

reservas.post('/', (req, res)=>{
    //console.log(req.body)
    req.app.locals.db.collection('reserva').insertOne({cliente:req.body.cliente, habitacion:req.body.habitacion, fechaCheckIn:req.body.fechaCheckIn, fechaCheckOut:req.body.fechaCheckOut},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});

reservas.put('/', (req, res)=>{
    //console.log(req.body)
    req.app.locals.db.collection('reserva').updateOne({habitacion:req.body.habitacion}, {$set:{cliente:req.body.newCliente, fechaCheckIn:req.body.newFechaCheckIn, fechaCheckOut:req.body.newFechaCheckOut}},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});

reservas.delete('/borrar', (req, res)=>{
    //console.log(req.body)
    req.app.locals.db.collection('reserva').deleteOne({habitacion:req.body.habitacionN},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});


module.exports = reservas;