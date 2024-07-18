import express from 'express';
var routes = express.Router();
import { addPeopleController,deletePeople,getPeopleDataController,updatePeopleController } from '../../controller/People/peoplecontroller.js';

routes.post("/addPeople",addPeopleController);
routes.get("/getPeopleData",getPeopleDataController);
routes.put("/updatePeopleData/:id",updatePeopleController);
routes.delete("/deletePeopleData/:id",deletePeople);
export default routes;