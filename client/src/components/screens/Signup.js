import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
//     console.log("I am in");
    fetch("/signup", {
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        password: "",
        email: "",
      })
    })
      .then((res) => res.json())
      .then(
          (data) => {
               console.log(data)
        if (data.error) {
          M.toast({ html: data.error ,classes:"#c62828 red darken-3"});
        } else{
          M.toast({html:data.message, classes:"#43a047 green darken-1"})
          
        }
      }
     );
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
          type="text"
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
