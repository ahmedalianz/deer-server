const {Schema,model}=require('mongoose');
const classSchema=new Schema({
className:{
    type:String,
    required:true,
    trim:true,
},
time:{
    type:String,
    required:true,
    trim:true,
},
MorN:{
    type:String,
    required:true,
    enum:["M","N"]
},
visible:{
    type:Boolean,
    default:true
},
count:{
    type:Number,
    default:0
},
people:[
    {
        name:{
            type:String,
        },
        phone:{type:String,},
        ip:{type:String,},
    }
]
},{timestamps:true})

const Class=model("Class",classSchema)
module.exports=Class