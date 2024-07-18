import express from "express";
import {
  addOfferController,
  deleteOffer,
  getOffer,
  getOfferById,
  updateOffer,
} from "../../controller/Offer/OfferController.js";
var routes = express.Router();

routes.post("/addOffer", addOfferController);
routes.get("/getOffer", getOffer);
routes.get("/getOfferById/:id", getOfferById);
routes.put("/updateOffer/:id", updateOffer);
routes.delete("/deleteOffer/:id", deleteOffer);

export default routes;
