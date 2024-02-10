
import axios from 'axios';
import jwtDecode from "jwt-decode";

export const setAuthToken = async (token: any) => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
       console.log(jwtDecode(token))
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}