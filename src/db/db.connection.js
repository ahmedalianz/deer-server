const mongoose=require('mongoose')
const dbUrl=process.env.MONGO_URL
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>console.log('connected to DataBase'))
.catch((err) => console.log(err))