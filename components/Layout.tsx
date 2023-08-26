import { Box, SxProps, Theme } from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';
import NotificationSnackbar from './NotificationSnackbar';

interface LayoutProps {
  children: React.ReactNode;
}

const layoutStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 94.75px)',
  pt: 2,
  backgroundColor: '#e5e5e5'
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Box position='absolute' top={0} left={0} height={64} width="100%" sx={{ backgroundColor: '#e5e5e5' }} />
      <Box sx={layoutStyle}>
        {children}
      </Box>
      <Footer />
      <NotificationSnackbar />
    </>
  )
};

export default Layout;