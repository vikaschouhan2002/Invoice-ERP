import express from 'express';
import { addNewCategory, deleteExpenseCategory, getExpenseCategory, updateExpenseCategory } from '../../controller/Expenses/Expense_Category_Controller.js';
var routes = express.Router();

routes.post("/addNewCategory",addNewCategory);
routes.get("/getExpenseCategory",getExpenseCategory);
routes.put("/updateCategory/:id",updateExpenseCategory);
routes.delete("/deleteCategory/:id",deleteExpenseCategory);

export default routes;