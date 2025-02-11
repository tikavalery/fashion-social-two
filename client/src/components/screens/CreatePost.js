
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(""); // URL state to track image URL

  // useEffect to trigger when URL changes (i.e., when the image is uploaded)
  useEffect(() => {
    if (url) {
      console.log("Image URL updated:", url);
      // After the image URL is updated, you can call the post data function
      sendPostDataToBackend(url, title, body);
    }
  }, [url]); // Dependency on 'url'

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Store the title in state
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value); // Store the body in state
  };

  const postDetails = async () => {
    if (!image) {
      console.log("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image); // Append the selected image to FormData
    formData.append("upload_preset", "fashion-social-two"); // Your Cloudinary upload preset
    formData.append("cloud_name", "valkelly"); // Your Cloudinary cloud name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/valkelly/image/upload", // Cloudinary upload endpoint
        {
          method: "POST",
          body: formData,
        }
      );

      // Parse the response from Cloudinary
      const data = await response.json();

      if (response.ok) {
        console.log("Image uploaded successfully:", data);
        const imageUrl = data.secure_url;
        setUrl(imageUrl); // Set the URL state after the image is uploaded
      } else {
        console.error("Upload failed:", data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Function to send post data to backend
  const sendPostDataToBackend = async (imageUrl, title, body) => {
    try {
      const response = await fetch("/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: imageUrl,
          title: title,
          body: body,
        }),
      });

      if (response.ok) {
        M.toast({ html: "Created post successfully", classes: "#43a047 green darken-3" });
        navigate("/");
      } else {
        M.toast({ html: response.error, classes: "#c62828 red darken-3" });
      }
    } catch (error) {
      console.error("Error sending post data to backend:", error);
    }
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <input type="text" placeholder="title" value={title} onChange={handleTitleChange} />
      <input type="text" placeholder="body" value={body} onChange={handleBodyChange} />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path validate" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;



// import React,{useState, useEffect} from "react";
// import { Link,useNavigate } from "react-router-dom";
// import axios from "axios";
// import M from "materialize-css"

// const CreatePost = () =>{
//     const navigate = useNavigate();
//     const[title,setTitle] = useState("");
//     const[body,setBody] = useState("");
//     const [image, setImage] = useState("");
//     const [url, setUrl] = useState("");
//     // const [uploadedImageUrl, setUploadedImageUrl] = useState("");

//     // const postDetails = async (e) =>{
//     //     // e.preventDefault();
//     //     console.log("inside")
//     //     const data = new FormData();
//     //     data.append("file",image);
//     //     data.append("upload_preset", "fashion-social-two");
//     //     data.append("cloud_name", "valkelly");
//     //     fetch("https://api.cloudinary.com/v1_1/valkelly/image/upload",{
//     //         method:"post",
//     //         body:data
//     //     }).then(res=>res.json()).then(data=>{
//     //         console.log(data)
//     //     }).catch(err =>{
//     //         console.log(err)
//     //     })
//     //     try {
//     //         // Cloudinary API URL for unsigned upload
//     //         const response = await axios.post(
//     //           "https://api.cloudinary.com/v1_1/valkelly/image/upload", // Replace 'your_cloud_name' with your Cloudinary cloud name
//     //          data
//     //         );
      
//     //         // If upload is successful, retrieve the URL of the uploaded image
//     //         const imageUrl = response.data.secure_url;
//     //         console.log(imageUrl);
//     //         // setUploadedImageUrl(imageUrl);
//     //         // console.log("Image uploaded successfully!");
//     //       } catch (error) {
//     //         console.error("Error uploading the image:", error);
//     //         alert("Error uploading the image.");
//     //       } 
      

//     // }

//     useEffect(() =>{

//     },[url])
//     const handleTitleChange = (e) => {
//         setTitle(e.target.value); // Store the title in state
//       };
    
//       // Handle body input change
//       const handleBodyChange = (e) => {
//         setBody(e.target.value); // Store the body in state
//       };
    

//     const postDetails = async () => {
//         if (!image) {
//           console.log("Please select an image first.");
//           return;
//         }
    
//         const formData = new FormData();
//         formData.append("file", image); // Append the selected image to FormData
//         formData.append("upload_preset", "fashion-social-two"); // Your Cloudinary upload preset
//         formData.append("cloud_name", "valkelly"); // Your Cloudinary cloud name
    
//         try {
//           const response = await fetch(
//             "https://api.cloudinary.com/v1_1/valkelly/image/upload", // Cloudinary upload endpoint
//             {
//               method: "POST",
//               body: formData,
//             }
//           );
    
//           // Parse the response from Cloudinary
//           const data = await response.json();
    
//           if (response.ok) {
//             console.log("Image uploaded successfully:", data);
//             // You can access the image URL here:
//             const imageUrl = data.secure_url;
//             // console.log("Image URL:", imageUrl);
//             //   setUploadedImageUrl(imageUrl);
//             // console.log("UploadedImage: ",uploadedImageUrl);
//             await sendPostDataToBackend(imageUrl, title, body);
//           } else {
//             console.error("Upload failed:", data.error.message);
//           }
//         } catch (error) {
//           console.error("Error uploading image:", error);
//         }
//       };

//         // Function to send image URL to backend (/createpost)
//   // Function to send the post data (image URL, title, body) to backend
//   const sendPostDataToBackend = async (imageUrl, title, body) => {
//     try {
//       const response = await fetch("/createpost", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", 
//           "Authorization":"Bearer " + localStorage.getItem("jwt") // Specify JSON content
//         },
//         body: JSON.stringify({
//           pic: imageUrl, // Send the image URL to the backend
//           title: title, // Send the title to the backend
//           body: body, // Send the body to the backend
//         }),
//       });

//       if (response.ok) { 
//          M.toast({html:"Created post sucessfully", classes:"#43a047 green darken-3"})
//       navigate("/")
//         // const data = await response.json();
//         // console.log("Post data sent to backend:", data);
       
//       } else {
//           M.toast({html: response.error, classes: "#c62828 red darken-3"})
//       }
//     } catch (error) {
//       console.error("Error sending post data to backend:", error);
//     }
//   };
//      return(
//         <div className="card input-filed"
//         style={{
//             margin:"10px auto",
//             maxWidth:"500px",
//             padding:"30px",
//             textAlign:"center"

//         }}>
//             <input type="text" placeholder="title" value={title} onChange={handleTitleChange}/>
//             <input type="text" placeholder="body" value={body} onChange={handleBodyChange}/>
//             <div className= "file-field input-field">
//              <div className="file-field input-field">
//                 <div className="btn #64b5f6 blue darken-1">
//                     <span>Upload Image</span>
//                     <input type="file" name="" id="" onChange={(e)=>setImage(e.target.files[0])}/>
//                 </div>
//                 <div className="file-path-wrapper">
//                     <input type="text" name="" id="" className="file-path validate" />
//                 </div>
//              </div>
//             </div>
//             <button 
//             className="btn waves-effect waves-light #64b5f6 blue darken-1" 
//             onClick={() =>postDetails()}
//             >
//              Submit Post
                     
//                      </button>

//         </div>
//     )
// }

// export default CreatePost;

