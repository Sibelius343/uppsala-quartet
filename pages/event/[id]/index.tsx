import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Button } from "@mui/material";
import { BASE_API_URL } from "../../../config";
import { EventObject, PerformanceEvent } from "../../../interfaces/events";
import EventDetail from "../../../components/EventDetail";
import Link from "next/link";

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
  const response = await fetch(`${BASE_API_URL}/api/events/${context.params ? context.params.id : ''}`);

  const { id, title, date, location, description, imgUrl }: PerformanceEvent = await response.json();  
  
  return {
    props: {
      id,
      title,
      date: date ? date : null,
      location: location ? location : null,
      description: description ? description : null,
      imgUrl: imgUrl ? imgUrl : null
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${BASE_API_URL}/api/events`);
  const { events }: EventObject = await response.json();

  const paths = events.map((e) => ({ params: {id: e.id.toString() }}));
  
  return {
    paths,
    fallback: false
  }
}

export default Event;