const mongoose = require("mongoose")
const express = require("express")
const app = express()
var methodOverride = require('method-override') // Allows sending PUT and DELETE requests actions in a form.
const cookieParser = require("cookie-parser") // Add cookie to res, req objects. res.cookie() to set one. req.cookies() to get them.

const { getAllBlogs} = require("./controllers/blogControllers")
const { getUserInfo } = require("./middleware/authMiddleware")

//.env file
require("dotenv").config()

// Set EJS to be the view engine
app.set("view engine", "ejs")

//Middleware & static files
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))  // override with POST having ?_method=DELETE
app.use(express.json())
app.use(cookieParser())

// Routes
// ---------------------------------------------------
app.use(require("./routes/authRoutes"))

app.get("*", getUserInfo)

app.get("/about", (req, res)=>{
    res.render("about", {title:"About"})
})

app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.use("/blogs", require("./routes/blogRoutes"))

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
