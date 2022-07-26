const mongoose = require("mongoose")
const Blog = require("./models/Blog")
const { getAllBlogs, createBlog, showForm, getBlog, deleteBlog} = require("./controllers/blogControllers")
const express = require("express")
const app = express()
var methodOverride = require('method-override')

//.env file
require("dotenv").config()

// Set EJS to be the view engine
app.set("view engine", "ejs")

//Middleware & static files
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))  // override with POST having ?_method=DELETE


// Routes
// ---------------------------------------------------
app.get("/about", (req, res)=>{
    res.render("about", {title:"About"})
})

app.get("/", getAllBlogs)

app.get("/blogs/create", showForm)

app.post("/blogs", createBlog)

app.get("/blogs/:id", getBlog)

app.delete("/blogs/:id", deleteBlog)

app.use((req, res)=>{
    res.status(404).render("404")  
})


// Connect to MongoDB and Run app
mongoose.connect(process.env.MONGO_URI)
    .then( ()=>{
        app.listen(3000, ()=>{
            console.log("Connected to MongoDB & Listening in port 3000")
        })
    })
    .catch(err => console.log(err))
