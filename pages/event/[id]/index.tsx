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
      <Typography variant="h2" mb={2}>Event Details</Typography>
      <Box width="90%">
        <Link href={'/events'} passHref>
          <Button
            color="secondary"
            sx={{ alignSelf: "start"}}
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
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
      <Box width="90%" display="flex" mt={2}>
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