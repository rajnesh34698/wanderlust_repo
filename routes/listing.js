const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
 const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");


const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})





//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//router.route use karenge same route par jane wali get aur post request ke liye
router
.route("/")
//index route
.get(wrapAsync(listingController.index))
//Create route
.post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingController.createListing));

router
.route("/:id")
//specific listing show route
.get(wrapAsync(listingController.showListing))
//update route
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
//delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));






//index route
//router.get("/",wrapAsync(listingController.index));
   
   //specific listing show route
 //  router.get("/:id",wrapAsync(listingController.showListing));
   
   //Create Route
//   router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));
   //Edit Route
   router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
   //update route
//   router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
   //delete route
//   router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
  

   module.exports=router;