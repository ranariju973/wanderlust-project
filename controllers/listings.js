const Listing = require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// Index route module
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({})
    
    // Handle search query if it exists
    const { search } = req.query;
    if (search) {
        // Create a case-insensitive regex search pattern
        const searchPattern = new RegExp(search, 'i');
        
        // Search in title, location, and country fields
        allListings = await Listing.find({
            $or: [
                { title: searchPattern },
                { location: searchPattern },
                { country: searchPattern }
            ]
        });
    }
    
    res.render("listings/index.ejs", { allListings, searchQuery: search || "" })
}

// Search suggestions API
module.exports.searchSuggestions = async (req, res) => {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
        return res.json([]);
    }
    
    try {
        // Create a case-insensitive regex search pattern
        const searchPattern = new RegExp(q, 'i');
        
        // Find unique titles, locations, and countries that match the query
        const titleResults = await Listing.find({ title: searchPattern }, 'title').limit(5);
        const locationResults = await Listing.find({ location: searchPattern }, 'location').limit(5);
        const countryResults = await Listing.find({ country: searchPattern }, 'country').limit(5);
        
        // Extract unique values
        const titles = [...new Set(titleResults.map(item => item.title))];
        const locations = [...new Set(locationResults.map(item => item.location))];
        const countries = [...new Set(countryResults.map(item => item.country))];
        
        // Combine results and limit to 10 suggestions
        const suggestions = [
            ...titles.map(title => ({ text: title, type: 'title' })),
            ...locations.map(location => ({ text: location, type: 'location' })),
            ...countries.map(country => ({ text: country, type: 'country' }))
        ].slice(0, 10);
        
        res.json(suggestions);
    } catch (err) {
        console.error("Error fetching search suggestions:", err);
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
}

// Search route module
module.exports.searchListings = async (req, res) => {
    const { search } = req.query;
    
    if (!search) {
        return res.redirect("/listings");
    }
    
    // Create a case-insensitive regex search pattern
    const searchPattern = new RegExp(search, 'i');
    
    // Search in title, location, and country fields
    const searchResults = await Listing.find({
        $or: [
            { title: searchPattern },
            { location: searchPattern },
            { country: searchPattern }
        ]
    });
    
    res.render("listings/index.ejs", { 
        allListings: searchResults, 
        searchQuery: search
    });
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