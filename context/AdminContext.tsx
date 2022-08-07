import { createContext } from "react";

const AdminContext = createContext({
  isAdmin: false,
  setIsAdmin: (value: boolean) => {}
});

export default AdminContext;