
const app = require('./app')
require("dotenv").config()
require('./db')
require('./routes/auth')
require('./routes/example')

PORT = process.env.PORT||"3000"

app.listen(PORT,()=>{
    console.log("LISTENING ON PORT " + PORT)
})