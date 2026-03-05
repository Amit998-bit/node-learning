const jwt = require("jsonwebtoken");
const User = require("../models/User")

const protect = async (req, res, next) => {

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            let token
            token = req.headers.authorization.split(" ")[1]

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password")

            next()



        }
        else {
            return res.status(401).json({ message: "Not authrizied" })
        }

    } catch (error) {
        return res.status(401).json({ message: "Not authrizied" })
    }
}

const adminOnly = (req , res , next) =>{
    if(req.user && req.user.role==="admin")
    {
        next()
    }
    else{
         return res.status(403).json({ message: "Not allowed" })
    
    }
}

module.exports = { protect, adminOnly }