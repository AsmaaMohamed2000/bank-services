const Account = require("../models/Account.model")
const Card = require("../models/Card.model")
const bcrypt = require("bcryptjs")

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
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }

        const existingCard = await Card.findOne({
            account: account._id
        })

        if (existingCard) {
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
            expiryDate: "12/30",
            cvvHash
        })
console.log(card)
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
}


}

module.exports =cardController