const express = require("express");
const { registerUser , loginUser} = require("../controller/userController");
const { protect , adminOnly} = require("../middleware/authMiddleware")

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile" , protect , adminOnly , (req , res ) =>{
    res.json ({
        message:"Protected routes",
            user: req.user
    })
})

module.exports = router;