import express from 'express';
import { addInvoiceController, deleteInvoice, getInvoice, getInvoiceById, updateInvoice } from '../../controller/Invoice/Invoice.js';
var routes = express.Router();

routes.post("/addInvoice",addInvoiceController);
routes.get("/getInvoice",getInvoice);
routes.get("/getInvoiceById/:id",getInvoiceById);
routes.put("/updateInvoice/:id",updateInvoice);
routes.delete("/deleteInvoice/:id",deleteInvoice);

export default routes; 