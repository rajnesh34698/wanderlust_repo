const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
 const {isLoggedIn}=require("../middleware.js");

//const validateListing=(req,res,next)=>{
//    let{error}=listingSchema.validate(req.body);
//    if(error){
//      let errMsg=error.details.map((el)=>{el.message}).join(",");
//      throw new ExpressError(400,error);
//    }else{
//      next();
//    }
//  }


//index route
router.get("/",wrapAsync(async (req,res,next)=>{
    const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
   }));
   //New Route
   router.get("/new",isLoggedIn,(req,res,next)=>{
    try {
      console.log(req.user);
     res.render("listings/new.ejs");
    } catch (err) {
     next(err);
    } 
   });
   //specific listing show route
   router.get("/:id",wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id).populate("reviews");
     if(!listing){
      req.flash("error","Listing you requested for does not exist");
      res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});
   }));
   
   //Create Route
   router.post("/",isLoggedIn,wrapAsync(async(req,res,next)=>{
       //let result=listingSchema.validate(req.body); // yah code joi use kiya to hi likha hai+niche ki teen line bhi
       //if(result.error){
       //  throw new ExpressError(400,result.error);
      // }
       //console.log(result);
       let listing=req.body.listing;//listing ek object aayi hai print kara ke check kar sakte hai
       // if(!listing){
       //  throw new ExpressError(400,"validation failed");
       // } ab iska kaam joi kar raha hai jiska code schema.js me likha hai  
       let listing1=new Listing(listing);
       
     await listing1.save();
     req.flash("success","New Listing Created");
     res.redirect("/listings");
   }));
   //Edit Route
   router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     let listing=await Listing.findById(id);
     if(!listing){
      req.flash("error","Listing you requested for does not exist");
      res.redirect("/listings");
     }
     res.render("listings/edit.ejs",{listing});
   }));
   //update route
   router.put("/:id",isLoggedIn,wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     let listing=req.body.listing;
     if(!listing){
       throw new ExpressError(400,"validation failed");
     };
     console.log(listing);
     await Listing.findByIdAndUpdate(id,listing,{runValidators:true,new:true});
     //the above statement can also be executed through destructuring
     //await Listing.findByIdAndUpdate(id,{...listing},{runValidators:true,new:true});
     req.flash("success","Listing Updated");
     res.redirect(`/listings/${id}`);
     
   }));
   //delete route
   router.delete("/:id",isLoggedIn,wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted");
    res.redirect("/listings");
   }));
  

   module.exports=router;