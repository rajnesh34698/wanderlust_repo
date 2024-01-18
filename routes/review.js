const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

  

//Review 
//Post route
router.post("/",isLoggedIn,wrapAsync(async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=res.locals.currUser._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    

    await newReview.save();
    await listing.save();
    
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
  }));
  //Review
  //Delete Route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
  }));

  module.exports=router;