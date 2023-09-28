import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import ContactForm from "../components/ContactForm";

const Contact: NextPage = () => {
  return (
    <>
    <Head>
      <title>Contact Us</title>
    </Head>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2">Contact Us</Typography>
        <Box sx={{ width: {xs: '90vw', md: '40vw'}, padding: 2, mt: 2 }}>
          <ContactForm />
        </Box>
      </Box>
    </>
  )
};

export default Contact;