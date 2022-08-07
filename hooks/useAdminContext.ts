import AdminContext from "../context/AdminContext";
import { useContext } from "react";

const useAdminContext = () => {
  return useContext(AdminContext);
};

export default useAdminContext;