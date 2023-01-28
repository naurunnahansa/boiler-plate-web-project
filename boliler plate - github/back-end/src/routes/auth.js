const app = require('./../app')
const db = require('./../db')
const utils = require('./../utils/utils')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

SECRET = process.env.SECRET

app.post("/api/auth/token", utils.jsonParser ,async (req,res) =>{
    email = req.body.email
    password = md5(req.body.password)
    
    var select = 'SELECT * FROM user WHERE email=? AND password=?'
    let data = undefined
    try{
        data = await db.get(select, [email, password]);
        if(data == undefined){return res.send("Invalid credentials")}
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL SELECT")
    }
    delete data.password

    data.type = "access"
    data.expiresIn = new Date().getTime() + 15*60*1000
    accessToken = jwt.sign(data,SECRET,{expiresIn:"15m"})
    
    data.type = "refresh"
    data.refreshCount = 0
    data.expiresAt = new Date().getTime() + 30*60*60*1000
    data.createdAt = new Date().getTime()
    data.expiresIn = 30*60*60*1000
    
    refreshToken = jwt.sign(data,SECRET,{expiresIn:data.expiresIn})
    return res.send({accessToken,refreshToken})
})
app.post("/api/auth/register", utils.jsonParser ,async (req,res) =>{
    username = req.body.username
    email = req.body.email
    password = md5(req.body.password)
    
    var insert = `INSERT INTO user (username, email, password, type, createdAt, updatedAt) VALUES (?,?,?,'user',datetime('now','0 day','localtime'),NULL)`
    try{
        await db.push(insert, [username,email,password])
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL insert")
    }
    return res.status(201).send("created new User: "+username)
})
app.post("/api/auth/token/refresh", utils.jsonParser ,async (req,res) =>{
    let refresh = undefined
    try{refresh = jwt.verify(req.body.refreshToken,SECRET)}catch(e){console.log(e); return res.status(401).send("invalid refresh token")}
    if(refresh.type!="refresh"){return res.status(400).send("Token type not refresh")}

    var select = `SELECT * FROM blacklistedTokens WHERE token=?`
    try{
        data = await db.all(select, [req.body.refreshToken])
        if(data.length>=1){return res.status(401).send("refresh token blacklisted")}
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL SELECT")
    }

    var insert = "INSERT INTO blacklistedTokens (token) VALUES (?)"
    try{
        await db.push(insert, [req.body.refreshToken])
    }catch(e){
        console.log(e)
        return res.send("somthing went wrong: SQL insert")
    }

    refresh.refreshCount = refresh.refreshCount+1
    refresh.expiresIn = refresh.expiresAt - new Date().getTime()
    delete refresh.iat; delete refresh.exp;
    refreshToken = jwt.sign(refresh,SECRET,{expiresIn:refresh.expiresIn})

    let access = refresh
    delete access.expiresAt;delete access.expiresIn;delete access.createdAt;delete access.refreshCount
    access.type = "access"
    accessToken = jwt.sign(access,SECRET,{expiresIn:"1h"})

    return res.send({accessToken,refreshToken})
})
