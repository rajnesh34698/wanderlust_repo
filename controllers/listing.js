const Listing=require("../models/listing.js");
module.exports.index=async (req,res,next)=>{
    const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
   }