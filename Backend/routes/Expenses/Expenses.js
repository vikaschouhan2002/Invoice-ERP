import express from 'express';
import { addExpenses,getExpenses,updateExpenses,deleteExpense } from '../../controller/Expenses/Expenses.js';

var routes = express.Router();

routes.post("/addExpense",addExpenses);
routes.get("/getExpenses",getExpenses);
routes.put("/updateExpense/:id",updateExpenses);
routes.delete("/deleteExpense/:id",deleteExpense);

export default routes;

