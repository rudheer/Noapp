const express= require("express")
const UserRoute = require("./routes/UserRoutes")
const app=express()
const mongoose=require("mongoose")
const ContactRoute = require("./routes/ContactRoutes")

app.use(express.json())

app.use("/users",UserRoute)
app.use("/contact",ContactRoute)

mongoose.connect("mongodb://sonu:pamar@sonu-database-shard-00-00.osqzv.mongodb.net:27017,sonu-database-shard-00-01.osqzv.mongodb.net:27017,sonu-database-shard-00-02.osqzv.mongodb.net:27017/?ssl=true&replicaSet=atlas-vsu12n-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000,()=>{
        console.log("server started on port 5000")
    })
})
.catch((err)=>{
    console.log(err);
})

