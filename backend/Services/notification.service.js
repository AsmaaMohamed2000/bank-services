const Notification = require("../models/Notifications.model")

const notificationService = {

    getMyNotifications: async (userId) => {

        const notifications = await Notification.find({
            user: userId
        })
        

        return notifications
    },

    markAsRead: async (notificationId, userId) => {

        const notification = await Notification.findOne({
            _id: notificationId,
            user: userId
        })

        if (!notification) {
            throw new Error("Notification not found")
        }

        notification.isRead = true
        

        await notification.save()

        return notification
    },

    markAllAsRead: async (userId) => {

        await Notification.updateMany(
            {
                user: userId,
                isRead: false
            },
            {
                isRead: true,
               
            }
        )

        return true
    },

    deleteNotification: async (notificationId, userId) => {

        const notification = await Notification.findOne({
            _id: notificationId,
            user: userId
        })

        if (!notification) {
            throw new Error("Notification not found")
        }

        await notification.deleteOne()

        return notificationId
    },

    getUnreadCount: async (userId) => {

        const count = await Notification.countDocuments({
            user: userId,
            isRead: false
        })

        return count
    }

}

module.exports = notificationService