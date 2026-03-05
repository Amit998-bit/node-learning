const mongoose = require("mongoose")

const productSchema = new mongoose.Schema ({

        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        stock:{
            type:Number,
            required:true
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required:true
        },
        images:{
            type:[String],
            required:true
        },
        slug:{
            type:String,
            required:true,
            unique:true
        },
        rating:{
            type:Number,
            default:0
        }


}
,
{
    timestamps:true,
})

module.exports = mongoose.model("Product" , productSchema)