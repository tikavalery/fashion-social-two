

// Import necessary hooks and context from React and your app
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";


const Home = () => {
   // useState to store posts fetched from the backend
   const [data, setData] = useState([]);

   // useContext to get current user state and dispatch function from context
   const { state, dispatch } = useContext(UserContext);

   // useEffect to fetch posts only once when component mounts
   useEffect(() => {
      fetch("/allpost", {
         headers: {
            // Attach JWT token for authorization
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         }
      })
      .then(res => res.json())
      .then(result => {
         // Store fetched posts in state
         setData(result.posts);
      });
   }, []); // Empty dependency array means this runs once on mount

   // Function to handle liking a post
   const likePost = (id) => {
      console.log("I am inside likes");
      fetch("/like", {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
            postId: id
         })
      })
      .then(res => res.json())
      .then(result => {
        
         // Update post in local state with updated like info
       
         const newData = data.map(item => {
            
            if (item._id === result._id) {
               return result; // Replace the updated post
            } else {
               return item; // Keep other posts as is
            }
         });
         setData(newData); // Update the posts array in state
      })
      .catch(err => {
         console.log(err);
      });
   };

   // Function to handle unliking a post
   const unlikePost = (id) => {
      console.log("I am inside unlikes");
      fetch("/unlike", {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
            postId: id
         })
      })
      .then(res => res.json())
      .then(result => {
    
         // Update post in local state with updated unlike info
         const newData = data.map(item => {
            if (item._id === result._id) {
               return result; // Replace the updated post
            } else {
               return item; // Keep other posts as is
            }
         });
         setData(newData);
      })
      .catch(err => {
         console.log(err);
      });
   };

   const makeComment = (text, postId) =>{
       fetch ("/comment",{
           method:"put",
           headers:{
               "Content-Type" : "application/json",
               "Authorization": "Bearer " + localStorage.getItem("jwt")
           },
           body:JSON.stringify({
               postId,
               text
           })
       }).then(res =>res.json())
       .then(result =>{
         console.log(result)
         const newData = data.map(item =>{
            if(item._id === result._id){
               return result
            } else{
               return item
            }
         })
         setData(newData)
       }).catch(err =>{
         console.log(err)
       })
   }
   // Render the list of posts

   const deletePost = (postid) =>{
      console.log(postid)
      fetch(`/deletepost/${postid} `, {
         method:"delete",
         headers:{
            Authorization:"Bearer " + localStorage.getItem("jwt")
         }
      }).then(res => res.json()).then(result =>{
         const newData = data.filter(item => {
            return item._id !== result._id
         })
         setData(newData)
      })
   }
   return (
      <div className="home">
         {
            data.map(item => {
         
               return (
                  <div className="card home-card" key={item._id}>
                    
                     <h5>{item?.postedBy?.name}{item?.postedBy?._id === state._id 
                        &&<i className = "material-icons" 
                        style={{float:"right"}} onClick={() =>deletePost(item._id)}>delete</i> }
                        </h5>
                     <div className="card-image">
                        <img src={item?.photo} alt="home pic" />
                     </div>
                     <div className="card-content">
                        <i className="material-icons" style={{ color: "red" }}>favorite</i>

                        {
                           item.likes.includes(state._id)
                           ?
                           <i className="material-icons" onClick={() => { unlikePost(item._id) }}>thumb_down</i>
                           :
                           <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                        }
                        
                     
                        {/* Number of likes */}
                        <h6>{item.likes.length} Likes</h6>

                        {/* Post title and body */}
                        <h6>{item?.title}</h6>
                        <p>{item?.body}</p>
                        {
                           item.comments.map(record => {
                              return(
                                 <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text}</h6>
                              )
                           })
                        }
                        <form onSubmit={(e) =>{
                           e.preventDefault()
                           makeComment(e.target[0].value, item._id)

                        }}>

                           <input type="text" placeholder="add a comment" />
                        </form>
                        {/* Placeholder for comment input */}
                        
                     </div>
                  </div>
               )
            })
         }
      </div>
   );
}

export default Home;


