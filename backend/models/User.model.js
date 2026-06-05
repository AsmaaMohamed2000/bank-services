const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,required:true ,trim:true 
    },
    email:{ type:String,required:true,unique:true ,trim:true ,lowercase:true },
     password:{type:String,required:true,select:false},
    nationalId:{ type:String,required:true,unique:true },
    phone:{
        type:String,required:true 
    },
    role:{
        type:String,enum:['user','admin'] ,default:'user'
    },
   
    isVerified:{
        type:Boolean ,default:false
    }
    ,isBlocked:{
        type:Boolean,default:false
    },
    tokens:[
        {
            token:String, ip:String,device:String

        }
    ]
   

},{
    timestamps:true
})
userSchema.pre('save',async function(){
    if(!this.isModified('password')) return 
    this.password=await bcrypt.hash(this.password,10)

})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken= function(){
       const token = jwt.sign(
          { id: this._id, role:this.role },
          process.env.ACCESS_TOKEN,
          { expiresIn: '15m' }
        )
        return token
}
userSchema.methods.generateRefreshToken=async function(data){
    const {ip,device}=data
       const token = jwt.sign(
          { id: this._id },
          process.env.REFRESH_TOKEN,
          { expiresIn: '7d' }
        )
        const hashedToken=await bcrypt.hash(token,10)
        this.tokens.push({token:hashedToken,device,ip})
        await this.save()
        return token
}
userSchema.methods.toJSON=function(){
     const user=this.toObject()
     delete user.password 
       delete user.tokens
     return user
}
module.exports =
  mongoose.models.User || mongoose.model('User', userSchema)