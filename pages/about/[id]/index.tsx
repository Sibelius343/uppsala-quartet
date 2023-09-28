import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Typography, Button } from "@mui/material";
import Link from "next/link";
import { Performer } from "../../../interfaces/performer";
import PerformerDetails from "../../../components/PerformerDetails";
import { loadPerformers, loadSinglePerformer } from "../../../lib/loadPerformers";

interface BioProps {
  performer: Performer;
}

const Bio: NextPage<BioProps> = ({ performer }) => {
  return (
    <>
      <Head>
        <title>{`About ${performer.name}`}</title>
      </Head>
      <Typography textAlign="center" variant="h2" mb={2}>{`About ${performer.name}`}</Typography>
      <PerformerDetails
        {...performer}
      />
      <Link href={'/about'} passHref><Button>Go Back</Button></Link>
    </>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  const performerId = context.params?.id;
  const performer = await loadSinglePerformer(performerId);

  if (performer) {
    return {
      props: {
        performer
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
  const performers = await loadPerformers();

  const paths = performers.map((p) => ({ params: {id: p.id }}));
  
  return {
    paths,
    fallback: 'blocking'
  }
}

export default Bio;