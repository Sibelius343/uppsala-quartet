import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/legacy/image'; // using legacy because of some weird objectFit rendering behavior with the new Image component
import styles from '../styles/Home.module.css';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down('md')) || (mounted && window.innerWidth / window.innerHeight < 1.1227);  

  const logoDimension = smallScreen ? 350 : 250;

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <>
      <Head>
        <title>Catena String Quartet</title>
        <meta name='description' content='The Catena String Quartet formed in 2022 and is based in Minneapolis, Minnesota. All dedicated musicians from an early age, they hold a particular love for chamber music. ' />
        <meta name='keywords' content='string quartet, classical music' />
      </Head>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent={"center"}
        alignItems='center'
        width='100%'
        sx={{ backgroundColor: 'black' }}
      >
        <Box component={"div"} width="100%" className="home-cover-image" top={0}>
          {mounted && <Image src={smallScreen ? "/catena-mobile-background.jpg" : "/home-page-cover-image.jpg"} alt='Catena background' layout='fill' objectFit='cover'/>}
          <Box position="absolute" top={0} width="100%" height="100%" sx={{ background:"linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0, 0,0,0.66), rgba(0,0,0,1))"}} />
        </Box>
        <Box
          component="div"
          position={ "absolute" }
          className={smallScreen ? "home-cover-logo-small-screen" : "home-cover-logo"}
        >
        {mounted && <Image src={'/catena_logo_white.png'} alt='Catena logo' height={logoDimension} width={logoDimension} style={{ zIndex: 2 }} priority />}
        </Box>
      </Box>
    </>
  )
}

export default Home
