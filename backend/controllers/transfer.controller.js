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
                  const transaction = await Transaction.create({
              sender: senderAccount._id,
              initiatedBy: user._id,
        
              type: "transfer",
        
              sourceType: "account",
              destinationType: rest.cardNumber
          ? "card"
          : "account",
        
              amount,
        
              balanceBefore:null,
              balanceAfter: null,
        
              status: "failed",
        
              failureReason:'Account Not Found',
        
              processedAt: new Date(),
            });
              await Notification.create({
              user: null,
              title: "Transfer failed",
              message:`Account Not Found `,
            });
        return res.status(404).json({
          success: false,
          message: "Account not found"
        })
      }
 const balanceBefore = senderAccount.balance
      let receiverAccount

      if (rest.cardNumber) {

        const receiverCard = await Card.findOne({
          cardNumber: rest.cardNumber
        })

        if (!receiverCard) {
                  const transaction = await Transaction.create({
            sender: senderAccount._id,
              initiatedBy: user._id,
        
              type: "transfer",
        
              sourceType: "account",
              destinationType:  "card",
          
        
              amount,
        
              balanceBefore,
              balanceAfter: senderAccount.balance,
        
              status: "failed",
        
              failureReason:'Receiver Card Not Found',
        
              processedAt: new Date(),
            });
              await Notification.create({
              user:senderAccount.user,
              title: "Transfer failed",
              message:`Receiver Card Not Found `,
            });
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
                const transaction = await Transaction.create({
              sender: senderAccount._id,
              initiatedBy: user._id,
        
              type: "transfer",
        
              sourceType: "account",
              destinationType: rest.cardNumber
          ? "card"
          : "account",
        
              amount,
        
              balanceBefore,
              balanceAfter:senderAccount.balance,
        
              status: "failed",
        
              failureReason:'Receiver account not found',
        
              processedAt: new Date(),
            });
              await Notification.create({
              user: senderAccount.user,
              title: "Transfer failed",
              message:`Receiver account not found `,
            });
        return res.status(404).json({
          success: false,
          message: "Receiver account not found"
        })
      }

      if (
        senderAccount._id.toString() ===
        receiverAccount._id.toString()
      ) {
               const transaction = await Transaction.create({
             sender: senderAccount._id,
              initiatedBy: user._id,
        
              type: "transfer",
        
              sourceType: "account",
              destinationType: rest.cardNumber
          ? "card"
          : "account",
        
              amount,
        
              balanceBefore,
              balanceAfter: senderAccount.balance,
        
              status: "failed",
        
              failureReason:"You can't transfer to yourself",
        
              processedAt: new Date(),
            });
              await Notification.create({
              user: senderAccount.user,
              title: "Transfer failed",
              message:`You can't transfer to yourself `,
            });
        return res.status(400).json({
          success: false,
          message: "You can't transfer to yourself"
        })
      }

      if (senderAccount.balance < amount) {
               const transaction = await Transaction.create({
              sender: senderAccount._id,
              initiatedBy: user._id,
        
              type: "transfer",
        
              sourceType: "account",
              destinationType: rest.cardNumber
          ? "card"
          : "account",
        
              amount,
        
              balanceBefore,
              balanceAfter: senderAccount.balance,
        
              status: "failed",
        
              failureReason:"Insufficient balance",
        
              processedAt: new Date(),
            });
              await Notification.create({
              user: senderAccount.user,
              title: "Transfer failed",
              message:`Insufficient balance `,
            })

        return res.status(400).json({
          success: false,
          message: "Insufficient balance"
        })
      }

     

      senderAccount.balance -= Number(amount)
      receiverAccount.balance += Number(amount)

      await senderAccount.save()
      await receiverAccount.save()

      const trx = await Transaction.create({
        sender: senderAccount._id,
        receiver: receiverAccount._id,
        initiatedBy: user._id,

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