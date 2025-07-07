

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

   // Render the list of posts
   return (
      <div className="home">
         {
            data.map(item => {
         
               return (
                  <div className="card home-card" key={item._id}>
                     {/* Display name of the user who posted */}
                     <h5>{item?.postedBy?.name}</h5>

                     {/* Post image */}
                     <div className="card-image">
                        <img src={item?.photo} alt="home pic" />
                     </div>

                     {/* Post interaction icons and content */}
                     <div className="card-content">
                        {/* Static favorite icon (could be expanded later) */}
                        <i className="material-icons" style={{ color: "red" }}>favorite</i>

                        {/* Like and Unlike buttons */}
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

                        {/* Placeholder for comment input */}
                        <input type="text" placeholder="add a comment" />
                     </div>
                  </div>
               )
            })
         }
      </div>
   );
}

export default Home;



// import React,{useState,useEffect, useContext} from "react";
// import { UserContext } from "../../App";

// const Home = () =>{

//    const [data, setData] = useState([])
//    const {state, dispatch} = useContext(UserContext)
//    useEffect(() =>{
//       fetch("/allpost", {
//          headers:{
//             "Authorization":"Bearer " + localStorage.getItem("jwt")
//          }
//       }).then(res =>res.json()).then(result =>{
//          console.log(result)
//          setData(result.posts)
//       })
//    },[])
//    const likePost = (id) =>{
//      console.log("I am inside likes") ;
//        fetch("/like",{
//          method:"put",
//          headers:{
//             "Content-Type":"application/json",
//             "Authorization":"Bearer " + localStorage.getItem("jwt")
//          },
//          body:JSON.stringify({
//             postId:id
//          })
//        }).then(res =>res.json()).then(result =>{
//          console.log(result)
//          const newData = data.map(item =>{
//             if(item._id === result._id){
//                return result
//             }else{
//                return item
//             }
//          })
//          setData(newData)
//        }).catch(err =>{
//          console.log(err)
//        })

//    }

//    const unlikePost = (id) =>{
//       console.log(" I am inside unlikes")
//       fetch("/unlike",{
//         method:"put",
//         headers:{
//            "Content-Type":"application/json",
//            "Authorization":"Bearer " + localStorage.getItem("jwt")
//         },
//         body:JSON.stringify({
//            postId:id
//         })
//       }).then(res =>res.json()).then(result =>{
//          console.log(result)
//          const newData = data.map(item =>{
//             if(item._id === result._id){
//                return result
//             }else{
//                return item
//             }
//          })
//          setData(newData)
//       }).catch(err =>{
//          console.log(err)
//        })
//   }
//      return(
//        <div className="home">
//          {
//             data.map(item=>{
//                return(
//                   <div className="card home-card" key={item._id}> 
//                   <h5> {item?.postedBy?.name}</h5>
//                   <div className="card-image">
//                      <img src={item?.photo} alt="home pic"/>
      
//                   </div>
//                   <div className="card-content">
// <i className="material-icons" style={{color:"red"}}> favorite</i>
// <i className="material-icons" onClick={() => {likePost(item._id)}}>thumb_up</i>
// <i className="material-icons" onClick={() => {unlikePost(item._id)}}>thumb_down</i>
//                      {/* {item.likes.includes(state._id)
//                      ?
//                      <i className="material-icons" onClick={() => unlikePost(item._id)}>thumb_down</i>
//                      :
//                      <i className="material-icons" onClick={() => likePost(item._id)}>thumb_up</i>
//                   }
//                       */}
                     
//                      <h6>{item.likes.length} Likes </h6>
//                      <h6>{item?.title}</h6>
//                      <p>{item?.body}</p>
//                      <input type="text" placeholder="add a comment"/>
//                   </div>
//                </div>
//                )
//             })
//          }
      
//        </div>
//      ) 
// }

// export default Home;