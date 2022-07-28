const signup_get = (req, res) => {
    res.render("auth/signup", {title: "Sign up"})
}

const login_get = (req, res) => {
    res.render("auth/login", {title: "Log in"})
}

const signup_post = (req, res) => {
    res.send("new user created")
}

const login_post = (req, res) => {
    res.send("user logged in")
}


module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}