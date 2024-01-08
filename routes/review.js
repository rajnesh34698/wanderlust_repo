const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
//const validateReview=(req,res,next)=>{
//    console.log(req.body);
//    +console.log(reviewSchema.validate(req.body));
    //let{error}=reviewSchema.validate(req.body);
    //console.log(error);
    //if(error){
    //  throw new ExpressError(400,error);
    //}else{
    //  next();
   // }
  //}
  

//Review 
//Post route
router.post("/",wrapAsync(async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
  
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
  }));
  //Review
  //Delete Route
  router.delete("/:reviewId",wrapAsync(async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
  }));

  module.exports=router;