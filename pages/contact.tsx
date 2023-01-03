import { Box, Paper, Typography } from "@mui/material";
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
        <Paper sx={{ width: '40vw', padding: 2 }}>
          <ContactForm />
        </Paper>
      </Box>
    </>
  )
};

export default Contact;