const Joi = require('joi');

const listingSchema=Joi.object({
    listing:Joi.object({          //jab bhi request aaye usme listing naam ki object honi hi honi chahiye
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        //image:Joi.string().allow("",null)
        image:Joi.object({
            url:Joi.string().required(),
            filename:Joi.string().required(),
        }).required()
    }).required() //matlab sabkuch khali data enter kar diya to error message aayega ki listing is required matlab listing karne aaye aur vo hi nahi ki
});

module.exports=listingSchema;

const reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required(),
    }).required()///review naam ki object honi hi honi chahiye
});

module.exports=reviewSchema;