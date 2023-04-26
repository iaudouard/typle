import { useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

export const useNotifications = () => {
  const cookies = new Cookies();
  const notifications: string[] = [
    "You can now press tab to reset your current test.",
  ];

  useEffect(() => {
    notifications.forEach((notification) => {
      if (cookies.get(notification) !== "1") {
        toast(notification, { icon: "ℹ️", id: notification });
        cookies.set(notification, "1");
      }
    });
  }, []);
};
