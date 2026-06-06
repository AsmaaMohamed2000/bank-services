const Account = require('../models/account.model')

function generateAccountNumber() {
    return Math.floor(
        1000000000 + Math.random() * 9000000000
    ).toString()
}

function generateIBAN() {
    return `EG${Date.now()}`
}

const AccountService ={

     createAccount:async(userId)=> {

        const existingAccount = await Account.findOne({
            user: userId
        })

        if (existingAccount) {
            throw new Error('Account already exists')
        }

        const account = await Account.create({
            user: userId,
            accountNumber: generateAccountNumber(),
            iban: generateIBAN(),
            balance: 0,
            availableBalance: 0,
            accountType: 'checking',
            currency: 'EGP'
        })

        return account
    },

     getMyAccount:async(userId)=> {

        const account = await Account.findOne({
            user: userId
        })

        if (!account) {
            throw new Error('Account not found')
        }

        return account
    }
}

module.exports = AccountService