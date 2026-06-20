import { motion } from "framer-motion";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { getTransactions } from "../../services/getTransactions";

function Transaction() {
    const user=useSelector(state=>state.auth.user)
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [currentPage, setCurrentPage] = useState(3);

  const itemsPerPage = 8;

  // ===========================
  // Fetch Transactions
  // ===========================

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        

        const res = await getTransactions(user)

        setTransactions(res.transactions)

       
      
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ===========================
  // Search + Filter
  // ===========================

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchSearch =
        item.reference
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchType =
        typeFilter === "all" ||
        item.type === typeFilter;

      const matchStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      return (
        matchSearch &&
        matchType &&
        matchStatus
      );
    });
  }, [
    transactions,
    search,
    typeFilter,
    statusFilter,
  ]);

  // ===========================
  // Statistics
  // ===========================

  const totalDeposits = filteredTransactions
    .filter((item) => item.type === "deposit")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalWithdrawals = filteredTransactions
    .filter((item) => item.type === "withdraw")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalTransfers = filteredTransactions.filter(
    (item) => item.type === "transfer"
  ).length;

  // ===========================
  // Pagination
  // ===========================

  const totalPages = Math.ceil(
    filteredTransactions.length / itemsPerPage
  );

  const displayedTransactions =
    filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-[#1a002e] via-[#3a0078] to-[#b48cf2] text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
             {/* Header */}

<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.7 }}
  className="text-center mb-10"
>
  <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
    <Clock size={36} />
  </div>

  <h1 className="text-4xl font-extrabold mt-5">
    Transaction History
  </h1>

  <p className="text-gray-300 mt-2">
    Track deposits, withdrawals and transfers securely
  </p>
</motion.div>
{/* Statistics */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl"
  >
    <ArrowDownCircle
      className="text-green-400 mb-3"
      size={35}
    />

    <p className="text-gray-300 text-sm">
      Total Deposits
    </p>

    <h2 className="text-3xl font-bold text-green-400 mt-2">
      {totalDeposits} EGP
    </h2>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl"
  >
    <ArrowUpCircle
      className="text-red-400 mb-3"
      size={35}
    />

    <p className="text-gray-300 text-sm">
      Total Withdrawals
    </p>

    <h2 className="text-3xl font-bold text-red-400 mt-2">
      {totalWithdrawals} EGP
    </h2>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl"
  >
    <Repeat
      className="text-cyan-400 mb-3"
      size={35}
    />

    <p className="text-gray-300 text-sm">
      Transfers
    </p>

    <h2 className="text-3xl font-bold text-cyan-400 mt-2">
      {totalTransfers}
    </h2>
  </motion.div>

</div>

{/* Search & Filters */}

<div className="mb-8 flex flex-col lg:flex-row gap-4 justify-between">

  <div className="relative w-full lg:w-96">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search by reference or description..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl pl-11 pr-4 py-3 outline-none"
    />

  </div>

  <div className="flex flex-wrap gap-3">

    <select
      value={typeFilter}
      onChange={(e) =>
        setTypeFilter(e.target.value)
      }
      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
    >
      <option value="all">
        All Types
      </option>

      <option value="deposit">
        Deposit
      </option>

      <option value="withdraw">
        Withdraw
      </option>

      <option value="transfer">
        Transfer
      </option>
    </select>

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
    >
      <option value="all">
        All Status
      </option>

      <option value="success">
        Success
      </option>

      <option value="pending">
        Pending
      </option>

      <option value="failed">
        Failed
      </option>
    </select>

    <button
      onClick={() => {
        setSearch("");
        setTypeFilter("all");
        setStatusFilter("all");
      }}
      className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
    >
      Reset
    </button>

  </div>

</div>

{/* Table Container */}

<div className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">

  <div className="overflow-x-auto">
      <table className="min-w-full text-center text-gray-200">

  <thead className="bg-white/10">
    <tr className="text-white text-lg">

      <th className="py-5 px-4">Type</th>

      <th className="py-5 px-4">Amount</th>

      <th className="py-5 px-4">Fee</th>

      <th className="py-5 px-4">Status</th>

      <th className="py-5 px-4">Source</th>

      <th className="py-5 px-4">Destination</th>

      <th className="py-5 px-4">Reference</th>

      <th className="py-5 px-4">Date</th>

    </tr>
  </thead>

  <tbody>

    {loading ? (

      <tr>
        <td
          colSpan={8}
          className="py-16 text-center"
        >
          <div className="flex flex-col items-center gap-4">

            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />

            <p className="text-gray-300">
              Loading Transactions...
            </p>

          </div>
        </td>
      </tr>

    ) : displayedTransactions.length > 0 ? (

      displayedTransactions.map((item, index) => (

        <motion.tr
          key={item._id}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.05,
          }}
          whileHover={{
            backgroundColor:
              "rgba(255,255,255,0.05)",
          }}
          onClick={() =>
            setSelectedTransaction(item)
          }
          className="border-t border-white/10 cursor-pointer"
        >
          {/* Type */}

          <td className="py-5">

            <div className="flex justify-center items-center gap-2">

              {item.type === "deposit" ? (
                <ArrowDownCircle className="text-green-400" />
              ) : item.type ===
                "withdraw" ? (
                <ArrowUpCircle className="text-red-400" />
              ) : (
                <Repeat className="text-cyan-400" />
              )}

              <span className="capitalize">
                {item.type}
              </span>

            </div>

          </td>

          {/* Amount */}

          <td
            className={`py-5 font-bold ${
              item.type === "deposit"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {item.type === "deposit"
              ? "+"
              : "-"}

            {item.amount} EGP
          </td>

          {/* Fee */}

          <td className="py-5">
            {item.fee || 0} EGP
          </td>

          {/* Status */}

          <td className="py-5">

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold

              ${
                item.status ===
                "success"
                  ? "bg-green-500/20 text-green-300"

                  : item.status ===
                    "pending"
                  ? "bg-yellow-500/20 text-yellow-300"

                  : "bg-red-500/20 text-red-300"
              }

              `}
            >
              {item.status}
            </span>

          </td>

          {/* Source */}

          <td className="py-5 capitalize">
            {item.sourceType || "-"}
          </td>

          {/* Destination */}

          <td className="py-5 capitalize">
            {item.destinationType ||
              "-"}
          </td>

          {/* Reference */}

          <td className="py-5 text-cyan-300 text-sm">
            {item.reference}
          </td>

          {/* Date */}

          <td className="py-5 text-sm text-gray-300">
            {new Date(
              item.processedAt ||
                item.createdAt
            ).toLocaleString("en-EG")}
          </td>
        </motion.tr>

      ))

    ) : (

      <tr>

        <td
          colSpan={8}
          className="py-20"
        >
          <div className="flex flex-col items-center">

            <Clock
              size={60}
              className="text-gray-400 mb-5"
            />

            <h2 className="text-2xl font-bold mb-2">
              No Transactions Found
            </h2>

            <p className="text-gray-400">
              Your deposits,
              withdrawals and
              transfers will appear
              here.
            </p>

          </div>
        </td>

      </tr>

    )}

  </tbody>

