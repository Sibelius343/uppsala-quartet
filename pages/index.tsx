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
      <Box>
        <Typography>Uppsala String Quartet</Typography>
      </Box>
    </>
  )
}

export default Home
