const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
 const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");


//index route
router.get("/",wrapAsync(listingController.index));
   //New Route
   router.get("/new",isLoggedIn,listingController.renderNewForm);
   //specific listing show route
   router.get("/:id",wrapAsync(listingController.showListing));
   
   //Create Route
   router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));
   //Edit Route
   router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
   //update route
   router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
   //delete route
   router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
  

   module.exports=router;