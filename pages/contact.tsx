import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import ContactForm from "../components/ContactForm";
import ImageHeader from "../components/ImageHeader";

const Contact: NextPage = () => {
  return (
    <>
    <Head>
      <title>Contact Us</title>
    </Head>
    <ImageHeader image="/contact-header-image.jpg" text="Contact Us" />
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: {xs: '90vw', md: '40vw'} }}>
        <ContactForm />
      </Box>
    </Box>
    </>
  )
};

export default Contact;