const Listing=require("../models/listing.js");

module.exports.index=async (req,res,next)=>{
    const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
   }

module.exports.renderNewForm=(req,res,next)=>{
    try {
     res.render("listings/new.ejs");
    } catch (err) {
     next(err);
    } 
   }

module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
     path:"reviews",
     populate:{
       path:"author",
     }
    })
    .populate("owner");
    //ye upar vale populate listing se hi associate hai
    if(!listing){
     req.flash("error","Listing you requested for does not exist");
     res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
  }

  module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
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
    listing1.owner=req.user._id;
    listing1.image={url,filename};
  await listing1.save();
  req.flash("success","New Listing Created");
  res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
     req.flash("error","Listing you requested for does not exist");
     res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    let imageUrl= originalImageUrl.replace("/upload","/upload/e_unsharp_mask,h_300,w_250")
    res.render("listings/edit.ejs",{listing,imageUrl});
  }

  module.exports.updateListing=async(req,res,next)=>{
  
    let {id}=req.params;
    //let listing=req.body.listing;
    //if(!listing){
    //  throw new ExpressError(400,"validation failed");
    //}; vaise hi schema me joi ki help se validation laga rakha hai to iski jarurat nahi
    //console.log(listing);
    
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true,new:true});
    if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    //the above statement can also be executed through destructuring
    //await Listing.findByIdAndUpdate(id,{...listing},{runValidators:true,new:true});
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
    
  }
  
  module.exports.destroyListing=async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
   res.redirect("/listings");
  }