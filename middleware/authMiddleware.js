const jwt =require("jsonwebtoken")
const User = require("../models/User")

// Check credentials with jsonwebtoken in cookie.jwt. If not valid, redirect to "/"
// -------------------------------------------------------------------------------------
const requireAuth = async (req, res, next) => {
    const userToken = req.cookies.jwt
    if(userToken) {
        const {id} = jwt.verify(userToken, process.env.JWT_SECRET)
        // With the retrieved id from token, check if user exists in database
        try {
            const user = await User.findById(id)
            if(user) {
                next()
            } else {
                res.redirect("/login")
            }
        } catch (error) {
            
        }
    } else {
        res.redirect("/login")
    }
}

// If user is logged in, get user data and pass it to the view (res.locals.user)
// -------------------------------------------------------------------------------------
const getUserInfo = async (req, res, next) => {
    const userToken = req.cookies.jwt
    if(!userToken){
        return next()
    }
    const {id} = jwt.verify(userToken, process.env.JWT_SECRET)
    // With the retrieved id from token, check if user exists in database
    try {
        const user = await User.findById(id)
        if(user) {
            res.locals.user = user
            return next()
        }
    } catch (error) {
        console.log(error)
    }
    next()
}


module.exports = {requireAuth, getUserInfo}