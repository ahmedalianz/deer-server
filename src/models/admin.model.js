const {Schema,model}=require('mongoose');
const {isEmail,isStrongPassword} =require('validator')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema=new Schema({
userName:{
    type:String,
    required:true,
    trim:true,
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate:function(val){
        if(!isEmail(val)) throw new Error('invalid Email Format')
    }
},
password:{
    type:String,
    required:true,
    trim:true,
    validate:function(val){
        if(!isStrongPassword(val)) throw new Error('use stronger passowrd')
    }
},
security:{
    securityQuestion:{
        type:String,
    },
    answer:{
        type:String,
    }
},
profilePic:{
    type:String,
    default:"uploads/noAvatar.png"
},
role:{
    type:String, 
    enum:["Admin", "User"],
    required:true,
    default:"User"
},
notifications:[
    {
        name:{
            type:String,
        },
        phone:{type:String},
        classDetails:{type:String}
    }
]
},{timestamps:true})

userSchema.pre('save',async function(){
    if(this.isModified('password')) this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.toJSON = function(){
    const user=this.toObject();
    const {password,__v,...others} = user
    return others
}
userSchema.methods.generateToken=async function(){
    return jwt.sign({_id:this._id},process.env.TOKEN, { expiresIn: '24h' })
}
userSchema.statics.loginUser=async function(email,password){
 let user =await this.findOne({email})
 if(user){
    const validPassword=await bcrypt.compare(password,user.password)
    if(validPassword){
        return user
    }
    throw new Error('Incorrect Password')
 }
 throw new Error('Incorrect E-mail')
}
const User=model("User",userSchema)
module.exports=User