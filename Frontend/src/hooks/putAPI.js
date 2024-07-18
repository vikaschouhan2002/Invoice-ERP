import { backendURL } from "assets/url/url";
import axios from 'axios';

export const putDataAPI = async(routes,controller,data)=>{
    try{
        const response = await axios.put(`${backendURL}/${routes}/${controller}`,data);
        return response;
    }catch(error){
        console.log("error : ",error);
    }
}