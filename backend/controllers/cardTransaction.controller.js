// const notification = require("../models/Notifications.model");
// const transaction = require("../models/Transactions.model");
// const User = require("../models/User.model");
// const Card = require("../models/Card.model");
// const cardTransactionController = {
//   depositToCard: async (req, res) => {
//     const { amount } = req.body;
//     try {
//       const card = await Card.findOne({ user: req.user._id });
//       if (!card) return res.json({ message: "" });
//       card.balance += Number(amount);
//       await card.save();
//       await transaction.create({
//         user: req.user.id,
//         type: "deposit-card",
//         amount,
//         receiver: card.cardNumber,
//       });
//       await notification.create({
//         user: req.user.id,
//         title: "success deposit",
//         message: `${amount} sent to card  account successfully}`,
//       });
//       res.json({
//         success: true,
//         cardBalance: card.balance,
//       });
//     } catch (err) {
//       res.json({ success: false });
//     }
//   },
//   withdrawToCard: async (req, res) => {
//     const { amount } = req.body;
//     try {
//       const card = await Card.findOne({ user: req.user._id });
//       if (!card) return res.json({ message: "" });
//       if (card.balance < amount) return res.json({ message: "" });
//       card.balance += Number(amount);
//       await card.save();
//       await transaction.create({
//         user: req.user.id,
//         type: "withdraw-card",
//         amount,
//         receiver: card.cardNumber,
//       });
//       await notification.create({
//         user: req.user.id,
//         title: "success deposit",
//         message: `${amount} withdraw from  card  account successfully}`,
//       });
//       res.json({
//         success: true,
//         cardBalance: card.balance,
//       });
//     } catch (err) {
//       res.json({ success: false });
//     }
//   },
//   getCardBalance: async (req, res) => {
//     const card = await Card.findOne({ user: req.user._id });
//     if (!card) return res.json({ message: "" });
//     res.json(card);
//   },
//   transferToCard: async (req, res) => {
//     const { amount } = req.body;
//     try {
//       const user = await User.findById(req.user._id);
//       const card = await Card.findOne({ user: req.user._id });
//       if (!card) return res.json({ message: "" });
//       if (user.balance < amount) return res.json({ message: "" });
//       user.balance -= Number(amount);
//       card.balance += Number(amount);
//       await user.save();
//       await card.save();
//       await transaction.create({
//         user: req.user.id,
//         type: "transfer-to-card",
//         amount,
//         receiver: card.cardNumber,
//       });
//       await notification.create({
//         user: req.user.id,
//         title: "interior transfer ",
//         message: `${amount} transfered o  card from  account successfully}`,
//       });
//       res.json({
//         success: true,
//         cardBalance: card.balance,
//         userBalance: user.balance,
//       });
//     } catch (err) {
//       res.json({ success: false });
//     }
//   },
//   transferToAccount: async (req, res) => {
//     const { amount } = req.body;
//     try {
//       const user = await User.findById(req.user._id);
//       const card = await Card.findOne({ user: req.user._id });
//       if (!card) return res.json({ message: "" });
//       if (card.balance < amount) return res.json({ message: "" });
//       user.balance += Number(amount);
//       card.balance -= Number(amount);
//       await user.save();
//       await card.save();
//       await transaction.create({
//         user: req.user.id,
//         type: "transfer-to-account",
//         amount,
//         receiver: user.email,
//       });
//       await notification.create({
//         user: req.user.id,
//         title: "interior transfer ",
//         message: `${amount} transfered from  card to account successfully}`,
//       });
//       res.json({
//         success: true,
//         cardBalance: card.balance,
//         userBalance: user.balance,
//       });
//     } catch (err) {
//       res.json({ success: false });
//     }
//   },
// };
