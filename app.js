const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=8080;

app.set("view engine","ejs");
const path=require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"public")));



const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");



const ExpressError=require("./utils/ExpressError.js");


const session=require("express-session");
const flash=require("connect-flash");


const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./'models/user.js");




main()
.then((res)=>{
    console.log("connection with database formed successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};


const sessionOptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()*7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
  }
};
app.get("/",(req,res)=>{
  res.send("Hi,I am root");
});


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  //console.log(res.locals.success);
  next();
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
  let{status=500,message="some error occured"}=err;
  
  res.status(status).render("error.ejs",{err});
});

app.listen(port,(req,res)=>{
  console.log(`server listening to the port ${port}`);
});