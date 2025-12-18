import React,{useEffect,useState, useContext}from "react";
import { UserContext } from "../../App";
import {useParams} from "react-router-dom";
import axios from "axios";


const Profile = () =>{
      
      const [mypics, setPics] = useState(null);
      const [userProfile, setUserProfile] = useState([]);
      const {state, dispatch} = useContext(UserContext);
    const {userid} = useParams();

   useEffect(() =>{
  
      fetch(`/user/${userid}`, {
         headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         }
      }).then(res =>res.json()).then(result =>{
         console.log(result)
         setUserProfile(result);
         
           
      })
   },[])
     return(
        <>
        {userProfile ? 
        
        
         <div style={{maxWidth:"950px", margin:"0px auto"}}> 
         <div style={{display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
         }}>
            <div>
               <img  
               src=" https://images.unsplash.com/photo-1730970238526-c4b4f42425cf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
               style={{width:"160",height:"160px", borderRadius:"80px"}} alt="profile pic"/>

            </div>
            <div>
               <h4>{state?.name}</h4>
            </div> 
            <h4>{userProfile.user?.name}</h4>
            <h5> {userProfile.user?.email}</h5>
            <div>
               
               <h6> {userProfile?.post?.length} posts</h6>
               <h6>40 Followers</h6>
               <h6>40 Following</h6>
            </div>
         </div>
         <div className="gallery">
            {
                userProfile?.posts?.map(item => {
                    return(
                        <img key = {item?._id} className="item" src = {item?.photo} alt= {item?.title} />
                    )
                })
            }
    
       
              
         </div>
       </div>
        
        : <h2>loading . . . ?</h2>}
       
        </>
       
     ) 
}

export default Profile;