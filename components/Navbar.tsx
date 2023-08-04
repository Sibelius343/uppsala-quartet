import { Box, Button, SxProps, Theme } from "@mui/material";
import Link from "next/link";

const navStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,
  backgroundColor: '#f0f0f0'
};



const Navbar = () => {
  return (
    <Box sx={navStyle}>
      <Link href='/' passHref>
        <Button>Home</Button>
      </Link>
      <Link href='/about' passHref>
        <Button>About</Button>
      </Link>
      <Link href='/events' passHref>
        <Button>Events</Button>
      </Link>
      <Link href='/media' passHref>
        <Button>Media</Button>
      </Link>
      <Link href='/contact' passHref>
        <Button>Contact</Button>
      </Link>
    </Box>
  )
}

export default Navbar;