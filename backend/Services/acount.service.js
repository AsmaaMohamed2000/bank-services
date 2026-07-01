const Account = require('../models/account.model')
const Notification=require('../models/Notifications.model')
function generateAccountNumber() {
    return Math.floor(
        1000000000 + Math.random() * 9000000000
    ).toString()
}

function generateIBAN() {
    return `EG${Date.now()}`
}

const AccountService ={

     createAccount:async(data)=> {
const {user,rest}=data
let existingAccount
  existingAccount = await Account.findOne({
             user: user._id, accountType:rest.accountType ||'checking'
        })
         if (existingAccount) {
             await Notification.create({
                                user: user._id,
                                title: "create account ",
                                message: `Account already exists`
                              })
            throw new Error('Account already exists')
        }

       

       

        const account = await Account.create({
            user: user._id,
            accountNumber: generateAccountNumber(),
            iban: generateIBAN(),
            balance: 0,
            availableBalance: 0,
            accountType: 'checking',
            currency: 'EGP',
            accountType:rest.accountType ||'checking'
        })
  await Notification.create({
                                user: user._id,
                                title: "create account ",
                                message: `Account created successfully`
                              })
        return account
    },

     getMyAccount:async(userId)=> {
      

        const accounts = await Account.find({
            user: userId
        })

        if (accounts.length===0) {
            throw new Error('Accounts not found')
        }

        return accounts
    }
}

module.exports = AccountService