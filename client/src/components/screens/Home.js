import React,{useState,useEffect} from "react";

const Home = () =>{

   const [data, setData] = useState([])
   
     return(
       <div className="home">
         <div className="card home-card"> 
            <h5> Berinyny</h5>
            <div className="card-image">
               <img src="https://images.unsplash.com/photo-1731176497854-f9ea4dd52eb6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="home pic"/>

            </div>
            <div className="card-content">
               <i className = "material-icons">favorite</i>
               <h6>Title</h6>
               <p>This is amazing post</p>
               <input type="text" placeholder="add a comment"/>
            </div>
         </div>
       </div>
     ) 
}

export default Home;