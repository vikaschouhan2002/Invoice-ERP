import Quote  from "../../model/Quote.js";

export const addQuoteController = async(request,response)=>{
    try{
        let data = request.body;
        console.log("data : ",data);
        data = await Quote.create(data);
        response.status(201).json({message:'data added',data});
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while add Quote'});
    }
}

export const getQuote = async(request,response)=>{
    try{
        const QuoteData = await Quote.aggregate([
            {
                $match : {
                    isDeleted : false,
                    isExpired : false
                }
            },
            {
                $lookup:{
                    from : 'currencies',
                    localField : "currency",
                    foreignField : "_id",
                    as:'leadData'
                }
            },
            {
                $lookup:{
                    from : 'currencies',
                    localField : "currency",
                    foreignField : "_id",
                    as:'currencyData'
                }
            },
            {
                $lookup:{
                    from : 'tax',
                    localField : "tax",
                    foreignField : "_id",
                    as:'taxData'
                }
            },
            {
                $lookup:{
                    from : 'admins',
                    localField : "createdBy",
                    foreignField : "_id",
                    as:'adminData'
                }
            },
        ]);
        console.log("QuoteData : ",QuoteData);
        if(QuoteData && QuoteData.length > 0){
            response.status(200).json({QuoteData});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while fetching'});
    }
}

export const updateQuote = async(request,response)=>{
    try{
        const id = request.params.id;
        let data = request.body;
        console.log("id : ",id);
        console.log("data : ",data);
        const updateData = await Quote.findOneAndUpdate({_id:id},{
           $set:data
        });
        if(updateData){
            console.log("update Data : ",updateData);
            response.status(200).json({message:"data updated"});
        }
        else{
            response.status(204).json({message:'data not found'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while updating'});
    }
}

export const deleteQuote = async(request,response)=>{
    try{
        const id = request.params.id;
        const deleteQuote = await Quote.findOneAndUpdate({_id:id},{
            $set:{isDeleted:true}
        });
        if(deleteQuote){
            response.status(200).json({message:'data deleted',deleteQuote});
        }
        else{
            response.status(203).json({message:'data not found'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while deleting'});
    }
}