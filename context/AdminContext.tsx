import { createContext } from "react";

interface AdminContext {
  isAdmin: boolean | undefined;
  setIsAdmin: (value: boolean) => void;
}

const AdminContext = createContext<AdminContext>({
  isAdmin: false,
  setIsAdmin: (value: boolean) => {}
});

export default AdminContext;