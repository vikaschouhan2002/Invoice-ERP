import express from 'express';
import { addNewMode, deletePaymentMode, getPaymentMode, updatePaymentMode } from '../../controller/Payment/PaymentMode.js';
var routes = express.Router();

routes.post("/addNewMode",addNewMode);
routes.get("/getModes",getPaymentMode);
routes.put("/updateMode/:id",updatePaymentMode);
routes.delete("/deleteMode/:id",deletePaymentMode);

export default routes;