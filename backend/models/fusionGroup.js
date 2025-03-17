const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        description:{
            type:String,
            required: true
        },
        members:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"fusionUser"
        }],
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"fusionUser"
        },
        totalMembers:{
            type:Number,
            default:0
        },
        tag:{
            type:String,
            required:true
        }
    }
)

const fusionGroup = new mongoose.model("fusionGroup", groupSchema)

module.exports = fusionGroup