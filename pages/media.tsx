import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import EditVideosForm from "../components/EditVideosForm";
import MediaVideoItem from "../components/MediaVideoItem";
import useAdminContext from "../hooks/useAdminContext";
import { Media } from "../interfaces/media";
import { loadMedia } from "../lib/loadMedia";

const Media: NextPage<Media> = ({ videoIds }) => {
  const { isAdmin } = useAdminContext();
  const [mounted, setMounted] = useState(false);
  const [isEditVideosDialogOpen, setIsEditVideosDialogOpen] = useState(false);  

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title>Media</title>
      </Head>
      <Typography mb={4} variant="h2">Media</Typography>
      {videoIds.map((v, i) => (
        <Box key={v}>
          <MediaVideoItem embedId={v} />
          {i < videoIds.length - 1 && 
          <Divider sx={{ my: 4 }} />
          }
        </Box>
      ))}
      {mounted && isAdmin &&
      <Button
        onClick={() => setIsEditVideosDialogOpen(true)}
      >
        Edit Videos
      </Button>}
      <Dialog
        open={isEditVideosDialogOpen}
        onClose={() => setIsEditVideosDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <EditVideosForm
          videoIds={videoIds}
          handleClose={() => setIsEditVideosDialogOpen(false)}
        />
      </Dialog>
    </>
  )
};

export default Media;

export const getStaticProps: GetStaticProps = async () => {
  const media = await loadMedia();

  return {
    props: {
      videoIds: media ? media.videoIds : []
    },
    revalidate: 10
  }
}