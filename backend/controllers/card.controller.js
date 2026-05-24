const User=require('../models/user')
const Card=require('../models/Cart')
function generateCardNumber(){
    const prefix='4000'
    const random=Math.floor(Math.random()*1e12).toString().padStart(12,'0')
    return prefix+random
}
function generateCVV(){
    return Math.floor(Math.random()*900).toString()
}
function generateExpiry(){
    const date=new Date()
    const month=String(date.getMonth()+1).padStart(2,'0')
    const year=(date.getFullYear()+3).toString().slice(2)
    return `${month}/${year}`
}
const cardController={
    createCard:async (req ,res)=>{
      try{
          const exis=await Card.findOne({user:req.user._id})
        if (exis) return res.json({message:''})
        const card=await card.create({
    user:req.user._id,
    CVV:generateCVV(),
    cardNumber:generateCardNumber(),
    expiryDate:generateExpiry()
    }) 
    res.json(card)
      }catch(err){
        res.json({message:''})
      }
    },
    getMyCard:async (req ,res)=>{
        try{
            const card =await Card.findOne({user:req.user._id})
            if(!card) return res.json({message:''})
            res.json(card)
        }catch(err){
            res.json({message:err.message})
        }
    }
}
module.exports=cardController