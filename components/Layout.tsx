import { Box, SxProps, Theme } from '@mui/material';
import AdminButton from './AdminButton';
import Navbar from './Navbar';
import NotificationSnackbar from './NotificationSnackbar';

interface LayoutProps {
  children: React.ReactNode;
}

const layoutStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Box sx={layoutStyle}>
        {children}
      </Box>
      <AdminButton />
      <NotificationSnackbar />
    </>
  )
};

export default Layout;