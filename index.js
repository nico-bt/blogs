const express = require("express")
const app = express()

// Set EJS to be the view engine
app.set("view engine", "ejs")


// Dummy data to pass to the "ejs" template
const data = [
    {title: "Borges Quotes", shortDescription: "Some quotes from the writer", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque suscipit recusandae modi?"}, 
    {title: "Random ideas into text", shortDescription: "Ideas, where do they come from?", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque suscipit recusandae modi?"} 
]

//Middleware & static files
app.use(express.static("public"))

// Routes
app.get("/", (req, res)=>{
    console.log(data)
    res.render("index", {data, title:"Blogs"})
})

app.get("/about", (req, res)=>{
    res.render("about", {title:"About"})
})

app.get("/blogs/create", (req, res)=>{
    res.render("create", {title:"Add new blog"})
})

app.use((req, res)=>{
    res.status(404).render("404")  
})

app.listen(3000, ()=>{
    console.log("Listening in port 3000")
})