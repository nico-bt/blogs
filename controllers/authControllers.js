const User = require("../models/User")
const validator = require("validator") // For check if email is valid format


// Controllers
// -------------------------------------------------------------
const signup_get = (req, res) => {
    res.render("auth/signup", {title: "Sign up"})
}

const login_get = (req, res) => {
    res.render("auth/login", {title: "Log in"})
}

const signup_post = async (req, res) => {
    const {email, password} = req.body

    const error = checkEmailPassword_AreValid(email, password)
    if(error){
        return res.status(400).json({error})
    }
    
    try {
        const newUser = await User.create({email, password})
        res.status(201).json(newUser)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({error: "That email is already registered"})
        }
        res.status(400).json(error)        
    }
}

const login_post = (req, res) => {
    const {email, password} = req.body
    res.send(`email: ${email} - password: ${password}`)
}

//Helper function
// -------------------------------------------------------------
function checkEmailPassword_AreValid(email, password) {
    let error = ""
    if(!email){
        error = "Please enter an email"
        return error
    }
    if ( !validator.isEmail(email) ) {
        error = "Please enter a valid email"
        return error
    }
    if (!password || (password.length <6) ) {
        error = "Please enter a password, minimum length of 6 characters"
        return error
    }
}


module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}