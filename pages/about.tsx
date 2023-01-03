import type { NextPage } from "next";
import Head from "next/head";
import { Typography, Grid } from '@mui/material';
import BioCard from "../components/BioCard";
import AboutQuartetCard from "../components/AboutQuartetCard";
import { performerData } from "../data/performerData";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <Typography variant="h2">About Us</Typography>
      <Typography variant="h4" my={4}>The Quartet</Typography>
      <AboutQuartetCard picUri="/Uppsala.png" text={performerData[2].bio} />
      <Typography variant="h4" mt={4} mb={2}>The Performers</Typography>
      <Grid container columnSpacing={4} rowSpacing={2} padding={2}>
        {performerData.map(({ id, name, instrument, bio, picUri }) => (
          <Grid item key={id} md={6} display='flex'>
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
    </>
  )
}

export default About;