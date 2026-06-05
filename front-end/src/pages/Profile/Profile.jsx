import { motion } from "framer-motion";
import { Wallet, Mail, CreditCard, User } from "lucide-react";
import { useState } from "react";
function Profile() {
  const user = { name: "asmaa", email: "hhggggg" };
  const [Card, setCard] = useState({
    cardNumber: "77766655544",
    expiryDate: "12/12",
    CVV: "123",
    balance: 233333,
  });
  const [flipped, setFlipped] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const totalBalace = Card.balance;
  const handleSubmit = () => {};
  return (
    <div className="pt-24 min-h-screen w-full bg-linear-to-br from-[#0a0f1f]  via-[#101a3a] to-[#1a237e]  flex  flex-col items-center justify-center  text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-[800px] h-[800px] bg-purple-600/20 rounded-full  blur-3xl -top-[200px] -left-[200px] "
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-[700px] h-[700px] bg-blue-600/20 rounded-full  blur-3xl top-[-200px] left-[-200px] right-[-200px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12 "
      >
        <h1 className="text-3xl md:text-4xl  font-extrabold mb-2 tracking-wide">
          profile
        </h1>
        <p className="text-sm text-gray-400 my-5">
          welcome {user?.name} in Neo Bank
        </p>
        <motion.div
          initial={{ opaci: 0, y: 30 }}
          animate={{ opaci: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative perspective mb-10  "
        >
          <motion.div
            onClick={() => setFlipped(!flipped)}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 1 }}
            style={{ transformStyle: "preserve-3d" }}
            className="cursor-pointer w-[300px] md:w-[400px] h-[220px] md:h-[260px] "
          >
            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl py-3 px-5 bg-linear-to-r from-indigo-600 via-purple-600  to-pink-500 text-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <div className="flex justify-between  items-center  mb-5 ">
                <div className="text-xs md:text-sm ">NeoBank VISA</div>
                <div className="text-right">
                  <div className="text-white/70 ">available</div>
                  <div className="font-semibold ">{Card?.expiryDate}</div>
                </div>
              </div>
              <div className="text-xl md:text-2xl font-mono  tracking-widest">
                {/* {formatCardNumber(card?.cardNumber)} */}
                5454 6655 7788 7766
              </div>
              <div className="mt-6 flex justify-between text-sm ">
                <div>
                  <div className="text-white/70">user</div>
                  <div className="font-semibold">{user?.name || "user"}</div>
                </div>
                <div className="text-right ">
                  <div className="text-white/70 ">balance</div>
                  <div className="text-lg font-bold">
                    $ {Card?.balance?.toFixed(2) ?? "0.00"}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl p-5 bg-linear-to-r  from-gray-200 to-gray-300  text-gray-800 "
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg",
              }}
            >
              <div className=" h-8 bg-black/80 rounded-sm mb-4 " />
              <div className="flex justify-between items-center mb-4 ">
                <div className="text-left">
                  <div className="text-xs font-extrabold mb-1">CVV</div>
                  <div className="bg-white py-1 px-3 rounded-md font-mono">
                    {Card?.CVV ?? "*"}
                  </div>
                </div>
                <div className="text-xs text-right">
                  <div className="">expired</div>
                  <div className="font-semibold">
                    {Card?.expiryDate ?? "--/--"}
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-xs">dont share</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-3xl  w-[90%] max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 text-gray-200">
          <div className="flex items-center gap-3">
            <User className="text-purple-400 " />
            <div>
              <p className="text-sm text-gray-400"> full name</p>
              <p className="text-base font-semibold">
                {user?.name || "not available"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-400" />
            <div className="">
              <p className="text-sm text-gray-400"> Email</p>
              <p className="text-base font-semibold">
                {user?.email || "not available"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="text-yellow-400 " />
            <div className="">
              <p className="text-sm text-gray-400"> balace</p>
              <p className="text-lg text-yellow-300 ">
                {" "}
                $ {totalBalace.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="text-pink-400" />
            <div className="">
              <p className="text-sm text-gray-400"> number of credit</p>
              <p className="text-base font-semibold ">
                {" "}
                {Card?.cardNumber?.slice(0, 4) ?? "---------"} {` ** `}{" "}
                {Card?.cardNumber?.slice(-4) ?? "---------"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-2xl border mt-8 border-white/20 sm:px-6 sm:py-6 px-3 py-3 md:p-8 rounded-3xl  w-[90%] max-w-3xl text-gray-200 "
      >
        <h3 className="text-xl font-bold mb-4 text-center text-white">
          edit profile
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="" className="text-gray-400 mb-3 text-md">
              name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none"
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-400 text-md mb-3 ">
              email
            </label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition"
          >
            save updated
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Profile;
