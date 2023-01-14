import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Button } from "@mui/material";
import { PerformanceEvent } from "../../../interfaces/events";
import EventDetail from "../../../components/EventDetail";
import Link from "next/link";
import { loadEvents, loadSingleEvent } from "../../../lib/loadEvents";

const Event: NextPage<PerformanceEvent> = ({ id, title, date, location, description, imgUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Typography variant="h2">Event Details</Typography>
      <EventDetail
        id={id}
        title={title}
        date={date}
        location={location}
        description={description}
        imgUrl={imgUrl}
      />
      <Link href={'/events'} passHref><Button>Go Back</Button></Link>
    </>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.id;
  const event = await loadSingleEvent(eventId);

  if (event) {
    const { id, title, date, location, description, imgUrl }: PerformanceEvent = event;  
  
    return {
      props: {
        id,
        title,
        date: date ? date : null,
        location: location ? location : null,
        description: description ? description : null,
        imgUrl: imgUrl ? imgUrl : null
      },
      revalidate: 10
    }
  } else {
    return {
      props: {},
      revalidate: 10
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await loadEvents();

  const paths = events.map((e) => ({ params: {id: e.id.toString() }}));
  
  return {
    paths,
    fallback: false
  }
}

export default Event;