import { Box, Button, Dialog, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import useAdminContext from "../hooks/useAdminContext";
import useLocalStorage from "../hooks/useLocalStorage";
import AdminLoginForm from "./AdminLoginForm";

const Footer = () => {
  const theme = useTheme()
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useAdminContext();
  const [, setLocalValue] = useLocalStorage('catena_admin', false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isHomePage = router.pathname === '/';

  const handleLogout = () => {
    setLocalValue(false);
    setIsAdmin(false);
    router.push('/');
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'end', backgroundColor: '#f0f0f0' }}>
      {mounted && (isAdmin ?
      <Button
        onClick={handleLogout}
        color='error'
        size="small"
      >
        Logout
      </Button> :
      <Button
        onClick={() => setLoginDialogOpen(true)}
        size="small"
        sx={{ color: isHomePage ? theme.palette.grey[100] : theme.palette.grey[700] }}
      >
        Quartet Login
      </Button>)}
      <Dialog
      open={isLoginDialogOpen}
      onClose={() => setLoginDialogOpen(false)}
    >
      <AdminLoginForm
        handleClose={() => setLoginDialogOpen(false)}
      />
      </Dialog>
    </Box>
  )
}

export default Footer;