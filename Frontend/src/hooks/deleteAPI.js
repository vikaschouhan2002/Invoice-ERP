import { backendURL } from "assets/url/url";
import axios from "axios";

export const deleteAPI = async(routes,controller,id)=>{
    try{
        const response = await axios.delete(`${backendURL}/${routes}/${controller}`);
        return response;
    }catch(error){
        console.log("error : ",error);
    }
}