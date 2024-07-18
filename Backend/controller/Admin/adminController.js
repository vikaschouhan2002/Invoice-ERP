import Admin from "../../model/Admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
let token;
const expiryTime = {
    expiresIn: '7d'
}


export const registerData = async(request,response)=>{
    try{
        let data = request.body;
        console.log("data : ",data);
        const exist = await Admin.findOne({email:data.email});
         if(!exist){
            data.password = await bcrypt.hash(data.password,10);
            data = await Admin.create(data);
            const expiryTime = {
                expiresIn: '1d'
            }   
            const payload = {
                email : data.email,
                password : data.password
            }
            token = jwt.sign(payload, ADMIN_SECRET_KEY, expiryTime);
            response.status(201).json({message:'Registeration successfully !!',data,token});
         }
         else{
            response.status(203).json({message:'Email already registered'});
         }

    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'Error during registration'});
    }
}


export const login = async(request,response)=>{
    try{
        let data = request.body;
        console.log("data : ",data);
        const exist = await Admin.findOne({email:data.email});
         if(!exist){
            response.status(204).json({message:'Email not matched'});
         }
         else{
            if(!exist.isEnabled){
                response.status(203).json({message:"you don't have  access of login"});
            }
            else{
            const Pass = await bcrypt.compare(data.password,exist.password);
                if(Pass){
                    const payload = {
                        email : exist.email,
                        Password : exist.password
                    }
                    token = jwt.sign(payload, ADMIN_SECRET_KEY, expiryTime);
                    console.log("token : ",token);
                    console.log("exist : ",exist);
                    response.status(201).json({message:'Login successfully !!',exist,token});
                }
                else{
                    response.status(205).json({message:'Password not matched'});
                }
            }
         }

    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error when register'});
    }
}


export const addNewAdmin = async(request,response)=>{
    try{        
        let data = request.body;
        console.log("request.file : ",request.file);
        console.log("data in body : ",data);
        const existAdmin = await Admin.findOne({
            $and:[
                {email:data.email},
                {isDeleted:false}
            ]
        });
        
        if(existAdmin){
            response.status(203).json({message:'email already exist'});
        }
        else{
            console.log("data : ",data.password);
            const password = await bcrypt.hash(data.password,10);
            console.log("data : ",password);
            data.password = password;
            if(request.file)
                data = {...data,['Profile']:request.file.originalname};
            
            data = await Admin.create(data);
            if(data)
                response.status(201).json({message:'data added'});
        }

    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:''})
    }
}


export const getAdminController = async(request,response)=>{
    try{
        const adminData = await Admin.find({
            isDeleted:false
        });
        if(adminData.length>0){
            response.status(200).json({adminData});
        }
        else{
            response.status(203).json({message:'collection is empty'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while fetching data'});
    }
}


export const updateAdminController = async(request,response)=>{
    try{
        let id = request.params.id;        
        let data = request.body;
        console.log("data : ",data);
        
            if(request.file)
                data = {...data,['profile']:request.file.originalname};

            const updated = await Admin.findOneAndUpdate({_id:id},{
                "$set":data
            });

            if(updated)
                response.status(200).json({message:'data updated'});
            else
                response.status(204).json({message:'data not found'});

    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while updating data'});
    }
}


export const updatePassword = async(request,response)=>{
    try{
        const id = request.params.id;
        let password = request.body.Password;
        password = await bcrypt.hash(password,10);
        console.log("password :",password);
        
        const data = await Admin.findOneAndUpdate({_id:id},{$set:{password:password}});
        
        if(data)
          response.status(200).json({message:'data updated ',data});
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while update Password'});
    }
}


export const deleteAdminController = async(request,response)=>{
    try{
        const id = request.params.id;
        const deleteData = await Admin.findOneAndUpdate({_id:id},{
            "$set":{
                isDeleted:true
            }
        });
        if(deleteData!==null){
            response.status(200).json({message:'data deleted '});
        }
        else{
            response.status(204).json({message:'data not found'});
        }
    }catch(error){
        console.log("error : ",error);
        response.status(500).json({message:'error while deleting data'});
    }
}