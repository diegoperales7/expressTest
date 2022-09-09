const fs = require("fs");

//Handlers

exports.getAllProducts=(req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    //console.log(req);
  
    res.status(200).json({
      status: "success",
      timeOfRequest:req.requestTime,
      results: products.length,
      data: {     
        products,
      },
    });
  }
  
exports.addProduct=(req,res)=>{
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/products.json`,JSON.stringify(products));
    res.status(200).json({
      status:"success",
      data:{
        products,
      }
    });
};
  
exports.getProductById=(req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    const foundProduct=products.find(p=>p.id==req.params.id);
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

  exports.updateProductById=(req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    var newProduct=req.body;
    var productsDelete=[];
    let findValue=0;
    for (let [i,product] of products.entries()) {

      if(product.id == req.params.id) {
     
        newProduct.id=req.params.id;
         products[i]=newProduct;
        findValue=1;
        
      }

    }
    if(findValue){

      return res.status(200).json({
        status: "success",
        data: {
           products:products,
        }
      });  
    }else{
      res.status(404).json({
        status: "not found"
      });
    }    
  };
