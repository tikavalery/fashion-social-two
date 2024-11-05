const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports = (req,res,next) =>{
    // console.log(req.headers)
    const {authorization} = req.headers

    console.log(authorization)
    if(!authorization){
        res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    console.log(token)
    jwt.verify(token,JWT_SECRET, (err,payload)=>{
        console.log(payload)
        if(err){
          return  res.status(401).json({error:"You must be logged in "})
        }
        const {_id} = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })

        
    })
}