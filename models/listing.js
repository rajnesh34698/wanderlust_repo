const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");


const listingSchema=new Schema({
    title:{
        type:String,
       // required:true, eski jarurat nahi kyunki schema validation kar diya from joy
    },
    description:{
        type:String,
       // required:true,
    },
    image:{
        
        //default:"default link",
        //set:(v)=>v===""?"default link":v,
       // required:true,
       url:String,
       filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
    
})
const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;
