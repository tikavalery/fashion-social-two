const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")



// 

router.post("/createpost",requireLogin,(req,res) =>{
    const {title, body,pic} = req.body
    console.log(title, body, pic)
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined;
    console.log(req.user)
const post = new Post({
    title,
    body,
    photo:pic,
    postedBy:req.user
})
post.save().then(result =>{
    res.json({post:result})
}).catch(err=>{
    console.log(err)
})
})

router.get("/allpost",(req,res) =>{
    Post.find().populate("postedBy","_id name").
    then(posts=>{
        res.json({posts})
    }).catch(err =>{
        console.log(err)
    })
})

router.get("/mypost",requireLogin,(req,res) =>{
    console.log("I am In")
    console.log(req.user._id)
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").then(mypost=>{
        console.log(mypost)
        res.json(
        {
            mypost
        }
        )
        }).catch(err =>{
            console.log(err)
    })
})
module.exports = router;