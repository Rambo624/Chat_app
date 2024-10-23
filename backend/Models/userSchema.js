const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true},
    photo:{type:String,default:"https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=612x612&w=0&h=kjCAwH5GOC3n3YRTHBaLDsLIuF8P3kkAJc9RvfiYWBY="},

},{
    timestamps:true
})

module.exports=mongoose.model("user",userSchema)