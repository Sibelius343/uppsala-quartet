import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Button, Box } from "@mui/material";
import { PerformanceEvent } from "../../../interfaces/events";
import EventDetail from "../../../components/EventDetail";
import Link from "next/link";
import { loadEvents, loadSingleEvent } from "../../../lib/loadEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EventNavLink from "../../../components/EventNavLink";
import ImageHeader from "../../../components/ImageHeader";

interface EventPageProps {
  events: (PerformanceEvent | null)[];
}

const Event: NextPage<EventPageProps> = ({ events }) => {
  const [previousEvent, event, nextEvent] = events;
  
  return (
    <>
      <Head>
        <title>{event?.title}</title>
      </Head>
      <ImageHeader image="/events-header-image.jpg" text="Event Details" />
      <Box width="90%">
        <Link href={'/events'} passHref>
          <Button
            color="secondary"
            sx={{ alignSelf: "start"}}
            startIcon={<FontAwesomeIcon icon={faArrowLeft} width={17.5} />}
          >
            Back to all events
          </Button>
        </Link>
      </Box>
      {event && <EventDetail
        id={event.id}
        title={event.title}
        date={event.date}
        location={event.location}
        description={event.description}
        imgUrl={event.imgUrl}
      />}
      <Box width="90%" display="flex" mt={6}>
        {previousEvent && <EventNavLink
          event={previousEvent}
          previous
        />}
        <Box display="flex" flex={1} />
        {nextEvent && <EventNavLink
          event={nextEvent}
        />}
      </Box>
    </>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.id;
  const events = await loadSingleEvent(eventId);

  if (events) {
  
    return {
      props: {
        events
      },
      revalidate: 10
    }
  } else {
    return {
      notFound: true
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await loadEvents();

  const paths = events.map((e) => ({ params: {id: e.id }}));
  
  return {
    paths,
    fallback: 'blocking'
  }
}

export default Event;