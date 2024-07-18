import PaymentMode from "../../model/PaymentMode.js";

export const addNewMode = async(request,response)=>{
    try{
        let data = request.body;
        if(data.Default === true)
            await PaymentMode.updateMany({$set:{isDefault:false}});
        
        await PaymentMode.create(data);
        response.status(201).json({message:'Payment Mode added'}); 
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({messgae:'error while adding'});
    }
}

export const getPaymentMode = async(request,response)=>{
    try{
        const { createdBy } = request.query;
        const payementmodeData = await PaymentMode.find({
            isDeleted:false,
            createdBy:createdBy
        });
        const totalRecords = payementmodeData.length;
        if(payementmodeData.length>0){
            response.status(200).json({payementmodeData , totalRecords });
        }
        else{
            response.status(204).json({message:'collection is empty'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while fetching data'});
    }
}

export const updatePaymentMode = async(request,response)=>{
    try{
        const id = request.params.id;
        let data = request.body;
        console.log("data : ",data);
        const update = await PaymentMode.findOneAndUpdate({_id:id},{
            $set:data
        });
           
            if(update){
                if(update.isDefault === true && data.isDefault === false){
                    const result = await PaymentMode.findOneAndUpdate({isDeleted:false},{$set:{isDefault:true}} , { returnOriginal: false });
                    console.log("result : ",result);
                }
                else if(data.isDefault === true){
                    await PaymentMode.updateMany({_id:{$ne:id}},{$set:{isDefault:false}});
                }
                response.status(200).json({message:'data updated'});
            }
            else{
                response.status(204).json({message:'data not found'});
            }        

    }catch(error){
        console.log("error occured ",error);
        response.status(500).json({message:'error while fetching data'});
    }
}

export const deletePaymentMode = async(request,response) => {
    try{
        const id = request.params.id;
        const data = await PaymentMode.findOneAndUpdate({_id:id},{
            $set:{
                isDeleted : true
            }
        });
        
        if(data){
            if(data.Default === true){
                const result = await PaymentMode.findOneAndUpdate({isDeleted:false},{$set:{isDefault:true}} , { returnOriginal: false });
                console.log("result : ",result);
            }
            response.status(200).json({message:'data deleted'});
        }
        else{
            response.status(203).json({message:'data not found'});
        }

    }catch(error){
        console.log("error ",error);
        response.status(500).json({message:'error while deleting '});
    }
}