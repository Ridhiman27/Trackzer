const express = require('express');
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'secretString';

// const JWT_SECRET = process.env.JWT_SECRET;
// Create a User using: POST "/api/auth/createUser". No login required


router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),

],async (req,res)=>{
    let success = false;
    //Validation result using express-validator
    //Refer Docs
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    //Check whether the user exists already exits

    try{
        //Checking if the email is a valid emil or not
        let user = await User.findOne({email:req.body.email});

        //Checking from the request if the user exists or not

        if(user){
            return res.send.status(400).json({success,errors:"Sorry a user with this email already exists"}); 
        }
        //Adding salt and bcrypting the passwords 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)

        //Create a new User 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);
        console.log(authToken);
        success = true;
        //Sending the authtoken in the form of an json
        res.json({success,authToken});
    }
    //Catching Errors
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


//Route-2  Authenticate a User using: Post "/api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async(req,res)=>{
    //If there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            var success = false;
            return res.status(400).json({success,error:"Please try to join with correct credentials"})
        }
        //Comparing the password and the hashed form of the password
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            success = false
            return res.status(400).json({success,error:"Please try to join with correct credentials"})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        console.log(authToken);
        success = true;
        //Sending the authtoken in the form of an json
        res.json({success,authToken});

    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
})


//Route-3 Get loggedin User Details using: Post "/api/auth/getUser". Login required
router.post('/getUser',fetchUser,async(req,res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = router



