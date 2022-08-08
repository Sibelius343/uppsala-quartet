import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Uppsala String Quartet</title>
        <meta name='keywords' content='string quartet, classical music' />
      </Head>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='start'
        alignItems='center'
        width='100vw'
        height='calc(100vh - 36.5px)'
        sx={{ backgroundColor: 'lightgrey'}}
      >
        <Typography
          variant='h2'
          color='#5c5c5c'
          my={4}
        >
          Uppsala String Quartet
        </Typography>
        <Image src={'/Uppsala.png'} alt='Uppsala logo' height='500px' width='500px' />
      </Box>
    </>
  )
}

export default Home
