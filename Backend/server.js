import express from 'express';
import cors from 'cors';
import connect from './connection/connection.js';
import Company from './routes/Company/companyRoute.js';
import People  from './routes/People/peopleRoutes.js';
import Client from './routes/Client/Client.js';
import Lead from './routes/Lead/Lead.js';
import Offer from './routes/Offer/offerRouter.js';
import Tax from './routes/Tax/Tax.js';
import Admin from './routes/Admin/adminRoute.js';
import ExpenseCategory from './routes/Expenses/ExpensecategoryRoute.js';
import Expenses from './routes/Expenses/Expenses.js';
import ProductCatrgory from './routes/Product/Product_Category.js';
import Product from './routes/Product/Product.js';
import PaymentMode from './routes/Payment/Payment_Mode.js';
import Payment from './routes/Payment/Payment.js';
import Currency from './routes/Currency/Currency.js';
import Invoice from './routes/Invoice/Invoice.js'
var server = express();
server.use(cors());
server.use(express.urlencoded({extended:true}));
server.use(express.json());

server.use('/admin',Admin);
server.use("/company",Company);
server.use('/client',Client);
server.use('/currency',Currency);
server.use('/expensecategory',ExpenseCategory);
server.use('/invoice',Invoice)
server.use('/expenses',Expenses);
server.use('/lead',Lead);
server.use('/offer',Offer);
server.use("/people",People);
server.use('/productcategory',ProductCatrgory);
server.use('/product',Product);
server.use('/paymentmode',PaymentMode);
server.use('/payment',Payment);
server.use('/public/uploads', express.static('public/uploads'));
server.use('/tax',Tax);


server.listen(3001,()=>{
    console.log("server start at 3001");
})