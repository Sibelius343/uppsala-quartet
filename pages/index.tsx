import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mounted, setMounted] = useState(false);

  const logoDimension = 200;

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
        minHeight='calc(100vh - 94.75px)'
        sx={{ backgroundColor: 'lightgrey', mt: -2 }}
      >
        <Box position="fixed" width="100vw" height="100vh" top={0}>
          {mounted && <Image src={smallScreen ? "/catena-mobile-background.jpg" : "/quartet-collage.jpg"} alt='Catena background' fill style={{ objectFit: "cover" }} />}
        </Box>
        <Box
          display="flex"
          position={smallScreen ? "static" : "absolute"}
          top="calc(100vh - 200px)"
          left={0}>
        {mounted && <Image src={'/catena-logo.png'} alt='Catena logo' height={logoDimension} width={logoDimension} style={{ borderRadius: smallScreen ? "1000px" : "0px 4px 0px 0px", zIndex: 2 }} priority />}
        </Box>
      </Box>
    </>
  )
}

export default Home
