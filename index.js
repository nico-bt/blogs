const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.send("<h1>Home Page</h1>")
})

app.get("/about", (req, res)=>{
    res.send("<h1>About Page</h1>")
})

app.use((req, res)=>{
    res.status(404).send("<h1>Not Found</h1>")    
})

app.listen(3000, ()=>{
    console.log("Listening in port 3000")
})