const {Schema,model}=require('mongoose');
const ipSchema=new Schema({
ip:{
    type:String,
    required:true,
    trim:true,
},
classId:{
    type:String,
    required:true,
    trim:true,
}
},{timestamps:true})

const Ip=model("Ip",ipSchema)
module.exports=Ip