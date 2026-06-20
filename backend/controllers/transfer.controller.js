const Transaction = require("../models/Transactions.model")
const Account = require("../models/Account.model")
const Card = require("../models/Card.model")
const Notification = require("../models/Notifications.model")

const transferController = {
  transfer: async (req, res) => {
    try {
      const { amount,user, ...rest } = req.body

      if (!amount || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount"
        })
      }

      const senderAccount = await Account.findOne({
        user: user._id
      })

      if (!senderAccount) {
        return res.status(404).json({
          success: false,
          message: "Account not found"
        })
      }

      let receiverAccount

      if (rest.cardNumber) {

        const receiverCard = await Card.findOne({
          cardNumber: rest.cardNumber
        })

        if (!receiverCard) {
          return res.status(404).json({
            success: false,
            message: "Card not found"
          })
        }

        receiverAccount = await Account.findById(
          receiverCard.account
        )

      } else if (rest.accountNumber) {

        receiverAccount = await Account.findOne({
          accountNumber: rest.accountNumber
        })

      } else {

        return res.status(400).json({
          success: false,
          message: "Card number or account number is required"
        })

      }

      if (!receiverAccount) {
        return res.status(404).json({
          success: false,
          message: "Receiver account not found"
        })
      }

      if (
        senderAccount._id.toString() ===
        receiverAccount._id.toString()
      ) {
        return res.status(400).json({
          success: false,
          message: "You can't transfer to yourself"
        })
      }

      if (senderAccount.balance < amount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient balance"
        })
      }

      const balanceBefore = senderAccount.balance

      senderAccount.balance -= Number(amount)
      receiverAccount.balance += Number(amount)

      await senderAccount.save()
      await receiverAccount.save()

      const trx = await Transaction.create({
        sender: senderAccount._id,
        receiver: receiverAccount._id,
        initiatedBy: req._id,

        type: "transfer",

        sourceType: "account",

        destinationType: rest.cardNumber
          ? "card"
          : "account",

        amount,

        balanceBefore,
        balanceAfter: senderAccount.balance, 

        status: "success",
        processedAt: new Date()
      })

      await Notification.create({
        user: senderAccount.user,
        title: "Transfer Successful",
        message: `You transferred ${amount} EGP`
      })
     await Notification.create({
        user: receiverAccount.user,
        title: "Money Received",
        message: `You received ${amount} EGP`
      })

      return res.status(200).json({
        success: true,
        message: "Transfer successful",
        balance: senderAccount.balance,
        
      })
 

     } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      })
  }
   
}
}
module.exports = transferController