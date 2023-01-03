import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Button, Typography } from "@mui/material";
import EventList from "../components/EventList";
import { EventObject } from "../interfaces/events";
import useAdminContext from "../hooks/useAdminContext";
import { BASE_API_URL } from "../config";

const Events: NextPage<EventObject> = ({ events }) => {
  const { isAdmin } = useAdminContext();

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Typography variant="h2">Events</Typography>
      <EventList
        events={events}
      />
      {isAdmin && <Link href='/addEvent' passHref>
        <Button>Add Event</Button>
      </Link>}
    </>
  )
}

export default Events;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${BASE_API_URL}/api/events`);
  console.log(response);
  
  const { events }: EventObject = await response.json();

  return {
    props: {
      events
    }
  }
}