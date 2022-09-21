const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:[true,"price is required"]
        
    },
    quantity:{
        type:Number,
        required:true
        
    }

});

const Product = mongoose.model("Product",productSchema);

module.exports=Product;