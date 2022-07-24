const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.sendFile("./views/index.html", {root: __dirname})
})

app.get("/about", (req, res)=>{
    // res.send("<h1>About Page</h1>")
    res.sendFile("./views/about.html", {root: __dirname})
})

app.use((req, res)=>{
    res.status(404).sendFile("./views/404.html", {root: __dirname})  
})

app.listen(3000, ()=>{
    console.log("Listening in port 3000")
})