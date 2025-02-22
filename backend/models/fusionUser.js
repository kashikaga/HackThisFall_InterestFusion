const mongoose = require("mongoose");

const fusionUserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
            unique:true
        },
        password:{
            type:String,
            required: true
        },
        publishedPost:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"fusionEvent"
        }]
    }
)

const fusionUser = new mongoose.model("fusionUser", fusionUserSchema)

module.exports = fusionUser