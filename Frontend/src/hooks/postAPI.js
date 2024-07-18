import { backendURL } from "assets/url/url";
import axios from 'axios';

export const postDataAPI = async(routes,controller,data)=>{
    try{
        const response = await axios.post(`${backendURL}/${routes}/${controller}`,data);
        return response;
    }catch(error){
        console.log("error : ",error);
    }
}

export const loginAPI = async(data)=>{
    try{
        const response = await axios.post(`${backendURL}/admin/login`,data);
        return response;
    }
    catch(error){
        console.log("error : ",error);
    }
}