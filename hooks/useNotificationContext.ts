import NotificationContext from "../context/NotificationContext";
import { useContext } from "react";

const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export default useNotificationContext;