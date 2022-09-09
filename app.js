//const { application } = require("express");
const express = require("express");
const morgan=require("morgan");
const productRouter = require("./routes/productRoutes");
const app = express();
//const module=require("module");

//Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req,res,next)=>{
  req.requestTime=new Date ().toISOString();
  next();
});

//routes
app.use("/api/v1/products/",productRouter);

//console.log(module);

module.exports=app;



