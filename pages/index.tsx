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
        <meta name='keywords' content='string quartet, classical music' />
      </Head>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='start'
        alignItems='center'
        width='100vw'
        minHeight='calc(100vh - 36.5px)'
        sx={{ backgroundColor: 'lightgrey'}}
      >
        <Typography
          variant='h2'
          color='#5c5c5c'
          my={4}
        >
          Catena String Quartet
        </Typography>
        <Image src={'/Uppsala.png'} alt='Uppsala logo' height='500px' width='500px' />
      </Box>
    </>
  )
}

export default Home
