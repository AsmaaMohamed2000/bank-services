
const Account = require("../models/Account.model");
const Transaction = require("../models/Transactions.model");
const Notification = require("../models/Notifications.model");



;
const withdrawController={
 withdrawMoney : async (req, res) => {
  try {
    const { amount ,user } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const account = await Account.findOne({
      user: user._id,
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (account.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    const balanceBefore = account.balance;

    account.balance -= amount;
    account.lastTransactionAt = new Date();

    await account.save();

    const transaction = await Transaction.create({
      sender: account._id,
      initiatedBy: user._id,

      type: "withdraw",

      sourceType: "account",
      destinationType: "bank",

      amount,

      balanceBefore,
      balanceAfter: account.balance,

      status: "success",

      description: "Cash Withdrawal",

      processedAt: new Date(),
    });

    await Notification.create({
      user: user._id,
      title: "Withdraw Successful",
      message:` ${amount} EGP withdrawn successfully,`,
    });

    res.json({
      success: true,
      transaction,
      balance: account.balance,
    });
     } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
 
}
}
module.exports=withdrawController