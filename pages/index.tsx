import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const Home: NextPage = () => {
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const logoDimension = "200px";

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
        <Box position="fixed" width="100vw" height="100vh">
          <Image src={smallScreen ? "/catena-mobile-background.jpg" : "/quartet-collage.jpg"} alt='Catena background' layout='fill' objectFit='cover' />
        </Box>
        <Image src={'/catena-logo.png'} alt='Catena logo' height={logoDimension} width={logoDimension} style={{ borderRadius: 1000 }} />
      </Box>
    </>
  )
}

export default Home
