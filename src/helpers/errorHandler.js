const errorHandler=(err,res,message)=>{
    console.log(err)
    res.status(500).send({
        status:'failed',
        data:err.message,
        message
    })
}
module.exports=errorHandler