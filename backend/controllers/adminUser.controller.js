// const User = require("../models/User.model");
// const adminUserController = {
//   getAllUsers: async (req, res) => {
//     const users = await User.find();
//     res.json(users);
//   },
//   deleteuser: async (req, res) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "" });
//   },
//   updateuserbalance: async (req, res) => {
//     const id = req.params.id;
//     const { balance } = req.body;
//     const user = await User.findById(id);
//     if (!user) return req.json({ message: "" });
//     user.balance = balance;
//     await user.save();
//   },
// };
// module.exports = adminUserController;
