import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Grid } from '@mui/material';
import BioCard from "../components/BioCard";
import AboutQuartetCard from "../components/AboutQuartetCard";
import { loadPerformers } from "../lib/loadPerformers";
import { Performer } from "../interfaces/performer";
import { loadAboutQuartet } from "../lib/loadAboutQuartet";
import { Detail } from "../interfaces/detail";

interface AboutProps {
  aboutQuartet: Detail,
  performers: Performer[]
}

const About: NextPage<AboutProps> = ({ aboutQuartet, performers }) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <Typography variant="h2">About Us</Typography>
      <Typography variant="h4" my={4}>The Quartet</Typography>
      <AboutQuartetCard id={aboutQuartet.id} picUri="/about-quartet-pic.jpg" text={aboutQuartet?.value || ""} />
      <Typography variant="h4" mt={4} mb={2}>The Performers</Typography>
      <Grid container columnSpacing={4} rowSpacing={2} padding={2}>
        {performers.map(({ id, name, instrument, bio, picUri }) => (
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