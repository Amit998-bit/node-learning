const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function(req , res , cb) {
        cb (null , "uploads/categories")
    },
    filename: function(req , res , cb) {
        const uniqueName = Date.now() + "" + file.originalname
        cb (null , uniqueName)
    } 
})


const upload = multer({storage
    ,
    fileFilter: function(req , file , cb) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
        if (allowedTypes.includes(file.mimetype)) {
   cb(null, true)
} else {
   cb(new Error("Only image files allowed"), false)
}
    }
})

module.exports = upload