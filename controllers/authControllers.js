const User = require("../models/User")
const validator = require("validator") // For check if email is valid format
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// Controllers
// -------------------------------------------------------------

// Show signup form
// ******************
const signup_get = (req, res) => {
    res.render("auth/signup", {title: "Sign up"})
}

// Show login form
// ******************
const login_get = (req, res) => {
    res.render("auth/login", {title: "Log in"})
}

// Sign up - create user in db
// *****************************
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

// Log in. Check credentials and log in
// **************************************
const login_post = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(user) {
            const auth = await bcrypt.compare(password, user.password)
            if(auth) {
                const token = createToken(user._id)
                res.cookie("jwt", token, { httpOnly: true, maxAge: daysInSecs * 1000 })
                return res.redirect("/")
            }
        }
        res.status(400).render("auth/login", {title: "Log in", error: "email or password incorrect", email})
    } catch (error) {
        res.status(400).render("auth/login", {title: "Log in", error})
    }
}

// Log out
// ******************
const logout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/")
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
    login_post,
    logout
}