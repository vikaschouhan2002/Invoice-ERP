import Expense from '../../model/Expenses.js';

export const addExpenses = async(request,response)=>{
    try{
        let data = request.body;
        data = await Expense.create(data);
        response.status(201).json({message:'data addedd'});
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while adding expenses'});
    }
}

export const getExpenses = async(request,response)=>{
    try{
        const expenseData = await Expense.aggregate([
            {
                $match : {isDeleted : false}
            },
            {
                $lookup :{
                    from :'expensescategories',
                    localField : 'ExpenseCategory',
                    foreignField  : '_id',
                    as:'categoryData'
                }
            },
            {
                $lookup :{
                    from :'currencies',
                    localField : 'Currency',
                    foreignField  : '_id',
                    as:'currencyData'
                }
            },
            {
                $addFields : {
                    "categoryName" : {$arrayElemAt : ["$categoryData.name",0]},
                    "currencyName" : {$arrayElemAt : ["$currencyData.currencyName",0]}
                }
            },
            {
                $project:{
                    categoryData:0,
                    currencyData:0
                }
            }
        ]);
         if(expenseData.length>0){
            response.status(200).json({expenseData});
         }else {
            response.status(203).json({message:'collection is empty'});
         }
    }catch(error){
        console.log("error while fetching data : ",error);
        response.status(500).json({message:'error while fetching data'});
    }
}

export const updateExpenses = async(request,response)=>{
    try{
        const {id} = request.params;
        let data = request.body;
        console.log("data : ",data);
        data = await Expense.findOneAndUpdate({_id:id},{$set:data});        
        if(data){
            response.status(200).json({message:'data updated ',data})
        }
        else{
            response.status(203).json({message:'data not found'});
        }
    }catch(error){
        console.log("error while updating Dta : ",error);
        response.status(500).json({message:'error while updating expense'});
    }
}

export const deleteExpense = async(request,response)=>{
    try{
        const {id} = request.params;
        const data = await Expense.findOneAndUpdate({_id:id},{
            $set:{isDeleted:true}
        });

        if(data){
            response.status(200).json({message:'data deleted ',data});
        }
        else{
            response.status(204).json({message:'data not found'});
        }
    }catch(error){
        console.log("error while deleting ",error);
    }
}