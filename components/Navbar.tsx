import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Box, Button, Divider, Drawer, IconButton, Slide, styled, SxProps, Theme, Toolbar, Typography, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import Link from "next/link";
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faInstagram, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Image from "next/image";
import { Alex_Brush } from "next/font/google";

const navLogoFont = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
})

const drawerWidth = 240;

const navStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#000000a3'
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
  pl: 3,
  color: "white"
}

const navBarButtonStyle: SxProps<Theme> = {
  color: "white"
}

const NavButton = ({ navItem, handleClick, isDrawerButton }: DrawerButtonProps) => {
  const path = navItem === 'home' ? '/' : `/${navItem}`;

  return (
    <Link href={path} passHref>
      <Button sx={isDrawerButton ? drawerButtonStyle : navBarButtonStyle} onClick={handleClick}>{navItem}</Button>
    </Link>
  )
}

interface SocialIconProps {
  icon: IconDefinition;
  socialAddress: string;
}

const SocialButton = ({ icon, socialAddress }: SocialIconProps) => {
  return (
    <a href={socialAddress} target="_blank" rel="noreferrer">
      <IconButton sx={{ width: "40px", color: "white" }}>
        <FontAwesomeIcon icon={icon} />
      </IconButton>
    </a>
  )
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: "black"
}));

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavLogo = () => {
  const theme = useTheme();

  return (
    <Link href="/" passHref>
      <Box display="flex" flexDirection="row" alignItems="center" gap={4} sx={{ ":hover": { cursor: 'pointer' } }}>
        <Typography color="white" fontSize="25px" noWrap overflow="visible" className={navLogoFont.className}>
          Catena String Quartet
        </Typography>
      </Box>
    </Link>
  )
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
        <AppBar sx={{ backgroundColor: "#00000000" }}>
          <Toolbar sx={navStyle}>
            {smallScreen ?
            <Box display="flex">
              <IconButton
                sx={{ display: drawerOpen ? 'none' : '', width: '40px', mr: 2 }}
                onClick={handleDrawerOpen}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  color="#cdcdcd"
                />
              </IconButton>
              <NavLogo />
            </Box> :
            <Box display="flex" width="100%" alignItems="center">
              <NavLogo />
              <Box display="flex" flex={1} />
              <Box display="flex" gap={5} alignItems="center">
              {['home', 'about', 'events', 'media', 'contact'].map(e => (
                <NavButton
                  key={e}
                  navItem={e}
                />
              ))}
              <Box>
                <SocialButton icon={faFacebook} socialAddress="https://www.facebook.com/CatenaStringQuartet" />
                <SocialButton icon={faInstagram} socialAddress="https://www.instagram.com/catenastringquartet/"/>
                <SocialButton icon={faYoutube} socialAddress="https://www.youtube.com/@CatenaStringQuartet" />
              </Box>
              </Box>
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
        PaperProps={{
          sx: {
            backgroundColor: '#000000a3'
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ width: "40px" }} >
            <FontAwesomeIcon color="#cdcdcd" icon={faChevronLeft} />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#4b4b4b" }} />
        <Box display='flex' flexDirection="column" gap={1} py={1}>
        {['home', 'about', 'events', 'media', 'contact'].map(e => (
          <NavButton
            key={e}
            navItem={e}
            handleClick={handleDrawerClose}
            isDrawerButton
          />
        ))}
        </Box>
        <Box display="flex" flex={1} />
        <Box display="flex" flexDirection="row" justifyContent="space-evenly" mb={1}>
          <SocialButton icon={faFacebook} socialAddress="https://www.facebook.com/CatenaStringQuartet" />
          <SocialButton icon={faInstagram} socialAddress="https://www.instagram.com/catenastringquartet/"/>
          <SocialButton icon={faYoutube} socialAddress="https://www.youtube.com/@CatenaStringQuartet" />
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar;