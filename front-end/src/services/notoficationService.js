import { User } from "lucide-react"
import axiosInstance from "../api/axois"

export const getNotifications = async (user) => {

    const res = await axiosInstance.post(
        '/notifications',user
    )

    return res.data
}

export const getUnreadCount = async (user) => {

    const res = await axiosInstance.post(
       '/notifications/unread-count',user
    )

    return res.data
}

export const markAsRead = async (id, user) => {

    const res = await axiosInstance.patch(
        `notifications/${id}/read`,
        user
    )

    return res.data
}

export const markAllAsRead = async (user) => {

    const res = await axiosInstance.patch(
      '/notifications/read-all',
       user
    )

    return res.data
}

export const deleteNotification = async (id,user) => {

    const res = await axiosInstance.delete(
        `/notifications/${id}`,
      {user}
    )

    return res.data
}