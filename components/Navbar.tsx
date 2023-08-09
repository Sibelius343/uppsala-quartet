import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Box, Button, Divider, Drawer, IconButton, Slide, styled, SxProps, Theme, Toolbar, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import Link from "next/link";
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const drawerWidth = 240;

const navStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: { md: 'center' },
  backgroundColor: '#f0f0f0'
};

interface HideOnScrollProps {
  children: React.ReactElement;
}

interface DrawerButtonProps {
  navItem: string;
  handleClick?: () => void;
  isDrawerButton?: boolean;
}

const drawerButtonStyle: SxProps<Theme> = {
  justifyContent: 'start',
  pl: 3
}

const NavButton = ({ navItem, handleClick, isDrawerButton }: DrawerButtonProps) => {
  const path = navItem === 'home' ? '/' : `/${navItem}`;

  return (
    <Link href={path} passHref>
      <Button sx={isDrawerButton ? drawerButtonStyle : undefined} onClick={handleClick}>{navItem}</Button>
    </Link>
  )
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar sx={navStyle}>
            {smallScreen ?
            <IconButton
              sx={{ display: drawerOpen ? 'none' : '', width: '40px' }}
              onClick={handleDrawerOpen}
            >
              <FontAwesomeIcon
                icon={faBars}
              />
            </IconButton> :
            <Box display="flex" gap={6}>
              {['home', 'about', 'events', 'media', 'contact'].map(e => (
                <NavButton
                  key={e}
                  navItem={e}
                />
              ))}
            </Box>}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Drawer
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
        PaperProps={{
          sx: {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ width: "40px" }} >
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box display='flex' flexDirection="column" gap={1} pt={1}>
        {['home', 'about', 'events', 'media', 'contact'].map(e => (
          <NavButton
            key={e}
            navItem={e}
            handleClick={handleDrawerClose}
            isDrawerButton
          />
        ))}
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar;