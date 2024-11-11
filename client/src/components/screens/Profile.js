import React from "react";

const Profile = () =>{
     return(
       <div>
         <div style={{display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px"
         }}>
            <div>
               <img  
               src=" https://images.unsplash.com/photo-1730970238526-c4b4f42425cf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
               style={{width:"160",height:"160px", borderRadius:"80px"}} alt="profile pic"/>

            </div>
            <div>
               <h4>Banadzem Valery</h4>
            </div>
            <div>
               <h6> 40 posts</h6>
               <h6>40 Followers</h6>
               <h6>40 Following</h6>
            </div>
         </div>
       </div>
     ) 
}

export default Profile;