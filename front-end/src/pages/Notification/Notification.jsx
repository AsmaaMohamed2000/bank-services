import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bell,
  CheckCircle,
  Clock,
  Trash2,
  MailOpen,
  AlertCircle,
  CreditCard,
  Wallet,
  ShieldAlert
} from "lucide-react"
import { toast } from "react-toastify"

import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from "../../redux/notifications/notificationsSlice"

function Notification() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const {
    notifications,
    unreadCount,
    loading
  } = useSelector((state) => state.notification)

  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    if (user) {
      dispatch(getNotifications(user))
      dispatch(getUnreadCount(user))
    }
  }, [dispatch, user])

  const handleRead = async (id) => {
    const res = await dispatch(markAsRead({ id, user }))

    if (!res.error) {
      dispatch(getUnreadCount(user))
      toast.success("Notification marked as read")
    }
  }

  const handleReadAll = async () => {
    const res = await dispatch(markAllAsRead(user))

    if (!res.error) {
      dispatch(getUnreadCount(user))
      toast.success("All notifications marked as read")
    }
  }

  const handleDelete = async () => {
    const res = await dispatch(
      deleteNotification({
        id: deleteId,
        user
      })
    )

    if (!res.error) {
      dispatch(getUnreadCount(user))
      setDeleteId(null)
      toast.success("Notification deleted")
    }
  }

  const total = notifications?.length || 0

  const getIcon = (title = "") => {
    const value = title.toLowerCase()

    if (value.includes("card"))
      return <CreditCard className="text-blue-400" size={24} />

    if (value.includes("deposit"))
      return <Wallet className="text-green-400" size={24} />

    if (value.includes("withdraw"))
      return <Wallet className="text-red-400" size={24} />

    if (value.includes("security"))
      return <ShieldAlert className="text-red-400" size={24} />

    if (value.includes("alert"))
      return <AlertCircle className="text-yellow-400" size={24} />

    return <Bell className="text-purple-400" size={24} />
  }

  const formatTime = (date) => {
    const now = new Date()
    const created = new Date(date)

    const diff = Math.floor((now - created) / 1000)

    if (diff < 60) return "Just now"

    if (diff < 3600)
      return `${Math.floor(diff / 60)} minutes ago`

    if (diff < 86400)
      return` ${Math.floor(diff / 3600)} hours ago`

    if (diff < 172800)
      return "Yesterday"

    return `${Math.floor(diff / 86400)} days ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0014] flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    )
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0014] text-white pt-28 pb-10 px-4">

      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#3b0068] to-[#8e00ff]" />

      <div className="absolute w-[700px] h-[700px] rounded-full bg-purple-700/20 blur-[180px] left-1/2 -translate-x-1/2 top-0 animate-pulse" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >

          <div>

            <div className="flex items-center gap-4">

              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Bell
                  size={55}
                  className="text-yellow-400 drop-shadow-lg"
                />
              </motion.div>

              <div>

                <h1 className="text-4xl font-bold">
                  Notifications
                </h1>

                <p className="text-gray-300 mt-1">
                  Stay updated with your latest banking activities
                </p>

              </div>

            </div>

          </div>

          <div className="flex gap-4">

            <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl px-6 py-4 min-w-[140px]">

              <p className="text-sm text-gray-400">
                Total
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {total}
              </h2>

            </div>

            <div className="rounded-2xl bg-purple-600/20 border border-purple-500/40 backdrop-blur-xl px-6 py-4 min-w-[140px]">

              <p className="text-sm text-gray-300">
                Unread
              </p>

              <h2 className="text-3xl font-bold text-yellow-300 mt-2">
                {unreadCount}
              </h2>

            </div>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end mb-8"
        >

          <button
            onClick={handleReadAll}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 transition"
          >

            <MailOpen size={20} />

            Mark all as read

          </button>

        </motion.div>

        {
          notifications.length === 0 ?

          (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-14 text-center"
            >

              <Bell
                size={80}
                className="mx-auto text-purple-400 mb-6"
              />

              <h2 className="text-3xl font-bold">
                No Notifications
              </h2>

              <p className="text-gray-400 mt-3">
                We'll notify you whenever something important happens.
              </p>

            </motion.div>

          )

          :

          ( <div className="space-y-5">

              <AnimatePresence>

                {notifications.map((item, index) => (

                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{
                      delay: index * .06
                    }}
                    className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl p-6 transition duration-300 hover:scale-[1.02]
                    ${
                      item.read
                      ?
                      "bg-white/5 border-white/10"
                      :
                      "bg-gradient-to-r from-purple-700/25 to-pink-700/15 border-purple-500/40"
                    }`}
                  >
                  {!item.read&&(
                      <span className="absolute top-5 right-5 w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
               
                  )}

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div className="flex gap-4 flex-1">

                          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                            {getIcon(item.title)}
                          </div>

                          <div className="flex-1">

                            <h2 className="text-xl font-bold">
                              {item.title}
                            </h2>

                            <p className="text-gray-300 mt-2 leading-7">
                              {item.message}
                            </p>

                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">

                              <Clock size={16} />

                              {formatTime(item.createdAt)}

                            </div>

                          </div>

                        </div>

                        <div className="flex items-center gap-3">

                          {!item.read && (

                            <motion.button
                              whileTap={{ scale: .95 }}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => handleRead(item._id)}
                              className="flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-5 py-3 transition"
                            >

                              <CheckCircle size={18} />

                              Mark as read

                            </motion.button>

                          )}

                          <motion.button
                            whileTap={{ scale: .95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setDeleteId(item._id)}
                            className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 transition"
                          >

                            <Trash2 size={18} />

                            Delete

                          </motion.button>

                        </div>

                      </div>

                   </motion.div>

                ))}

              </AnimatePresence>

            </div>)}

        
        <AnimatePresence>

          {deleteId && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            >

              <motion.div
                initial={{ scale: .8 }}
                animate={{ scale: 1 }}
                exit={{ scale: .8 }}
                className="w-[95%] max-w-md rounded-3xl bg-[#1b1035] border border-white/10 p-8"
              >

                <Trash2
                  size={55}
                  className="mx-auto text-red-500 mb-4"
                />

                <h2 className="text-2xl font-bold text-center">
                  Delete Notification
                </h2>

                <p className="text-gray-400 text-center mt-3">
                  Are you sure you want to delete this notification?
                </p>

                <div className="flex gap-4 mt-8">

                  <button
                    onClick={() => setDeleteId(null)}
                    className="flex-1 rounded-xl border border-white/20 py-3 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 py-3 transition"
                  >
                    Delete
                  </button>

                </div>

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </div>

  )
}

export default Notification