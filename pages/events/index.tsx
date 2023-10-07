import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Button, Typography } from "@mui/material";
import EventList from "../../components/EventList";
import { EventObject } from "../../interfaces/events";
import useAdminContext from "../../hooks/useAdminContext";
import { loadEvents } from "../../lib/loadEvents";
import { useEffect, useState } from "react";

const Events: NextPage<EventObject> = ({ events }) => {
  const { isAdmin } = useAdminContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Typography variant="h2">Events</Typography>
      <EventList
        events={events}
      />
      {mounted && isAdmin && <Link href='/addEvent' passHref>
        <Button>Add Event</Button>
      </Link>}
    </>
  )
}

export default Events;

export const getStaticProps: GetStaticProps = async () => {
  const events = await loadEvents();

  return {
    props: {
      events
    },
    revalidate: 10
  }
}