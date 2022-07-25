const express = require("express")
const app = express()

// Set EJS to be the view engine
app.set("view engine", "ejs")


// Dummy data to pass to the "ejs" template
const data = [
    {name: "Hugo", country: "Argentina"}, 
    {name: "John", country: "Spain"},
    {name: "Catalina", country: "Rusia"}
]

// Routes
app.get("/", (req, res)=>{
    res.render("index", {data})
})

app.get("/about", (req, res)=>{
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