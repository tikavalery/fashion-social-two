// Import the jsonwebtoken library to work with JWTs
const jwt = require("jsonwebtoken");

// Import the secret key used to sign and verify tokens from the keys file
const { JWT_SECRET } = require("../keys");

// Import mongoose to interact with the MongoDB database
const mongoose = require("mongoose");

// Load the User model from Mongoose so we can fetch user details by ID
const User = mongoose.model("User");

// Export a middleware function to protect routes that require authentication
module.exports = (req, res, next) => {
    
    // Destructure the 'authorization' field from the request headers
    const { authorization } = req.headers;

    // Log the authorization header for debugging (should contain the token)
    console.log(authorization);

    // If no authorization header is present, the user is not logged in
    if (!authorization) {
        // Respond with 401 Unauthorized and an error message
        return res.status(401).json({ error: "You must be logged in" });
    }

    // Extract the token by removing the 'Bearer ' prefix from the authorization string
    const token = authorization.replace("Bearer ", "");

    // Log the raw token for debugging purposes
    console.log(token);

    // Verify the token using the JWT_SECRET
    jwt.verify(token, JWT_SECRET, (err, payload) => {

        // Log the decoded payload (if any) for debugging
        console.log(payload);

        // If there is an error during verification (e.g. invalid/expired token)
        if (err) {
            // Respond with 401 Unauthorized and an error message
            return res.status(401).json({ error: "You must be logged in" });
        }

        // Destructure the user ID (_id) from the payload
        const { _id } = payload;

        // Find the user in the database using the ID from the token
        User.findById(_id).then(userdata => {
            // Attach the user data to the request object (so next middleware/routes can access it)
            req.user = userdata;
            console.log("above req user")
           console.log(req.user)
            // Call next() to continue to the next middleware or route handler
            next();
        });

    });
};

// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../keys");
// const mongoose = require("mongoose");
// const User = mongoose.model("User");


// module.exports = (req,res,next) =>{
//     // console.log(req.headers)
//     const {authorization} = req.headers

//     console.log(authorization)
//     if(!authorization){
//         res.status(401).json({error:"you must be logged in"})
//     }
//     const token = authorization.replace("Bearer ", "")
//     console.log(token)
//     jwt.verify(token,JWT_SECRET, (err,payload)=>{
//         console.log(payload)
//         if(err){
//           return  res.status(401).json({error:"You must be logged in "})
//         }
//         const {_id} = payload;
//         User.findById(_id).then(userdata=>{
//             req.user = userdata
//             next()
//         })

        
//     })
// }