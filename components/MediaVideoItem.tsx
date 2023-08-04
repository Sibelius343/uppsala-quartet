import { Box, Typography } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import useYoutubeVideoData from "../hooks/useYoutubeVideoData";

interface MediaVideoItemProps {
  embedId: string;
}

const MediaVideoItem = memo(({ embedId }: MediaVideoItemProps) => {
  const { data: video } = useYoutubeVideoData(embedId);

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "start"}}
      textAlign={{ xs: "center", md: "start"}}
      width="80vw"
      overflow="hidden"
    >
      <Box
        component={"iframe"}
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{ border: 0, borderRadius: 2, aspectRatio: "16/9" }}
        flex={2}
       
      />
      <Box
        display="flex"
        flexDirection="column"
        flex={3}
        overflow="hidden"
      >
        <Typography variant="h4">
          {video?.snippet.title}
        </Typography>
        <Typography overflow="hidden" sx={{ display: "-webkit-box", WebkitBoxOrient: 'vertical', WebkitLineClamp: 4 }}>
        {video?.snippet.description}
        </Typography>
      </Box>
    </Box>
  )
})

MediaVideoItem.displayName = 'MediaVideoItem';

export default MediaVideoItem;