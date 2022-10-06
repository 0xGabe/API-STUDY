const express = require('express');
const server = express();

server.use(express.json());

server.get('/',(req,res) => {
    return res.json({server: "ok"});
});

// Path Parameters
server.get('/list/:id',(req,res) => {
    const id = req.params.id;

    return res.json({"id": id});
});

// Query Parameters
server.get('/name',(req,res) => {
    const name = req.query.name;
    const age = req.query.age;

    return res.json({"name": name, "age":age});
});

// Post Parameters Body
server.post('/user/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    return res.json({"name": name, "age":age, "create":true});

})


server.listen(9000);