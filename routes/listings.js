const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema} = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner} = require("../middleware.js")
const review = require("../models/review.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })



const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body)

    if(error) {
        throw new ExpressError(400,error)
    } else {
        next()
    }

}

// Index route
router.get("/", wrapAsync(listingController.index))

// Search suggestions API
router.get("/suggestions", wrapAsync(listingController.searchSuggestions))

// Search route
router.get("/search", wrapAsync(listingController.searchListings))

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm)


//show route
router.get("/:id", wrapAsync(listingController.showListing))

// create route
router.post("/", upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))

//update route
router.put("/:id", isLoggedIn,isOwner,upload.single('listing[image]'),  validateListing, wrapAsync(listingController.updateListing))

//delete route
router.delete("/:id", isLoggedIn,isOwner,  wrapAsync(listingController.destroyListing))

module.exports = router