const express = require("express");
const bcrypt = require("bcrypt");

const login = express.Router();

login.get('/', (req, res)=>{
    req.app.locals.db.collection('user').find().toArray((err,datos)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.send(datos)
        }
    })
})

login.post("/user", (req, res) => {
    console.log(req.body)
    const { name, password, email } = req.body;
    let contraseniaCifrada = bcrypt.hashSync(password, 10);
    console.log(contraseniaCifrada)
    req.app.locals.db.collection("user").insertOne({
    name: name, email:email, password: contraseniaCifrada
    }, (err, data) => {
        if (err !== undefined) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

login.post('/login', (req, res)=>{
    console.log(req.body)
    let name = req.body.username
    let password = req.body.password
    req.app.locals.db.collection("user").findOne({name:name },(err, data) => {
        if (err !== undefined) {
            throw new Error(err)
        }else{
            if(data === null){
                res.status(404).send("User not found")
            }else{
                //console.log(data)
                let coincidence = bcrypt.compareSync(password, data.password)
                if(coincidence){
                    console.log(data)
                    res.send(data)
                }else{
                    res.send(err)
                }
            }
        }
    })

})
module.exports = login;