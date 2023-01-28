const sanitizer = require("perfect-express-sanitizer");
const express =  require("express")
const cors = require('cors')

//defining app
const app =  express()

// Middleware
app.use(sanitizer.clean({
    sql: true,
    sqlLevel: 4
}));
app.use(cors({
    origin: '*'
}));

app.get("/", (req,res) =>{
    res.status(200).send('==== xX_ Welcome to the Boiler plate API _Xx ====')
})

//export app
module.exports = app