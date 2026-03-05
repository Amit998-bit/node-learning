const mongoose = require("mongoose")

const categoryScehma = new mongoose.Scehma (
    {
        name:{
            type:String,
            required:true,
               unique: true,
            trim: true  
        },
        description:{
            type:String,
            required:true,   
             trim: true
        },
        image:{
            type:String,
            required:true,
        },
        slug: {
  type: String,
  required: true,
  unique: true,
  lowercase: true
}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Category", categoryScehma);