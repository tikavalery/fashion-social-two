import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import M from "materialize-css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const PostData = () => {
  //     // if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
  //     //   M.toast({html:"invalid email", classes:"#c62828 red darken-3"})
  //     //   return
  //     // }
      
  //    axios.post('/signup', {
  //   name,
  //   password,
  //   email
  //   })
  //   .then(function (response) {
  //     M.toast({html:response.data.message, classes:"#43a047 green darken-1"})
  //     navigate("/signin")
  //   })
  //   .catch(function (error) {
  //     M.toast({html:error.message, classes:"#c62828 red darken-3"})
  //     navigate("/signup")
  //   }).catch(err=>{
  //     console.log(err)
  //   });  
  
  // };

  const PostData = () => {
    // if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
    //   M.toast({html:"invalid email", classes:"#c62828 red darken-3"})
    //   return
    // }
  
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        M.toast({ html: data.message, classes: '#43a047 green darken-1' });
        navigate('/signin');
      })
      .catch((error) => {
        M.toast({ html: error.message, classes: '#c62828 red darken-3' });
        navigate('/signup');
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={PostData}>
          {" "}
          SignUp
        </button>
        <h5>
          <Link to="/signin"> Already have an account ? </Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
