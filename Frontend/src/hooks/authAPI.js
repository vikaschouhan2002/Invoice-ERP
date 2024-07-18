import { backendURL } from "assets/url/url";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

export const authenticate = async()=>{
    try{
        const token = Cookies.get('Admin_Token');
        console.log("token : ",token);
        if(token){
            const response = await axios.post(`${backendURL}/admin/auth`,{token});
            return response;
        }else{
            return false;
        }
    }catch(error){
        console.log("error : ",error);
        Swal.fire({icon:'error',text:'error while authenticate',timer:3000});
    }
}