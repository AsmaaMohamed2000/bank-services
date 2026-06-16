
const Transactions=require('../models/Transactions.model')
const transactionsService={
    getTransactions:async(userId)=>{

      const transactions = (
        await Transactions.find({  initiatedBy:userId  })
      )
      if(transactions.length===0){
        throw new Error('no transactions found')
      }
      return transactions
     
     }

    }

module.exports=transactionsService




