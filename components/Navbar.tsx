import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Box, Button, ButtonProps, Divider, Drawer, IconButton, Slide, styled, SxProps, Theme, Toolbar, Typography, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import Link from "next/link";
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faInstagram, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";

const drawerWidth = 240;

const navStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: "end",
  pb: 2.5,
  backgroundColor: '#000000a3',
  height: "100px"
};

interface HideOnScrollProps {
  children: React.ReactElement;
}

interface DrawerButtonProps {
  navItem: string;
  handleClick?: () => void;
  isDrawerButton?: boolean;
}

interface BorderButtonProps extends ButtonProps {
  isSelected: boolean;
  isDrawerButton: boolean | undefined;
}

const BorderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isDrawerButton" && prop !== "isSelected"
})<BorderButtonProps>(({ isDrawerButton, isSelected }) => ({
    color: "white",
    fontSize: 16,
    justifyContent: isDrawerButton ? "start" : "",
    pl: isDrawerButton ? 3 : 0,
    width: isDrawerButton ? "100%" : "",
    borderRadius: 0,
    borderBottom: isSelected && !isDrawerButton ? "2px solid white" : "",
    borderLeft: isSelected && isDrawerButton ? "2px solid white" : ""
  }));

const NavButton = ({ navItem, handleClick, isDrawerButton }: DrawerButtonProps) => {  
  const router = useRouter();
  const truncatedPath = router.pathname.slice(0, router.pathname.lastIndexOf("/") || router.pathname.length);
  const path = `/${navItem}`;
  const isSelected = path === truncatedPath;

  return (
    <Link href={path} passHref>
      <BorderButton isDrawerButton={isDrawerButton} isSelected={isSelected} onClick={handleClick}>{navItem}</BorderButton>
    </Link>
  )
}

interface SocialIconProps {
  icon: IconDefinition;
  socialAddress: string;
  small?: boolean;
}

export const SocialButton = ({ icon, socialAddress, small = false }: SocialIconProps) => {
  return (
    <a href={socialAddress} target="_blank" rel="noreferrer">
      <IconButton sx={{ width: small ? "25px" : "40px", height: small ? "25px" : "40px", color: "white" }}>
        <FontAwesomeIcon icon={icon} size={small ? "xs" : undefined} />
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
  backgroundColor: "black",
  height: "100px"
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
  return (
    <Link href="/" passHref>
      <Box display="flex" flexDirection="row" alignItems="center" gap={4} sx={{ ":hover": { cursor: 'pointer' } }}>
        <Typography color="white" fontSize={{ xs: "1.5rem", sm: "2rem" }} fontWeight={100} noWrap overflow="visible">
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
                sx={{ width: '40px', mr: 2 }}
                onClick={handleDrawerOpen}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  color="#cdcdcd"
                />
              </IconButton>
              <NavLogo />
            </Box> :
            <Box display="flex" width="100%" alignItems="end">
              <NavLogo />
              <Box display="flex" flex={1} />
              <Box display="flex" gap={4} alignItems="end">
              {['about', 'events', 'media', 'contact'].map(e => (
                <NavButton
                  key={e}
                  navItem={e}
                />
              ))}
              <Box display={{ xs: "none", lg: "block" }}>
                <SocialButton icon={faFacebook} socialAddress="https://www.facebook.com/CatenaStringQuartet" />
                <SocialButton icon={faInstagram} socialAddress="https://www.instagram.com/catenastringquartet/"/>
                <SocialButton icon={faYoutube} socialAddress="https://www.youtube.com/@CatenaStringQuartet" />
              </Box>
              </Box>
            </Box>}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
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
        <Box display="flex" flexDirection="row" justifyContent="start" gap={2} mb={1}>
          <SocialButton icon={faFacebook} socialAddress="https://www.facebook.com/CatenaStringQuartet" />
          <SocialButton icon={faInstagram} socialAddress="https://www.instagram.com/catenastringquartet/"/>
          <SocialButton icon={faYoutube} socialAddress="https://www.youtube.com/@CatenaStringQuartet" />
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar;