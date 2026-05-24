const User=require('../models/user')
const Card=require('../models/Cart')
const adminCardController={
    getAllCards:async (req ,res)=>{
        const cards=await Card.find().populate('user' ,'name email')
        res.json(cards)

    },
    deleteCard:async (req ,res)=>{
        await Card.findByIdAndDelete(req.params.id)
        res.json({message:''})
    }
}
module.exports=adminCardController