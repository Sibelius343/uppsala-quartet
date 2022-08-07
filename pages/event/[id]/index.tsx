import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { BASE_API_URL } from "../../../config";
import { EventObject, PerformanceEvent } from "../../../models/events";
import EventDetail from "../../../components/EventDetail";

const Event: NextPage<PerformanceEvent> = ({ id, title, date, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <EventDetail
        id={id}
        title={title}
        date={date}
        description={description}
      />
    </>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(`${BASE_API_URL}/api/events/${context.params ? context.params.id : ''}`);

  const { id, title, date, description }: PerformanceEvent = await response.json();  
  
  return {
    props: {
      id,
      title,
      date,
      description
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