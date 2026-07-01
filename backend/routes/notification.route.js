const express = require("express")

const router = express.Router()



const notificationController =
require("../controllers/notification.controller")

router.post(
    "/",
    
    notificationController.getMyNotifications
)

router.post(
    "/unread-count",
   
    notificationController.getUnreadCount
)

router.patch(
    "/read-all",
  
    notificationController.markAllAsRead
)

router.patch(
    "/:id/read",
   
    notificationController.markAsRead
)

router.delete(
    "/:id",
  
    notificationController.deleteNotification
)

module.exports = router