const errorHandler=require('../helpers/errorHandler')
const successHandler=require('../helpers/successHandler')
const classModel=require('../models/class.model')
const ipModel=require('../models/ip.model')
class Class{
    static addClass=async(req,res)=>{
        try{
            const clazz=await new classModel(req.body)
            await clazz.save()
            successHandler(clazz,res,'class added successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static addIp=async(req,res)=>{
        try{    
            const existIp=await ipModel.findOne({ip:req.body.ip})
            if(!existIp){
                const ip=await new ipModel(req.body)
                await ip.save()
                successHandler(ip,res,'ip added successfully')
            }else{
                throw new Error('exist')
            }
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static removeIp=async(req,res)=>{
        try{    
            await ipModel.findByIdAndRemove(req.params.id)
            successHandler(null,res,'ip added successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static editClass=async(req,res)=>{
        try{
            const clazz=await classModel.findByIdAndUpdate(req.params.classId,req.body)
            successHandler(clazz,res,'class edited successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static getSingleClass=async(req,res)=>{
        try{
            const clazz=await classModel.findById(req.params.classId)
            successHandler(clazz,res,'people shown successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static removeClass=async(req,res)=>{
        try{
            const clazz=await classModel.findByIdAndRemove(req.params.classId)
            successHandler(clazz,res,'class removed successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static showMClass=async(req,res)=>{
        try{
            console.log('in')
            const mClasses=await classModel.find({MorN:"M"})
            successHandler(mClasses,res,'classes shown successfully')
        }
        catch(err){
            console.error(err)
            errorHandler(err,res)
        }
    }
    static showNClass=async(req,res)=>{
        try{
            const nClasses=await classModel.find({MorN:"N"})
            successHandler(nClasses,res,'classes shown successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static reserveClass=async(req,res)=>{
        try{
            const clazz =await classModel.findById(req.params.classId)
                if(clazz.count <=19){
                    await classModel.findByIdAndUpdate(req.params.classId,{
                        $push:{
                            people:{name:req.body.name,phone:req.body.phone}
                        }
                    })
                    await classModel.findByIdAndUpdate(req.params.classId,{$set:{
                        count:clazz.people.length+1
                    }})
                    successHandler(null,res,'count increased successfully')    
                }
                else{
                    throw new Error('sorry')
                }
            
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static removePerson=async(req,res)=>{
        try{
            const clazz =await classModel.findById(req.params.classId)
            const newPeople=await clazz.people.filter(p=>p.id!==req.params.personId)
            // await ipModel.deleteOne({ip:req.body.ip})
            const newClazz=clazz
            newClazz.people=newPeople
                await classModel.findByIdAndUpdate(req.params.classId,{
                    $pull:{
                    people:{_id:req.params.personId}
                }
                })
                await classModel.findByIdAndUpdate(req.params.classId,{$set:{
                    count:clazz.people.length
                }})

                successHandler(newClazz,res,'count decreased successfully')    
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static removeAllPeople=async(req,res)=>{
        try{
            const clazz =await classModel.findById(req.params.classId)
                await classModel.findByIdAndUpdate(req.params.classId,{$set:{
                    count:0,people:[]
                }})
                await ipModel.deleteMany({classId:req.params.classId})
                successHandler(clazz,res,'count decreased successfully')    
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static hideClass=async(req,res)=>{
        try{
            const clazz =await classModel.findByIdAndUpdate(req.params.classId,req.body)
            console.log(clazz.visible)
            successHandler(clazz,res,'visibilty changed')
        }
        catch(err){
            errorHandler(err,res)
        }
    }

    static addTableItem= async(req,res)=>{
            try{    
                const table=await new tableModel(req.body)
                await table.save()
                successHandler(table,res,'table added successfully')
            }
            catch(err){
                errorHandler(err,res)
            }    
    }
    static editTableItem= async(req,res)=>{
            try{    
                const table=await new tableModel(req.body)
                await table.save()
                successHandler(table,res,'table editded successfully')
            }
            catch(err){
                errorHandler(err,res)
            }    
    }
}
module.exports=Class