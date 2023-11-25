import { Box, Button } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ImageHeader from "../components/ImageHeader";
import useAdminContext from "../hooks/useAdminContext";
import useNotificationContext from "../hooks/useNotificationContext";
import { LayoutItem, MediaObject, NewLayoutItem, Video } from "../interfaces/media";
import { loadMedia, loadMediaLayout } from "../lib/loadMedia";
import MediaList from "../components/MediaList";

const Media: NextPage<MediaObject> = ({ videos, layout }) => {
  const { isAdmin } = useAdminContext();
  const [mounted, setMounted] = useState(false);
  const [isEditingMedia, setIsEditingMedia] = useState(false);
  const [mediaLayout, setMediaLayout] = useState<LayoutItem[]>([]);
  const [newVideos, setNewVideos] = useState<Video[]>([]);
  const [deletedVideoIds, setDeletedVideoIds] = useState<string[]>([]);

  const { setNotificationMessage } = useNotificationContext();

  useEffect(() => {
    setMounted(true)
  }, []);

  const uploadVideoData = async (): Promise<[Video[], Video[]]> => {
    if (newVideos.length === 0 && deletedVideoIds.length === 0) return [[], []];

    const editedVideos = newVideos.filter(n => videos.some(v => v.videoId === n.videoId));

    const editedVideoResponses = await Promise.all(editedVideos.map(v => fetch('api/media', {
      method: 'put',
      body: JSON.stringify(v)
    })));

    const uploadedEditedVideos = await Promise.all(editedVideoResponses.map(v => v.json()));

    const videoResponses = await Promise.all(newVideos.map(v => fetch('api/media', {
      method: 'post',
      body: JSON.stringify(v)
    })));
    
    const uploadedVideos: Video[] = await Promise.all(videoResponses.map(v => v.json()));
    
    await Promise.all(deletedVideoIds.map((videoId) => fetch('api/media', {
      method: 'delete',
      body: JSON.stringify({ videoId })
    })));

    return [uploadedEditedVideos, uploadedVideos];
  }

  const handleSaveChanges = async () => {
    setIsEditingMedia(false);

    try {
      await uploadVideoData();

      const mediaLayoutClone: NewLayoutItem[] = mediaLayout.map(item => {
        const { id, ...layoutItem } = item;
        return layoutItem;
      });
      await fetch('api/mediaLayout', {
        method: 'put',
        body: JSON.stringify(mediaLayoutClone)
      });
      setNewVideos([]);
      setDeletedVideoIds([]);
      setNotificationMessage('Media changes saved.');
    } catch (e) {
      setNotificationMessage('Error saving changes');
      console.error(e);
    }
  }

  const handleCancelChanges = () => {
    setIsEditingMedia(false);
    setNewVideos([]);
    setDeletedVideoIds([]);
    setMediaLayout(layout);
  }

  useEffect(() => {
    if (mounted && layout.length > 0) {
      setMediaLayout(layout);
    }
  }, [layout, mounted]);

  // Filtering deletedVideos and newVideos that contain existing videos that have edited details
  const allVideos = [
    ...videos
      .filter(v => !newVideos.some(n => n.videoId === v.videoId))
      .filter(v => !deletedVideoIds.some(id => id=== v.videoId)),
    ...newVideos
  ]

  return (
    <>
      <Head>
        <title>Media</title>
      </Head>
      <ImageHeader image="/media-header-image.jpg" text="Media" />
      <MediaList
        isEditingMedia={isEditingMedia}
        layout={mediaLayout}
        setLayout={setMediaLayout}
        videos={allVideos}
        setNewVideos={setNewVideos}
        setDeletedVideoIds={setDeletedVideoIds}
      />
      {mounted && isAdmin && !isEditingMedia &&
      <Button
        onClick={() => setIsEditingMedia(true)}
      >
        Edit Media
      </Button>}
      {mounted && isAdmin && isEditingMedia &&
      <Box display="flex" flexDirection="row" gap={1}>
        <Button
          onClick={handleCancelChanges}
          variant="contained"
          color="error"
        >
          Cancel Changes
        </Button>
        <Button
          onClick={handleSaveChanges}
          variant="contained"
          color="primary"
        >
          Save Changes
        </Button>
      </Box>}
      
    </>
  )
};

export default Media;

export const getStaticProps: GetStaticProps = async () => {
  const videos = await loadMedia();
  const { layout } = await loadMediaLayout();

  return {
    props: {
      videos,
      layout
    },
    revalidate: 10
  }
}