</table>
  </div>

 </div>
 
{/* Pagination */}

{totalPages > 1 && (
  <div className="flex items-center justify-center gap-3 mt-8">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 disabled:opacity-40 hover:bg-white/20 transition"
    >
      Previous
    </button>

    <span className="font-semibold text-white">
      {currentPage} / {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 disabled:opacity-40 hover:bg-white/20 transition"
    >
      Next
    </button>

  </div>
)}

{/* Details Modal */}

{selectedTransaction && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-2xl rounded-3xl bg-[#22103d] border border-white/20 p-8 shadow-2xl text-white"
    >
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Transaction Details
        </h2>

        <button
          onClick={() => setSelectedTransaction(null)}
          className="text-3xl hover:text-red-400 transition"
        >
          ×
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <p className="text-gray-400 text-sm">
            Type
          </p>

          <h3 className="font-bold text-lg capitalize">
            {selectedTransaction.type}
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Status
          </p>

          <h3 className="font-bold text-lg capitalize">
            {selectedTransaction.status}
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Amount
          </p>

          <h3 className="font-bold text-green-400 text-lg">
            {selectedTransaction.amount} EGP
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Fee
          </p>

          <h3 className="font-bold text-lg">
            {selectedTransaction.fee || 0} EGP
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Source
          </p>

          <h3 className="font-bold capitalize">
            {selectedTransaction.sourceType || "-"}
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Destination
          </p>

          <h3 className="font-bold capitalize">
            {selectedTransaction.destinationType || "-"}
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Balance Before
          </p>

          <h3 className="font-bold">
            {selectedTransaction.balanceBefore ?? "-"} EGP
          </h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Balance After
          </p>

          <h3 className="font-bold">
            {selectedTransaction.balanceAfter ?? "-"} EGP
          </h3>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-400 text-sm">
            Reference
          </p>

          <h3 className="font-bold text-cyan-300 break-all">
            {selectedTransaction.reference}
          </h3>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-400 text-sm">
            Description
          </p>

          <h3>
            {selectedTransaction.description ||
              "No description"}
          </h3>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-400 text-sm">
            Processed At
          </p>

          <h3>
            {new Date(
              selectedTransaction.processedAt ||
                selectedTransaction.createdAt
            ).toLocaleString("en-EG")}
          </h3>
        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => setSelectedTransaction(null)}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
        >
          Close
        </button>

      </div>
    </motion.div>
  </div>
)}

{/* Footer */}

<div className="text-center mt-12 text-gray-300">
  &copy; 2026 NeoBank • Secure Banking Experience
</div>

</motion.div>
</div>
     
)}
export default Transaction
