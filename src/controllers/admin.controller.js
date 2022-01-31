const userModel=require('../models/admin.model')
const errorHandler=require('../helpers/errorHandler')
const errorAuthHandler=require('../helpers/errAuthHandler')
const successHandler=require('../helpers/successHandler')
class User{
    static registerAdmin=async(req,res)=>{
        try{
            if(req.body.role !="Admin") throw new Error("Please choose an admin type")
            const admin = await new userModel(req.body)
            const token=await admin.generateToken()
            await admin.save()
            successHandler({admin,token},res,'admin registerd successfully')
        }
        catch(err){
            errorAuthHandler(err,res)
        }
    }
    static login = async(req,res)=>{
        try{
            const user =await userModel.loginUser(req.body.email,req.body.password)
            const token = await user.generateToken()
            successHandler({user,token},res,'user Logged in successfully')
        }
        catch(err){
            errorAuthHandler(err,res)
            console.log(err)
        }
    }
    static editProfile=async (req,res)=>{
        try{
            const user=await userModel.findByIdAndUpdate(req.user._id,
                {$set:req.body}
                )
            successHandler(user,res,'user edited successfully')
        }
        catch(err){
            errorHandler(err,res,'Error editing this user')
        }
    }
    static showProfile=async (req,res)=>{
        try{
            const user=await userModel.findById(req.user._id)
            successHandler(user,res,'user shown successfully')
        }
        catch(err){
            errorHandler(err,res,'Error showing this user')
        }
    }
    static changePhoto=async (req,res)=>{
        try{
            await productModel.findByIdAndUpdate(req.params.id,{
                $set:{profilePic:"uploads" + req.user._id + "/" + req.file.filename}
            })
            successHandler("uploads" + req.user._id + "/" + req.file.filename,res,'Image uploaded successfully')
        }
        catch(err){
            errorHandler(err,res,'Error uploading image')
        }
    }

    static logout=async(req,res)=>{
        try{
            req.user.tokens=req.user.tokens.filter(token=>token!=req.token)
            await req.user.save()
            successHandler(null,res,'user logged out successfully')
        }
        catch(err){
            errorHandler(err,res,'Error logging out')
        }
    }

}
module.exports=User