import express from 'express';
import { addTax, deleteTax, getTaxes, updateTaxes } from '../../controller/Tax/Tax.js';
var routes = express.Router();

routes.post("/addTax",addTax);
routes.get("/getTax",getTaxes);
routes.put("/updateTax/:id",updateTaxes);
routes.delete("/deleteTax/:id",deleteTax);

export default routes;