
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { useHistory } from 'react-router-dom';
function App() {
    const history = useHistory();
   
      history.push("/auth/sign-in");
  }
export const logoutHelper = async () => {
       console.log(axios.defaults.headers.common["Authorization"])
       console.log("Bearer "+localStorage.getItem('token'))
       if(axios.defaults.headers.common["Authorization"] == "Bearer "+localStorage.getItem('token')){
        console.log("true");}
        else{
            
            localStorage.clear();
            delete axios.defaults.headers.common["Authorization"]
            App()
        }
       
}