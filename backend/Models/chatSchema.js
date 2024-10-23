const mongoose=require("mongoose")


const chatSchema= mongoose.Schema({

    chatname:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},
{timestamps:true})

module.exports=mongoose.Model("chat",chatSchema)