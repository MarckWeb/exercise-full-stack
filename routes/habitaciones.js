const express = require('express')
const habitaciones = express.Router();

habitaciones.get('/', (req, res)=>{
    req.app.locals.db.collection('habitacion').find().toArray((err, data)=>{
        if(err !==undefined){
            throw new Error(err)
        }else{
            //console.log(data)
            res.send(data)
        }
    })
});

habitaciones.post('/', (req, res)=>{
    req.app.locals.db.collection('habitacion').insertOne({habitacionN:req.body.habitacionN, estado:req.body.estado},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});

habitaciones.put('/actualizar', (req, res)=>{
    //console.log(req.body)
    req.app.locals.db.collection('habitacion').updateOne({habitacionN:req.body.habitacionN}, {$set:{estado:req.body.newEstado}},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});

habitaciones.delete('/', (req, res)=>{
    
    req.app.locals.db.collection('habitacion').deleteOne({habitacionN:req.body.habitacion},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});


module.exports = habitaciones;