const mongoose=require("mongoose");
const app  =require("./app");
const Product =require("./models/Product");
const port = process.env.PORT;
mongoose.connect(process.env.DATABASE,{}).then((con)=>{
  console.log("Conected to mongo");
  // const p=new Product({productName:"product 3",price:20});
  // p.save().then(()=>{
  //   console.log("saved");
  // })
  
}) 

app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });