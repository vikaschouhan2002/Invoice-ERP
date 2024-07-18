import express from 'express';
import { addCurrency, deleteCurrency, getCurrencies, updateCurrency } from '../../controller/Currency/Currency.js';
const routes = express.Router();

    routes.post("/addCurrency",addCurrency);
    routes.get("/getCurrencies",getCurrencies);
    routes.put("/updateCurrency/:id",updateCurrency);
    routes.delete("/deleteCurrency/:id",deleteCurrency);

export default routes;