const notificationService = require("../services/notification.service")

const notificationController = {

    getMyNotifications: async (req, res) => {

        try {

            const user = req.body

            const notifications =
                await notificationService.getMyNotifications(
                    user._id
                )

            res.status(200).json({
                success: true,
                count: notifications.length,
                notifications
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            })

        }

    },

    markAsRead: async (req, res) => {

        try {

            const user = req.body

            const { id } = req.params

            const notification =
                await notificationService.markAsRead(
                    id,
                    user._id
                )

            res.status(200).json({
                success: true,
                message: "Notification marked as read",
                notification
            })

        } catch (error) {

            res.status(404).json({
                success: false,
                message: error.message
            })

        }

    },

    markAllAsRead: async (req, res) => {

        try {

            const user = req.body

            await notificationService.markAllAsRead(
                user._id
            )

            res.status(200).json({
                success: true,
                message: "All notifications marked as read"
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            })

        }

    },

    deleteNotification: async (req, res) => {

        try {

            const user = req.body.user

            const { id } = req.params

          const Id=  await notificationService.deleteNotification(
                id,
                user._id
            )

            res.status(200).json({
                success: true,
                id:Id,
                message: "Notification deleted successfully"
            })

        } catch (error) {

            res.status(404).json({
                success: false,
                message: error.message
            })

        }

    },

    getUnreadCount: async (req, res) => {

        try {

            const user = req.body

            const count =
                await notificationService.getUnreadCount(
                    user._id
                )

            res.status(200).json({
                success: true,
                unreadCount:count
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            })

        }

    }

}

module.exports = notificationController