const express = require("express")
const app = express()

// Set EJS to be the view engine
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/about", (req, res)=>{
    // res.send("<h1>About Page</h1>")
    // res.sendFile("./views/about.html", {root: __dirname})
    res.render("about")
})

app.get("/blogs/create", (req, res)=>{
    res.render("create")
})

app.use((req, res)=>{
    res.status(404).render("404")  
})

app.listen(3000, ()=>{
    console.log("Listening in port 3000")
})