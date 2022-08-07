import { Box, SxProps, Theme } from '@mui/material';
import Navbar from './Navbar';

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
    </>
  )
};

export default Layout;