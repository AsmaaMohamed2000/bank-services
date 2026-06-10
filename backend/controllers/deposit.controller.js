const Notification=require('../models/Notifications.model')
const Transaction=require('../models/Transactions.model')
const Stripe=require('stripe')
const Account=require('../models/Account.model')
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const depositStripe={
createDepositSession :async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: "egp",

            product_data: {
              name: "Account Deposit",
            },

            unit_amount: Number(amount) * 100,
          },
        },
      ],

      metadata: {
        userId: req.body.user._id.toString(),
      },

      success_url: "http://localhost:5173/deposit-success",

      cancel_url: "http://localhost:5173/dashboard",
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
},
stripeWebhook: async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(err.message);
  }

  try {
    if (event.type !== "checkout.session.completed") {
      return res.json({ received: true });
    }

    const session = event.data.object;

    if (!session || session.payment_status !== "paid") {
      return res.json({ received: true });
    }

    const userId = session.metadata?.userId;

    if (!userId) {
      console.log("Missing userId in metadata");
      return res.json({ received: true });
    }

    const amount = session.amount_total / 100;

    const exists = await Transaction.findOne({
      stripeSessionId: session.id,
    });

    if (exists) {
      return res.json({ received: true });
    }

    const account = await Account.findOne({ user: userId });

    if (!account) {
      return res.json({ received: true });
    }

    const balanceBefore = account.balance;

    account.balance += amount;
    await account.save();

    await Transaction.create({
      receiver: account._id,
      initiatedBy: userId,
      stripeSessionId: session.id,
      type: "deposit",
      sourceType: "bank",
      destinationType: "account",
      amount,
      balanceBefore,
      balanceAfter: account.balance,
      status: "success",
      description: "Deposit via Stripe",
      processedAt: new Date(),
    });

    await Notification.create({
      user: userId,
      title: "Deposit Successful",
      message: `${amount} EGP deposited successfully,`
    });

    return res.json({ received: true });

  } catch (err) {
    console.log("WEBHOOK ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

}
module.exports=depositStripe