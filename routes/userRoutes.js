const express=require("express");
const userController=require("./../controllers/userController");
const userRouter=express.Router();

//Routes
userRouter
    .route("/")
    //.get(userController.getAllUsers)
    .post(userController.addUser);
//productRouter.post("/",addProduct);
/*productRouter.route("/:id")
    .get(userController.getProductById)
    .delete(userController.deleteProductById)
    .put(userController.updateProductById);*/
//

module.exports= userRouter;  
