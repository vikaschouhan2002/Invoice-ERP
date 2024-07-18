import express from 'express';
import { addProducts, deleteProducts, getProducts, updateProducts } from '../../controller/Product/Product.js';
var router = express.Router();

router.post("/addProduct",addProducts);
router.get("/getProducts",getProducts);
router.put("/updateProduct/:id",updateProducts);
router.delete("/deleteProduct/:id",deleteProducts);

export default router;