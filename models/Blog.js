const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps:true})

const Blog = mongoose.model("Blog", BlogSchema)

module.exports = Blog