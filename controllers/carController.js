const catchAsync = require("../utils/catchAsync");
const Product = require('../models/Product');
const User = require('../models/User');
const Car = require('../models/Car');
const { default: mongoose } = require("mongoose");


exports.getAllCar = catchAsync(async (req, res) => {
  const products = await Car.find();
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

const createCar = async (user, product) => {
    const createCar = await Car.create({user:user.userName, status:"pending", products:product});
    return createCar;
  }

const addProductToCar = async (product) => {
  const newProductOnCar = await Car.updateOne({$push:{products:product}});
  return newProductOnCar;
}

const checkProducts = async (product)=>{
    const findProduct = await Product.findOne(product);
    if(findProduct){
      const addProductOnCar = addProductToCar(findProduct);
      return addProductOnCar;
    }
    const message = "No product exists"; 
    return message;
}

const checkProductsOnCar = async (product, user) =>{
  const userAunthenticated = await User.find(user);
  if(userAunthenticated){
    const checkingCar = await Car.findOne(product);
    return checkingCar.products.find(prod => prod.productName == product.productName);
  }

};

const existCar = async (user, product)=>{
  const foundCar = await Car.find({a:1});
  if(foundCar == '')
  {
    return createCar(user, product);
  }else
  {
    return checkProductsOnCar(product, user);
  }
};

exports.addProductToCar = catchAsync(async (req, res) => {
    const userProduct = req.body;
    const user = req.user;
    let message = "";

    await existCar(user, userProduct);

    const product = await checkProductsOnCar(userProduct, user);
    if(product){
      message = "Ya existe ese producto en tu carrito de compras";
      res.status(200).json({
        message: message,
        status: "succes",
        user: user.userName,
        data: {
          product,
        },
      });

    }else{
      message = "Product no exist";
      
      const getCheckProducts = await checkProducts(userProduct)
      const modifyingData = getCheckProducts.modifiedCount
      
      if(typeof(getCheckProducts) == String){
        message = addedProduct
        res.status(400).json({
          message: message,
          status: "fail"
        })
      }else{
        res.status(200).json({
          message: message,
          status: "succes",
          user: user.userName,
          documentModified: modifyingData,
          statusCar:"pending",
        });    
      } 
    }
});

const changeCarStatus = async (user, carStatus, statusByUser) => {
  const searchingUser = await Car.findOne({user});
  const getUserStatus = statusByUser.status;
  if(searchingUser.user == user && carStatus == "pending")
  {
    const changingStatus = await Car.updateOne({status: getUserStatus});
    return changingStatus;
  }
}

exports.payCar = catchAsync(async(req, res) => {
    
    const {userName} = req.user;
    const statusModifiedByUser = req.body;

    const checkingCar = await Car.find({a:1})
    
    if(checkingCar != null)
    {
      const userCar = checkingCar.find(userCar => userCar.user == userName);
      await changeCarStatus(userName,userCar.status, statusModifiedByUser);
      const productPrice = await Car.findOne().select('products');
      const totalPrice = await productPrice.products.reduce((prevPrice, nextPrice) => parseFloat(prevPrice.price + nextPrice.price));
      
      res.status(200).json({

        message:"estado pendiente",
        user: userName,
        status: userCar.status,
        products: productPrice,
        totalPrice: totalPrice,
      });  
    }else{
      res.status(200).json({
        message:"the status is pending, if you want to continue must change the status to pay",
        status: "fail",
      });  
    }
});


async function searchProduct(productId){
    const findCar = await Car.find().select('products');
    const productFound = findCar[0].products.find(prod => prod._id == productId);
    if(productFound)
    {
      return productFound;
    }else
    {
      let message = "Error";
      return message;
    }
}

exports.deleteCar = catchAsync(async (req, res) => {
  const id = req.params.id;
  const {userName} = req.user;
  const product = await searchProduct(id);

  if(typeof(product) == String){
    res.status(200).json({
      message: product,
      status: "succes",
      user: userName,
    });  
  }
  else
  {
    const statusCar = await Car.find().select('status');
    const eraseFile = await Car.updateOne({$pull: {products: product}});

    const {acknowledged, modifiedCount} = eraseFile;

    res.status(200).json({
      status: "succes",
      user: userName,
      statusCar:statusCar[0].status,
      data: {
        acknowledged,
        modifiedCount
      },
    });    
  }
});