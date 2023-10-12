import { Box, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import NotificationSnackbar from './NotificationSnackbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  // Using this method for determining height because vh is busted on mobile devices
  const height = mounted ? `${window.innerHeight}px` : "100vh";
  const layoutStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    minHeight: `calc(${height} - 200px)`,
    pt: window.location.pathname === "/" ? 0 : 2,
    backgroundColor: '#e5e5e5'
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Navbar />
      <Box position='absolute' top={0} left={0} height={100} width="100%" sx={{ backgroundColor: '#e5e5e5' }} />
      <Box sx={layoutStyle}>
        {children}
      </Box>
      <Footer />
      <NotificationSnackbar />
    </>
  )
};

export default Layout;
