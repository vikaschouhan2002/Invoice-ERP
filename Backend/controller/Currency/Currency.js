import Currency  from "../../model/Currency.js";

export const addCurrency = async(request,response)=>{
    try{
        let data = request.body;
        console.log('data:-',data);
        data = Currency.create(data);
        if(data)
            response.status(201).json({message:'currency added'});
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while adding data'});
    }
}

export const getCurrencies = async(request,response)=>{
    try{
        const { createdBy } = request.query;
        console.log('createdBy:-',createdBy);
        const currencyData = await Currency.find({
            isDeleted:false,
            createdBy:createdBy
        });
        const totalRecords = currencyData.length;
        if(currencyData.length>0){
            response.status(200).json({currencyData, totalRecords});
        }
        else{
            response.status(204).json({message:'collection is empty'});
        }
    }catch(error){
        console.log("error while fetching : ",error);
        response.status(500).json({message:'error while fetching'});
    }
}

export const updateCurrency = async(request,response)=>{
    try{
        const data = request.body;
        const id = request.params.id;
        
        const update = await Currency.findOneAndUpdate({_id:id},{
            $set:data
        });

        if(update){
            response.status(200).json({message:'data updated'});
        }
        else{
            response.status(204).json({message:'data not found'});
        }

    }catch(error){
        console.log("error while updating : ",error);
        response.status(500).json({message:'error while update'});
    }
}

export const deleteCurrency = async(request,response)=>{
    try{
        const id  = request.params.id;
        const deleteData = await Currency.findOneAndUpdate({_id:id},{
            $set:{
                isDeleted : true
            }
        });
        
        if(deleteData){
            response.status(200).json({message:'data deleted'});
        }
        else{
            response.status(204).json({message:'data not found'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while deleting '});
    }
}