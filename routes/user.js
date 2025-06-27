const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync")
const flash = require("connect-flash")
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js")

//signup
router.get("/signup", userController.renderSignupForm )

//signup routes
router.post("/signup", wrapAsync (userController.signup))

//login
router.get("/login", userController.renderLoginForm )

// Login routes
router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash: true
    }),
    userController.login
)


//logout
router.get("/logout", userController.logout )


module.exports  = router