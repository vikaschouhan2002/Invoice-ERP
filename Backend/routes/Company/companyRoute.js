import express from 'express';
import { addCompany,deleteCompany,getCompany,updateDataController } from '../../controller/Company/Companycontroller.js';
const routes = express.Router();

routes.post("/addCompany",addCompany);
routes.get("/getCompanyData",getCompany);
routes.put("/updateCompanyData/:id",updateDataController);
// routes.get("/getData/:id",getDatabyid);
routes.delete("/deleteCompanyData/:id",deleteCompany);

export default routes;