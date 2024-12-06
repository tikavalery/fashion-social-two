import React,{useState} from "react";

const CreatePost = () =>{
    const[title,setTitle] = useState("");
    const[body,setBody] = useState("");
    const [image, setImage] = useState("")
    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"30px",
            textAlign:"center"

        }}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.title.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            <div className= "file-field input-field">
             <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" name="" id="" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input type="text" name="" id="" className="file-path validate" />
                </div>
             </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" > Submit Post
                     
                     </button>

        </div>
    )
}

export default CreatePost;