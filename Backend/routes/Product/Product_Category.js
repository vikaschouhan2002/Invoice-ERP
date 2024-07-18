import express from 'express';
import { addNewCategory, deleteProductCategory, getProductCategory, updateProductCategory } from '../../controller/Product/Product_Category.js';
var routes = express.Router();

routes.post("/addNewCategory",addNewCategory);
routes.get("/getProductCategory",getProductCategory);
routes.put("/updateCategory/:id",updateProductCategory);
routes.delete("/deleteCategory/:id",deleteProductCategory);

export default routes;