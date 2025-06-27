const Listing = require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// Index route module
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", { allListings })
}

// New route module
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
}

//show route module
module.exports.showListing = async (req, res) => {
    let { id } = req.params
    const listings = await Listing.findById(id)
        .populate({
            path: "reviews", 
            populate: { path: "author" }
        })
        .populate("owner")
    
    if (!listings) {
        req.flash("error", "Listing does not exist")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listings })
}

//create route module
module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send()

    let url = req.file.path
    let filename = req.file.filename

    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    newListing.image = {url, filename}

    // Set geometry and coordinates separately
    newListing.geometry = response.body.features[0].geometry

    let saveListing = await newListing.save()
    console.log(saveListing)
    
    req.flash("success", "New listing created")
    res.redirect("/listings")
}

//edit route module
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    
    if (!listing) {
        req.flash("error", "Listing does not exist")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs", { listing })
}

//update route module
module.exports.updateListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })

    if(typeof req.file !== "undefined") {
        let url = req.file.path
        let filename = req.file.filename

        listing.image = {url, filename}

        await listing.save()
    }
    

    req.flash("success", "Listing updated")
    res.redirect(`/listings/${id}`)
}

//delete route module
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params
    let deletedListing = await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted")
    res.redirect("/listings")
}