const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req , res) => {

   try{

    const { name , password , email} = req.body;
    if(!name || !password  || !email){
        return res.status(400).json({message:"All fields are required!!"})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User ALready exist!"})
    }
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

    const user = await  User.create({
        name,
        password:hashedPassword,
        email
    })

   return res.status(201).json({message:"user created!!"

    ,
 
        id: user._id,
        name: user.name,
        email: user.email
    
   }
   )
   }
   catch(error){
    console.error("server error" , error.message)
     return res.status(500).json({message:"server error"})
   }
}

const loginUser = async (req ,res  ) => {
 
   
   
    try{
         const {   password , email} = req.body;
        if(!password  || !email){
        return res.status(400).json({message:"All fields are required!!"})
    }

     const existingUser = await User.findOne({email})
    if(!existingUser){
        return res.status(400).json({message:"user does not exisits!"})
    } 

    const isMatch = await bcrypt.compare(password,existingUser.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid username Password!"})
    }

     const token = jwt.sign (
        {id:existingUser._id},  process.env.JWT_SECRET,
        {
           expiresIn:"1d"
        }
    )
  
return res.status(200).json({
  message: "Login success!!",
  token,
  user: {
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email
  }
});


    }
   catch(error){
    console.error("server error" , error.message)
     return res.status(500).json({message:"server error"})
   }
}




module.exports = {registerUser , loginUser};