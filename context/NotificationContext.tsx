import { createContext } from "react";

const NotificationContext = createContext({
  notificationMessage: '',
  setNotificationMessage: (message: string) => {}
});

export default NotificationContext;