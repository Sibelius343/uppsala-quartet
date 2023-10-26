import { Box, Button, Dialog, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import useAdminContext from "../hooks/useAdminContext";
import useLocalStorage from "../hooks/useLocalStorage";
import AdminLoginForm from "./AdminLoginForm";
import { SocialButton } from "./Navbar";
import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const theme = useTheme()
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useAdminContext();
  const [, setLocalValue] = useLocalStorage('catena_admin', false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    setLocalValue(false);
    setIsAdmin(false);
    router.push('/');
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <Box sx={{ display: 'flex', alignItems: "center", height: "100px", width: "100%", px: 2, backgroundColor: '#212121' }}>
      <Box>
        <SocialButton icon={faFacebook} socialAddress="https://www.facebook.com/CatenaStringQuartet" />
        <SocialButton icon={faInstagram} socialAddress="https://www.instagram.com/catenastringquartet/"/>
        <SocialButton icon={faYoutube} socialAddress="https://www.youtube.com/@CatenaStringQuartet" />
      </Box>
      <Box display="flex" flex={1} justifyContent="center" textAlign="start">
        <Box>
          <Box display="flex" alignItems="center" mb={0.5}>
            <Typography fontStyle="italic" color="grey.500" fontSize={{xs: 12, sm: 14 }} mr={0.5}>
              Photos by Caroline Ellingboe
            </Typography>
            <Box display="flex" sx={{ flexWrap: "wrap" }}>
              <SocialButton icon={faFacebook} socialAddress="https://www.facebook.com/ellingboephoto/" small />
              <SocialButton icon={faInstagram} socialAddress="https://www.instagram.com/ellingboephoto/" small />
            </Box>
          </Box>
          <Typography fontStyle="italic" color="grey.500" fontSize={{xs: 12, sm: 14 }}>Website by Sam Schoenwald</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: "end" }}>
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
          sx={{ color: theme.palette.grey[100] }}
        >
          Login
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
    </Box>
  )
}

export default Footer;