const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

// Create a secret key to JWT
const JWTSecret = "admin" // Week password to brute JWT (ONLY FOR STUDY)

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())


function auth(req, res, next){
    const authToken = req.headers['authorization']
    next()
}


var fake_db = {
    users: [
        {
            id: 1,
            name: "admin",
            role: "admin",
            password: "secret"
        },
        {
            id: 2,
            name: "gabe",
            role: "user",
            password: "gabe-fakedb"
        },
        {
            id: 3,
            name: "kleber",
            role: "user",
            email: "teste@teste.com",
            password: "teste"
        }
    ]
}

//  List all clients
app.get("/clients",auth,(req,res) =>{
    res. statusCode = 200
    res.json(fake_db.users) 
})

// List clients with ID
app.get("/clients/:id",(req,res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var clients = fake_db.users.find(g => g.id == id)

        if(clients != undefined){
            res.statusCode = 200
            res.json(clients)
        }else{
            res.sendStatus(404)
        }
    }
})

// Create a new client
app.post("/clients",(req,res) => {
    var {name,role,password} = req.body

    fake_db.users.push({
        id: 4,
        name,
        role,
        password
    })
    res.sendStatus(200)
})

// Delete one user via ID
app.delete("/clients/:id",(req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index = fake_db.users.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            fake_db.users.splice(index,1)
            res.sendStatus(200)
        }
    }
})

// Change info of one client
app.put("/clients/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var clients = fake_db.users.find(g => g.id == id)

        if(clients != undefined){
            var {name,role,password} = req.body
            if(name != undefined){
                clients.name = name
            }
            if(role != undefined){
                clients.role = role
            }
            if(password != undefined){
                clients.password = password
            }
            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
    }
})

app.post("/auth",(req, res) =>{
    var{email, password} = req.body

    if(email != undefined){
        
        var user = fake_db.users.find(u => u.email == email)
        if(user != undefined){
                if(user.password == password){
                    
                    // Set up JWT
                    jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'48h'},(error, token) => {
                        if(error){
                            res.status(401)
                            res.json({error: "No permission"})
                        }else{
                            res.status(200)
                            res.json({token: token})
                        }
                    })

                }else{
                    res.status(404)
                    res.json({error: "E-MAIL OU SENHA INVALIDO"})
            }
        }else{
            res.status(404)
            res.json({error: "E-MAIL OU SENHA INVALIDO"})
        }
    }else{
        res.status(404)
        res.json({error: "E-MAIL OU SENHA INVALIDO"})
    }

})

app.listen(9000,() =>{
    console.log("Go!")
})