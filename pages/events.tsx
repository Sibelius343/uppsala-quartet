import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@mui/material";
import EventList from "../components/EventList";
import { EventObject } from "../models/events";
import useAdminContext from "../hooks/useAdminContext";
import { BASE_API_URL } from "../config";

const Events: NextPage<EventObject> = ({ events }) => {
  const { isAdmin } = useAdminContext(); 

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
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
  const response = await fetch(`${BASE_API_URL}/api/getEvents`);
  const { events }: EventObject = await response.json();

  return {
    props: {
      events
    }
  }
}