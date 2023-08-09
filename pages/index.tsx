import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Catena String Quartet</title>
        <meta property='description' content='The Catena String Quartet formed in 2022 and is based in Minneapolis, Minnesota. All dedicated musicians from an early age, they hold a particular love for chamber music. ' />
        <meta name='keywords' content='string quartet, classical music' />
      </Head>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='start'
        alignItems='center'
        width='100vw'
        minHeight='calc(100vh - 94.75px)'
        sx={{ backgroundColor: 'lightgrey', mt: -2 }}
      >
        <Typography
          variant='h2'
          color='#5c5c5c'
          my={4}
          textAlign='center'
        >
          Catena String Quartet
        </Typography>
        <Image src={'/catena-logo.jpg'} alt='Catena logo' height='500px' width='500px' style={{ borderRadius: 10 }} />
      </Box>
    </>
  )
}

export default Home
