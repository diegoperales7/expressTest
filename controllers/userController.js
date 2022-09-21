const fs = require("fs");
const User =require("../models/User");
const crypto = require("crypto");
const catchAsync =require("../utils/catchAsync");

//Handlers

exports.getAllUsers=catchAsync(async(req, res) => {
  
    const users= await User.find();
    res.status(200).json({
      status: "success",
      timeOfRequest:req.requestTime,
      results: users.length,
      data: {     
        users,
      },
    });
  });
  
exports.addUser= catchAsync(async(req,res)=>{
    req.body.password=crypto
        .createHash("sha256") 
        .update(req.body.password)
        .digest("hex");
    
    let newUser=await User.create(req.body);
    
    newUser=newUser.toObject();
    delete newUser.password;
    res.status(200).json({
        status:"success",
        data:{
          user:newUser,
        }
    });
});
  
exports.getUserById= catchAsync(async(req, res) => {
  const foundUser=await User.findById(req.params.id);
    if(foundUser){
        return res.status(200).json({
          status: "success",
          data: {
             users:foundUser,
          },
        });  
    }else{

      res.status(404).json({
        status: "not found",
      });
    }
  });
  

  exports.deleteUserById=catchAsync(async(req, res) => {
    const id = req.params.id;
    const deleteUser = await User.deleteOne({_id: id})
    if(deleteUser){

      return res.status(200).json({
        status: "success",
        data: {
           users:deleteUser,
        }
      });  
    }
    res.status(404).json({
      status: "not found"
    });
      
  });

  exports.updateUserById=catchAsync(async(req, res) => {
    const updateUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(updateUser){

      return res.status(200).json({
        status: "success",
        data: {
           user:updateUser,
        }
      });  
    }else{
      res.status(404).json({
        status: "not found"
      });
    } 
 });
