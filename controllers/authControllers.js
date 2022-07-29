const User = require("../models/User")
const validator = require("validator") // For check if email is valid format
const jwt = require("jsonwebtoken")


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

    const {error, type} = checkEmailPassword_AreValid(email, password)
    if(error){
        return res.status(400).render("auth/signup", {title: "Sign up", email, error, type})
    }
    
    try {
        const newUser = await User.create({email, password})
        const token = createToken(newUser._id)
        // Pass token in a cookie ("name", "value", {options})
        res.cookie(
            "jwt", 
            token, 
            { httpOnly: true, maxAge: daysInSecs * 1000 }
        )
        res.status(201).redirect("/")
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).render("auth/signup", {title: "Sign up", error: `${email} is already registered`, type:"email"})
        }
        res.status(400).render("auth/signup", {error: err})
    }
}

const login_post = (req, res) => {
    const {email, password} = req.body
    res.send(`email: ${email} - password: ${password}`)
}

//Helper functions
// -------------------------------------------------------------
function checkEmailPassword_AreValid(email, password) {
    let error = ""
    let type = ""
    if(!email){
        error = "Please enter an email"
        type = "email"
        return {error, type}
    }
    if ( !validator.isEmail(email) ) {
        error = "Please enter a valid email"
        type = "email"
        return {error, type}
    }
    if (!password || (password.length <6) ) {
        error = "Please enter a password, minimum length of 6 characters"
        type = "password"
        return {error, type}
    }
    return {error, type}
}

const daysInSecs = 3 * 24 * 60 * 60
function createToken(id){
    // ({payload}, "secret", {options - ej: duración en segundos})
    return jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: daysInSecs } )
}


module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}