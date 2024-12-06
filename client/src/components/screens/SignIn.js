import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import M from "materialize-css"
import axios from "axios";

const SignIn = () =>{
     const navigate = useNavigate();

     const [password, setPassword] = useState("");
     const [email, setEmail] = useState("");
     const PostData = () => {
      // if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      //   M.toast({html:"invalid email", classes:"#c62828 red darken-3"})
      //   return
      // }
      
     axios.post('/signin', {

    password,
    email
    })
    .then(function (response) {
      console.log(response.data)
      M.toast({html:"SignedIn Successfully", classes:"#43a047 green darken-1"})
      navigate("/")
    })
    .catch(function (error) {
      // console.log(error)
      M.toast({html:error.message, classes:"#c62828 red darken-3"})
    
    }) 
  
  };
     return(
        <div className="mycard">
             <div className="card auth-card input-field">
                  <h2>Instagram</h2>
                  <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                  <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() =>PostData()}> Login
                     
  </button>
     <h5>
     <Link to ="/signup"> Dont have an account ? </Link>    
     </h5>
 
      </div>
        </div>
     ) 
}

export default SignIn;