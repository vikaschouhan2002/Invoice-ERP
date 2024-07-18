import express from 'express';
import { adminProfile } from '../../middleware/uploads.js';
import { addNewAdmin, deleteAdminController, getAdminController, login, registerData, updateAdminController , updatePassword } from '../../controller/Admin/adminController.js';
import { authentication } from '../../controller/Admin/authentication.js';
var routes = express.Router();

routes.post("/register",registerData);
routes.post("/auth",authentication); 
routes.post("/login",login);
routes.post("/addNewAdmin",adminProfile,addNewAdmin);
routes.get("/getAdmindata",getAdminController);
routes.put("/updateAdmin/:id",adminProfile,updateAdminController);
routes.put("/updatePassword/:id",updatePassword);
routes.delete("/deleteAdmin/:id",deleteAdminController);

export default routes;
