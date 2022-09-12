const fs = require("fs");
const Product =require("../models/Product");

//Handlers

exports.getAllProducts=async(req, res) => {
  
    const products= await Product.find();
    res.status(200).json({
      status: "success",
      timeOfRequest:req.requestTime,
      results: products.length,
      data: {     
        products,
      },
    });
  }
  
exports.addProduct= async(req,res)=>{

  const newProduct=await Product.create(req.body);

    
    res.status(200).json({
      status:"success",
      data:{
        product:newProduct,
      }
    });
};
  
exports.getProductById=async(req, res) => {

  const foundProduct=await Product.findById(req.params.id);
   
    //const foundProduct=products.find(p=>p.id==req.params.id);
    if(foundProduct){
        return res.status(200).json({
          status: "success",
          data: {
             products:foundProduct,
          },
        });  
    }
    //console.log(req.params);
    res.status(404).json({
      status: "not found"
    });
  };
  

  exports.deleteProductById=(req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    var productsDelete=[];
    let findValue=0;
    for (let [i,product] of products.entries()) {

      if(product.id == req.params.id) {
     
        delete products[i];
        findValue=1;
        
      } else {
        productsDelete.push(product);

      }

    }
    if(findValue){

      return res.status(200).json({
        status: "success",
        data: {
           products:productsDelete,
        }
      });  
    }else{
      res.status(404).json({
        status: "not found"
      });
    }    
  };

  exports.updateProductById=async(req, res) => {

    const updateProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    // const products = JSON.parse(
    //   fs.readFileSync(`${__dirname}/../data/products.json`)
    // );
    // var newProduct=req.body;
    /*var productsDelete=[];
    let findValue=0;
    for (let [i,product] of products.entries()) {

      if(product.id == req.params.id) {
     
        newProduct.id=req.params.id;
         products[i]=newProduct;
        findValue=1;
        
      }

    }*/
    if(updateProduct){

      return res.status(200).json({
        status: "success",
        data: {
           product:updateProduct,
        }
      });  
    }/*else{
      res.status(404).json({
        status: "not found"
      });
    } */  
  };
