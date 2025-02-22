const mongoose = require("mongoose");


const fusionEventSchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
        content:{
            type:String,
        },
        publishedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'fusionUser'
        }
    }
)


const fusionEvent = new mongoose.model('fusionEvent', fusionEventSchema)

module.exports = fusionEvent