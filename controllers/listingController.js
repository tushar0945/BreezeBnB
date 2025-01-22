const { response } = require("express");
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { layout } = require("ejs-mate");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  res.locals.showSearchBar = true;
  res.locals.showNewlistingOption = true;
  res.locals.showSignup = true;
  res.locals.showLogin = true;
  let { category, query } = req.query;
  query = query ? query.trim() : "";
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (query) {
    filter.$or = [
      { title: { $regex: new RegExp(query, "i") } }, // Partial match anywhere in title
      { location: { $regex: new RegExp(query, "i") } }, // Partial match anywhere in location
    ];
  }

  const allListings = await Listing.find(filter);
  if (req.headers["x-requested-with"] === "XMLHttpRequest") {
    return res.render("partials/listings.ejs", {
      allListings,
      useLayout: false,
    });
  }
  // if (req.xhr || req.accepts("json") === "application/json") {
  //   console.log("before partial render ");
  //   console.log(allListings);
  //   return res.render("partials/listings", { allListings });
  // }
  // if (req.xhr || req.haders["x-requested-with"] === "XMLHttpsRequest") {
  //   return res.render("partials/listings.ejs", { allListings, layout: false });
  // }
  const noResultsMessage =
    allListings.length === 0 ? "No listings match your search." : null;
  res.render("listings/index.ejs", {
    allListings,
    query,
    useLayout: true,
    noResultsMessage,
  });
};

module.exports.newListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  res.locals.showNewlistingOption = true;
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Requested listing does not exists!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let georesponse = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = georesponse.body.features[0].geometry;

  if (Array.isArray(req.body.listing.category)) {
    newListing.category = req.body.listing.category;
  } else if (req.body.listing.category) {
    newListing.category = [req.body.listing.category];
  }

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Requested listing does not exists!");
    res.redirect("/listings");
  }
  let originalImgUrl = listing.image.url;
  originalImgUrl = originalImgUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edite.ejs", { listing, originalImgUrl });
};

module.exports.updatetListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (
    req.body.listing.location &&
    req.body.listing.location !== listing.location
  ) {
    let georesponse = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    listing.geometry = georesponse.body.features[0].geometry;
    console.log(listing.geometry);
    listing.location = req.body.listing.location;
    await listing.save();
    console.log(listing.geometry);
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  //console.log(deletedListing);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
