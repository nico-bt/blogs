const mongoose = require("mongoose")
const Blog = require("./models/Blog")
const express = require("express")
const app = express()


//.env file
require("dotenv").config()

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
    Blog.find({}).sort({createdAt: -1})
    .then((result)=>{
        res.render("index", {data: result, title:"Blogs"})
    })
    // console.log(data)
    // res.render("index", {data, title:"Blogs"})
})

app.get("/about", (req, res)=>{
    res.render("about", {title:"About"})
})

app.get("/blogs/create", async (req, res)=>{
    const newBlog = new Blog(
        {
            title: "Something NEW", 
            shortDescription: "Some quotes from the writer", 
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque suscipit recusandae modi?"
        }
    )
    newBlog.save().then(()=>res.redirect("/")) 
    // res.render("create", {title:"Add new blog"})
})

app.use((req, res)=>{
    res.status(404).render("404")  
})

mongoose.connect(process.env.MONGO_URI)
.then(
    ()=>{
        app.listen(3000, ()=>{
            console.log("Connected to MongoDB & Listening in port 3000")
        })
    }
)
.catch(err => console.log(err))
