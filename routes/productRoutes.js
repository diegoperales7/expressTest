const express=require("express");
const productController=require("../controllers/productController");
const productRouter=express.Router();

//Routes
productRouter.route("/")
    .get(productController.getAllProducts)
    .post(productController.addProduct);
//productRouter.post("/",addProduct);
productRouter.route("/:id")
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .put(productController.updateProductById);
//



module.exports= productRouter;  
