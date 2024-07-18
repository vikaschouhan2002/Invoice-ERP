import express from 'express';
import { addLeadController,deleteLeadController,getLeadController, updateLeadController } from '../../controller/Lead/LeadController.js';

var router = express.Router();

router.post("/addLead",addLeadController);
router.get("/getLeads",getLeadController);
router.put("/updateLead/:id",updateLeadController);
router.delete("/deleteLead/:id",deleteLeadController)

export default router;