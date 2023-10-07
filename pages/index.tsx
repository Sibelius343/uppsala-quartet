import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/legacy/image'; // using legacy because of some weird objectFit rendering behavior with the new Image component
import styles from '../styles/Home.module.css';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mounted, setMounted] = useState(false);

  const logoDimension = 350;

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
        width='100vw'
        minHeight='calc(100vh - 200px)'
        sx={{ backgroundColor: 'lightgrey', mt: -2 }}
      >
        <Box width="100vw" height="calc(100vh - 100px)" top={0}>
          {mounted && <Image src={smallScreen ? "/catena-mobile-background.jpg" : "/quartet-collage.jpg"} alt='Catena background' layout='fill' objectFit='cover'/>}
        </Box>
        <Box
          position={ "absolute" }
          top={smallScreen ? `calc(50vh - ${logoDimension / 2}px)` : "calc(100vh*.54)"}
        >
        {mounted && <Image src={'/catena_logo_white.png'} alt='Catena logo' height={logoDimension} width={logoDimension} style={{ zIndex: 2 }} priority />}
        </Box>
      </Box>
    </>
  )
}

export default Home
