import type { NextPage } from "next";
import Head from "next/head";
import { Box, Typography, Grid } from '@mui/material';
import BioCard from "../components/BioCard";
import { performerData } from "../data/performerData";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Box padding={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2">About us</Typography>
        <Grid container columnSpacing={4} rowSpacing={2}>
          {performerData.map(({ id, name, instrument, bio, picUri }) => (
            <Grid item key={id} md={6}>
              <BioCard
                id={id}
                name={name}
                instrument={instrument}
                bio={bio}
                picUri={picUri}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default About;