import  ProductCategory  from "../../model/ProductCategory.js";

export const addNewCategory = async(request,response)=>{
    try{
        let data = request.body;
        data = await ProductCategory.create(data);        
        response.status(201).json({message:'category created',data});
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while add category'});
    }
}

export const getProductCategory = async(request,response)=>{
    try{
        const { createdBy } = request.query;
        const productcategory = await ProductCategory.find({
            isDeleted:false,
            createdBy:createdBy
        });
        const totalRecords = productcategory.length;

        if(productcategory.length>0)
            response.status(200).json({productcategory , totalRecords});
        else
            response.status(203).json({message:'collection is empty'});
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while fetching category'});
    }
}

export const updateProductCategory = async(request,response)=>{
    try{
        const { createdBy } = request.query;
        const id = request.params.id;
        const data = request.body;
        
        console.log("data : ",data);
        const updateData = await ProductCategory.findOneAndUpdate({_id:id},{
            $set:data
        });

        if(updateData!==null)
           response.status(200).json({updateData,message:'data updated'});
        else
           response.status(203).json({message:'no data found'});

    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while updating data'});
    }
}

export const deleteProductCategory = async(request,response)=>{
     try{
         const id = request.params.id;
         const updateData = await ProductCategory.findOneAndUpdate({_id:id},{
            "$set":{
                isDeleted:true
            }
         });

         if(updateData!==null){
            response.status(200).json({message:'data delted',updateData}); 
         }
         else{
            response.status(204).json({message:'data not found'});
         }
     }catch(error){
         console.log("error : ",error);
         response.status(500).json({message:'error while deleting categroy'});
     }
}