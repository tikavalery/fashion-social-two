const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")


router.post("/createpost",requireLogin,(req,res) =>{
    const {title, body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined;
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

router.get("/allpost",requireLogin,(req,res) =>{
    Post.find().populate("postedBy","_id name")
    .populate("comments.postedBy", "_id name").
    then(posts=>{
     
        res.json({posts})
    }).catch(err =>{
       console.log(err)
    })
})

router.get("/mypost",requireLogin,(req,res) =>{

    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").then(mypost=>{
     
        res.json(
        {
            mypost
        }
        )
        }).catch(err =>{
           console.log(err)
    })
})

// Define a route to handle 'liking' a post
// This route requires authentication, so `requireLogin` middleware is used
router.put("/like", requireLogin, async (req, res) => {
 
    try {
        // Use Mongoose's findByIdAndUpdate to find the post by ID and update it
        const result = await Post.findByIdAndUpdate(
            req.body.postId, // The ID of the post to like (sent in the request body)
            {
                // Add the current user's ID to the `likes` array using MongoDB's $push operator
                $push: { likes: req.user._id }
            },
            {
                new: true // Return the modified document rather than the original
            }
        ).populate("likes"); // Optionally populate the `likes` field with full user documents

        // Send the updated post (with new like) as a JSON response
    
        res.json(result);

    } catch (err) {
        // If there's an error (e.g., invalid post ID), send a 422 Unprocessable Entity status with the error
        return res.status(422).json({ error: err });
    }
});

// router.put("/comment", requireLogin, (req,res)=>{
//     const comment = {
//         text:req.body.text,
//         postedBy:req.user._id
//     }
//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{comments:comment}
//     },{
//         new:true
//     }).populate("comments.postedBy","id name").exec((err, result) =>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })




// router.put("/comment", requireLogin, async (req, res) => {
//     const comment = {
//         text: req.body.text,
//         postedBy: req.user._id
//     };

//     try {
//         const result = await Post.findByIdAndUpdate(
//             req.body.postId,
//             { $push: { comments: comment } },
//             { new: true }
//         ).populate("comments.postedBy", "_id name");

//         res.json(result);
//     } catch (err) {
//         // Send error response if something goes wrong
//         res.status(422).json({ error: err });
//     }
// });
// ```

router.put("/comment", requireLogin, async (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    };

    try {
        const result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        ).populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name");

        return res.json(result);
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});




router.put("/unlike", requireLogin, async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(
            req.body.postId, 
            {
                $pull: { likes: req.user._id }
            }, 
            {
                new: true
            }).populate("likes"); // You can use populate if you want to get user data for the likes
        
        res.json(result); // Send the updated post as the response
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});

router.delete("/deletepost/:postId",requireLogin, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId }).populate("postedBy", "_id");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        console.log(post.postedBy?._id?.toString() )
        console.log(req?.user?._id?.toString())

        if (post.postedBy?._id?.toString() !== req?.user?._id?.toString()) {
            return res.status(403).json({ error: "Unauthorized to delete this post" });
        }

        await post.remove();
        return res.json({ message: "Successfully deleted" });

    } catch (err) {
        console.error("Delete post error:", err);
        return res.status(500).json({ error: "Server error while deleting post" });
    }
});



module.exports = router;