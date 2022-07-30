const Blog = require("../models/Blog")


// GET all blogs
// -------------------------------------------------------------------
const getAllBlogs = (req, res) => {
    Blog.find({}).sort({createdAt: -1})
        .then((result)=>{
            res.render("index", {data: result, title:"Blogs"})
        })
        .catch(err =>{
            console.log(error)
            res.status(404).render("404")
        })
}

//Show form to add new blog
// -------------------------------------------------------------------
const showForm = (req, res) =>{
    res.render("create", {title: "Add New Blog"})
}

// Create a blog
// -------------------------------------------------------------------
const createBlog = (req, res)=>{
    const newBlog = new Blog(req.body)
    newBlog.save()
        .then(() => res.redirect("/"))
        .catch(err => console.log(err)) 
}

// Get single blog
// -------------------------------------------------------------------
const getBlog = (req, res) => {
    Blog.findById(req.params.id)
        .then(response => {
            res.render("blog", {blog: response, title: "Blog"})
        })
        .catch(err => {
            console.log(err)
            res.status(404).render("404")
        })
}

// Delete a blog
// -------------------------------------------------------------------
const deleteBlog = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() =>{
            res.redirect("/")
        })
        .catch(err => {
            console.log(err)
            res.status(404).render("404")
        })
}

// Show Form with actual info to edit blog
// -------------------------------------------------------------------
const showEditForm = (req,res)=> {
    Blog.findById(req.params.id)
        .then( blog => {
            res.render("showEditForm", {title: "Edit", blog})
        })
        .catch( err => {
            res.status(404).render("404")
        })
    }
    
// Edit blog
// -------------------------------------------------------------------
const editBlog = (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedBlog => res.redirect(`/blogs/${updatedBlog._id}`))
    .catch( err => {
        res.status(404).render("404")
    })
}


module.exports = {
    getAllBlogs,
    showForm,
    createBlog,
    getBlog,
    deleteBlog,
    showEditForm,
    editBlog
}