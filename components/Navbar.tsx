import { Box, Button, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import useAdminContext from "../hooks/useAdminContext";

const navStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center'
};

const AdminButton = () => {
  const { isAdmin, setIsAdmin } = useAdminContext();

  const adminButtonStyle: SxProps<Theme> = {
    cursor: isAdmin ? 'pointer' : 'default', 
    ":hover": { backgroundColor: 'white' } ,
    alignSelf: 'stretch'
  }

  const adminClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ( isAdmin ) { 
      setIsAdmin(false);
      return;
    }
    if (e.detail === 3) setIsAdmin(true);
  }

  return (
    <Button
      color={isAdmin ? 'error': 'primary'}
      onClick={adminClick}
      disableRipple
      sx={adminButtonStyle}
    >
      {isAdmin ? 'Admin' : ''}
    </Button>
  )
}

const Navbar = () => {
  return (
    <Box sx={navStyle}>
      <AdminButton />
      <div style={{ display: 'flex', flex: 1 }}></div>
      <Link href='/' passHref>
        <Button>Home</Button>
      </Link>
      <Link href='/about' passHref>
        <Button>About</Button>
      </Link>
      <Link href='/events' passHref>
        <Button>Events</Button>
      </Link>
      <Link href='/contact' passHref>
        <Button>Contact Us</Button>
      </Link>
    </Box>
  )
}

export default Navbar;