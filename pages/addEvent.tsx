import { Box } from "@mui/material";
import {  NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import useAdminContext from "../hooks/useAdminContext";

const AddEvent: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isAdmin } = useAdminContext();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  },[]);

  const handleNavigate = () => {
    router.push('/events');
  }

  return (
    <>
      <Head>
        <title>Add Event</title>
      </Head>
      {(isMounted && isAdmin) && 
      <Box width="85%">
        <Box height="100px" width="100%" />
        <EventForm handleNavigate={handleNavigate} />
      </Box>
      }
    </>
  )
}

export default AddEvent;