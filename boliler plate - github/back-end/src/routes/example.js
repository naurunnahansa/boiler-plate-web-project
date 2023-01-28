const app = require('./../app')
const db = require('./../db')
const utils = require('./../utils/utils')

// GET request: get id -> user <join> example
app.get("/api/example/",utils.jsonParser , async (req,res) =>{
    token = utils.verifyHeader(req)
    if(token==undefined){return res.status(401).send("invalid token")}

    var select = `SELECT * FROM example`

    try{
        data = await db.all(select, [req.params.id])
        return res.status(200).send(data)
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL SELECT")
    }
})
app.get("/api/example/:id",utils.jsonParser , async (req,res) =>{
    token = utils.verifyHeader(req)
    if(token==undefined){return res.status(401).send("invalid token")}

    var select = `SELECT * FROM example WHERE id=?`

    try{
        data = await db.all(select, [req.params.id])
        return res.status(200).send(data)
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL SELECT")
    }
})

//POST request example
app.post("/api/example/",utils.jsonParser , async (req,res) =>{
    token = utils.verifyHeader(req)
    if(token==undefined){return res.status(401).send("invalid token")}

    var insert = "INSERT INTO example (user_id, exampleData, created_at, updated_at) VALUES (?,?,datetime('now','0 day','localtime'),NULL)"
    try{
        let data = req.body
        console.log(req.body)
        await db.push(insert, [token.id, data.exampleData])
    }catch(e){
        console.log(e)
        return res.send("somthing went wrong: SQL insert")
    }

    return res.status(201).send(req.body)
})

//PUT request example
app.put("/api/example/:id",utils.jsonParser , async (req,res) =>{
    token = utils.verifyHeader(req)
    if(token==undefined){return res.status(401).send("invalid token")}
    
    var update = "UPDATE example SET exampleData=?, updated_at = datetime('now','0 day','localtime')  WHERE id=?"
    try{
        await db.push(update, [req.body.exampleData,req.params.id])
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL insert")
    }

    return res.status(202).send({"id":req.params.id,"exampleData":req.body.exampleData})
})

//DELETE request example
app.delete("/api/example/:id",utils.jsonParser , async (req,res) =>{
    token = utils.verifyHeader(req)
    if(token==undefined){return res.status(401).send("invalid token")}

    var deleteQuery = "DELETE FROM example WHERE id=?"
    try{
        await db.push(deleteQuery, [req.params.id])
    }catch(e){
        console.log(e)
        return res.status(500).send("somthing went wrong: SQL DELETE")
    }

    res.status(202).send("Successfull deleted Item: "+req.params.id)
})