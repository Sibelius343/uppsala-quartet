import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Grid, useTheme, Box } from '@mui/material';
import BioCard from "../../components/PerformerPreview";
import AboutQuartetCard from "../../components/AboutQuartetCard";
import { loadPerformers } from "../../lib/loadPerformers";
import { Performer } from "../../interfaces/performer";
import { loadAboutQuartet } from "../../lib/loadAboutQuartet";
import { Detail } from "../../interfaces/detail";
import ImageHeader from "../../components/ImageHeader";

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
      <ImageHeader image="/about-quartet-header-image.jpg" text="About Us" />
      <Box width="90vw" display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" mb={4}>The Quartet</Typography>
        <AboutQuartetCard id={aboutQuartet.id} picUri="/about-quartet-pic.jpg" text={aboutQuartet?.value || ""} />
        <Typography variant="h4" mt={4} mb={2}>The Performers</Typography>
        <Typography fontSize={20} color={theme.palette.secondary.main} >Click to find out more:</Typography>
        <Grid container columnSpacing={2} rowSpacing={4} justifyContent='center' pt={3}>
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
      </Box>
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