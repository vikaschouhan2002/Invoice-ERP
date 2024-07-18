import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Admin from '../../model/Admin.js';
dotenv.config();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
export const authentication = async(request,response)=>{
    try{
        const {token} = request.body;
        if(token){
            jwt.verify(token,ADMIN_SECRET_KEY,async(error,payload)=>{
                if(error){
                    console.log("error ",error);
                    response.status(203).json({message:'token in not authentic'});
                }
                else{
                    const data = await Admin.findOne({
                        $and:[
                            {email:payload.email},
                            {isDeleted : false}
                    ]});
                    if(data && data.isEnabled === true){
                        response.status(201).json({message:'authenticated',data,token});
                    }
                    else{
                        response.status(206).json({message:'your account not enabled'})
                    }
                }
            })
        }
        else{
            response.status(204).json({message:'token is empty'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while authenticating'});
    }
}