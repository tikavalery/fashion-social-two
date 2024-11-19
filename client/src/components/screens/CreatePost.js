import React from "react"

const CreatePost = () =>{
    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"30px",
            textAlign:"center"

        }}>
            <input type="text" placeholder="title"/>
            <input type="text" placeholder="body"/>
            <div className= "file-field input-field">
             <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" name="" id="" />
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