const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("./../models/listing.js");
main()
.then((res)=>{
    console.log("connection with database formed successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};
console.log(initdata);
const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"65a143757342b8331fb332d2"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};
initDB();
