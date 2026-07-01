const Account = require("../models/Account.model")
const Card = require("../models/Card.model")
const bcrypt = require("bcryptjs")
const Notification=require('../models/Notifications.model')
const generateCardNumber = () => {
    return Math.floor(
        1000000000000000 + Math.random() * 9000000000000000
    ).toString()
}

const generateCVV = () => {
    return Math.floor(
        100 + Math.random() * 900
    ).toString()
}
  const expiryDate = new Date()

    expiryDate.setFullYear(
        expiryDate.getFullYear() + 5
    )

const cardController={
    createCard : async (req, res) => {
    try {

        const { accountID,user } = req.body
console.log(accountID)
        if (!accountID) {
            return res.status(400).json({
                success: false,
                message: "Account id is required"
            })
        }

        const account = await Account.findOne({
            _id: accountID,
            user: user._id
        })

        if (!account) {
              await Notification.create({
                    user:user._id,
                    title: "create card failed",
                    message: `Account not found`
                  })
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }

        const existingCard = await Card.findOne({
            account: account._id
        })

        if (existingCard) {
               await Notification.create({
                    user:user._id,
                    title: "create card failed",
                    message: `This account already has a card`
                  })
            return res.status(400).json({
                success: false,
                message: "This account already has a card"
            })
        }

        const cardNumber = generateCardNumber()
        const cvv = generateCVV()

        const cvvHash = await bcrypt.hash(cvv, 10)

        const card = await Card.create({
            user: user._id,
            account: account._id,
            cardNumber,
            last4: cardNumber.slice(-4),
            cardHolderName: user.fullName,
            network: "visa",
            expiryDate,
            cvvHash
        })
        
console.log(card)
   await Notification.create({
                     user:user._id,
                    title: "create card",
                    message: `card created successfully`
                  })
        res.status(201).json({
            success: true,
            message: "Card created successfully",
            data: {
                ...card.toObject(),
                cvv
            }
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
},


getCards : async (req, res) => {
    const user=req.body
    try {

        const cards = await Card.find({
            user: user._id
        })
        .populate("account", "accountNumber balance accountType")
        .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: cards.length,
            cards
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
},
freeseCard: async (req, res) => {
    try {

        const { id } = req.params
        const  user  = req.body

        const card = await Card.findOne({
            _id: id,
            user: user._id
        })

        if (!card) {
               await Notification.create({
                    user: user._id,
                    title: "freeze card failed",
                    message: `Card Not Found`
                  })
            return res.status(404).json({
                success: false,
                message: "Card not found"
            })
        }

        card.isFrozen = !card.isFrozen

        await card.save()
   await Notification.create({
                   user: user._id,
                    title: "card frozen successfully",
                    message:  card.isFrozen
                ? "Card frozen successfully"
                : "Card unfrozen successfully"
                  })
        res.status(200).json({
            success: true,
            message: card.isFrozen
                ? "Card frozen successfully"
                : "Card unfrozen successfully",
            card
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
},

blockCard: async (req, res) => {
    try {

        const { id } = req.params
        const  user  = req.body

        const card = await Card.findOne({
            _id: id,
            user: user._id
        })

        if (!card) {
               await Notification.create({
                    user: user._id,
                    title: "block card failed",
                    message: `Card Not Found`
                  })
            return res.status(404).json({
                success: false,
                message: "Card not found"
            })
        }

        card.status = 'blocked'

        await card.save()
   await Notification.create({
                    user: user._id,
                    title: "block card",
                    message: `card is blocked successfully`
                  })
        res.status(200).json({
            success: true,
            message:'card is blocked successfully'
            
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
},
 replaceCard :async (req, res) => {

    const { id } = req.params
const user=req.body
    const oldCard = await Card.findById(id)

    if (!oldCard) {
          await Notification.create({
                    user: user._id,
                    title: "replace card failed",
                    message: `Card Not Found`
                  })
        res.status(404).json({
            success:false,
            message:'card not found'
        })
        
    }

    if (oldCard.user.toString() !== user._id.toString()) {
        res.status(403)
        .json({
            success:false,
            message:'Not authorized'
        })
    }

    if (oldCard.status !== "blocked") {
          await Notification.create({
                    user: user._id,
                    title: "replace card failed",
                    message: `Only blocked cards can be replaced`
                  })
        res.status(400).json({
            success:false,
            message:'Only blocked cards can be replaced'
        })
      
    }

    if (oldCard.isReplaced) {
         await Notification.create({
                    user: user._id,
                    title: "replace card failed",
                    message: `This card has already been replaced`
                  })
     return   res.status(400).json({
            success:false,
            message:'This card has already been replaced'
        })
       
    }

  
    // let existingCard

    // do {
    //     cardNumber =
    //         Math.floor(
    //             1000000000000000 +
    //             Math.random() * 9000000000000000
    //         ).toString()

    //     existingCard = await Card.findOne({ cardNumber })

    // } while (existingCard)

  

    // const expiryDate = new Date()

    // expiryDate.setFullYear(
    //     expiryDate.getFullYear() + 5
    // )

       const cardNumber = generateCardNumber()
        const cvv = generateCVV()

        const cvvHash = await bcrypt.hash(cvv, 10)

        const newCard = await Card.create({
            user: user._id,
            account: oldCard.account._id,
            cardNumber,
            last4: cardNumber.slice(-4),
            cardHolderName: user.fullName,
            network: "visa",
            expiryDate,
            cvvHash
        })

    oldCard.isReplaced = true
    oldCard.replacedBy = newCard._id

    await oldCard.save()
   await Notification.create({
                    user: user._id,
                    title: "replace card ",
                    message: `Card replaced successfully`
                  })
    res.status(201).json({
        success: true,
        message: "Card replaced successfully",
        oldCardId: oldCard._id,
        newCard
    })

}
}



module.exports =cardController