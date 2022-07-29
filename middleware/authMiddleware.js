const jwt =require("jsonwebtoken")
const User = require("../models/User")

const requireAuth = async (req, res, next) => {
    const userToken = req.cookies.jwt
    if(userToken) {
        const {id} = jwt.verify(userToken, process.env.JWT_SECRET)
        try {
            // With the retrieved id from token, check if user exists in database
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

module.exports = requireAuth