import axios from "axios";
import { backendURL } from "assets/url/url";

export const getDataAPI = async(routes,controller)=>{
    try{
        const response = await axios.get(`${backendURL}/${routes}/${controller}`);
        return response;
    }catch(error){
        console.log("error : ",error);
    }
}