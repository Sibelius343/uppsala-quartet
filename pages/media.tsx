import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ImageHeader from "../components/ImageHeader";
import MediaVideoItem from "../components/MediaVideoItem";
import VideoForm from "../components/VideoForm";
import useAdminContext from "../hooks/useAdminContext";
import { MediaObject } from "../interfaces/media";
import { loadMedia } from "../lib/loadMedia";

const Media: NextPage<MediaObject> = ({ videos }) => {
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
      <ImageHeader image="/media-header-image.jpg" text="Media" />
      {videos.map((v, i) => (
        <Box key={v.videoId}>
          <MediaVideoItem video={v} />
          {i < videos.length - 1 && 
          <Divider sx={{ my: 4 }} />
          }
        </Box>
      ))}
      {mounted && isAdmin &&
      <Button
        onClick={() => setIsEditVideosDialogOpen(true)}
      >
        Add Video
      </Button>}
      <Dialog
        open={isEditVideosDialogOpen}
        onClose={() => setIsEditVideosDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4">Add Video</DialogTitle>
        <DialogContent>
          <VideoForm
            handleClose={() => setIsEditVideosDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
};

export default Media;

export const getStaticProps: GetStaticProps = async () => {
  const videos = await loadMedia();

  return {
    props: {
      videos
    },
    revalidate: 10
  }
}