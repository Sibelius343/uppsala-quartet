import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Grid, Box, useTheme } from '@mui/material';
import BioCard from "../../components/PerformerPreview";
import AboutQuartetCard from "../../components/AboutQuartetCard";
import { loadPerformers } from "../../lib/loadPerformers";
import { Performer } from "../../interfaces/performer";
import { loadAboutQuartet } from "../../lib/loadAboutQuartet";
import { Detail } from "../../interfaces/detail";

interface AboutProps {
  aboutQuartet: Detail,
  performers: Performer[]
}

const About: NextPage<AboutProps> = ({ aboutQuartet, performers }) => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <Typography variant="h2">About Us</Typography>
      <Typography variant="h4" my={4}>The Quartet</Typography>
      <AboutQuartetCard id={aboutQuartet.id} picUri="/about-quartet-pic.jpg" text={aboutQuartet?.value || ""} />
      <Typography variant="h4" mt={4} mb={2}>The Performers</Typography>
      <Typography fontSize={20} color={theme.palette.grey[600]} >Click to find out more:</Typography>
      <Grid container columnSpacing={2} rowSpacing={4} justifyContent='center' px={6} py={3}>
        {performers.map(({ id, name, instrument, bio, picUri }) => (
          <Grid item key={id} xs={12} sm={6} md={3} display="flex">
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

export const getStaticProps: GetStaticProps = async () => {
  const aboutQuartet = await loadAboutQuartet();
  const performers = await loadPerformers();

  return {
    props: {
      aboutQuartet,
      performers
    },
    revalidate: 10
  }
}