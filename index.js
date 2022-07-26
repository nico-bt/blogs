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

//Middleware & static files
app.use(express.static("public"))

app.use((req,res,next) => {
    console.log(req.method, req.url)
    next()
})

// Routes
app.get("/", (req, res)=>{
    res.render("index", {data, title:"Home"})
})

app.get("/about", (req, res)=>{
    res.render("about", {title:"About"})
})

app.get("/blogs/create", (req, res)=>{
    res.render("create", {title:"Add new person"})
})

app.use((req, res)=>{
    res.status(404).render("404")  
})

app.listen(3000, ()=>{
    console.log("Listening in port 3000")
})