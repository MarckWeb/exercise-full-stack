const express = require('express')
const clientes = express.Router();

clientes.get('/', (req, res)=>{
    req.app.locals.db.collection('clients').find().toArray((err, data)=>{
        if(err !==undefined){
            throw new Error(err)
        }else{
            //console.log(data)
            res.send(data)
        }
    })
});

clientes.post('/', (req, res)=>{
    req.app.locals.db.collection('clients').insertOne({nombre:req.body.nombre, apellido:req.body.apellido, dni:req.body.dni},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            req.app.locals.db.collection('clients').find().toArray((err, data)=>{
                if(err !==undefined){
                    throw new Error(err)
                }else{
                   // console.log(data)
                    res.send(data)
                }
            })
           // res.send(data)
        }
    })
});

clientes.put('/', (req, res)=>{
    console.log(req.body)
    req.app.locals.db.collection('clients').updateOne({dni:req.body.oldDni}, {$set:{nombre:req.body.newNombre, apellido:req.body.newApellido, dni:req.body.newDni}},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});

clientes.delete('/', (req, res)=>{
    req.app.locals.db.collection('clients').deleteOne({dni:req.body.dni},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        }else{
            res.send(data)
        }
    })
});


module.exports = clientes;