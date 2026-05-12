const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const URL=process.env.MONGO_URL
module.exports=async()=>{
    try{
        await mongoose.connect(URL)
        console.log('connected ')
    }catch(err){
         console.log(err)
    }
}
