import express from 'express';
import { addClient, deleteClientController, getClientData, updateClientController } from '../../controller/Client/Client.js';
var routes = express.Router();

routes.post("/addClient",addClient);
routes.get("/getClient",getClientData);
routes.put("/updateClientData/:id",updateClientController);
routes.delete("/deleteClient/:id",deleteClientController);

export default routes;