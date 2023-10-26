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

  const layoutStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    pb: (mounted && window.location.pathname === "/") ? 0 : 5
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Navbar />
      <Box component="div" sx={layoutStyle} className="layout-min-height">
        {children}
      </Box>
      <Footer />
      <NotificationSnackbar />
    </>
  )
};

export default Layout;
