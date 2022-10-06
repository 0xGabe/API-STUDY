const express = require("express");
const server = express();

// Permite a receber parametros em de JSON 
server.use(express.json());

const users = ["Admin","Gabe","john"];

// CRUD -> Create, Read, Update e Delete

//  Read
server.get('/users', (req, res)=>{
    return res.json(users);
})

// Create | Body parameter
server.post('/users', (req, res)=> {
    const { user } = req.body;
    users.push(user);
    
    return res.json(users);
})

// Update 
server.put('/users/:index', (req, res)=> {
    const { index } = req.params;
    const { user } = req.body;
    
    users[index] = user;
    
    return res.json(users);
})


// Delete
server.delete('/users/:index', (req, res)=> {
    const { index } = req.params;
    const { user } = req.body;

    if(users[index] == user){
        users.splice(index, 1);
        return res.json("User delete!");
    }else{
        return res.json("User not delete!");
    }
    ;
})


server.listen(9000);