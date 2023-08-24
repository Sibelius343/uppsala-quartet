import { Box, Typography } from "@mui/material";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import useYoutubeVideoData from "../hooks/useYoutubeVideoData";

interface MediaVideoItemProps {
  embedId: string;
}

const MediaVideoItem = memo(({ embedId }: MediaVideoItemProps) => {
  const { data: video } = useYoutubeVideoData(embedId);
  const formattedDescription = video?.snippet.description
    .replace(/\n{2,}/g, '\n')
    .replace(/(https?:\/\/)?(w{3}\.)?\w+(\.\w{2,3})(\/\w*)*/gi, "");
  
  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "start"}}
      width="90vw"
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
        <Typography variant="h4" fontSize={28} textAlign={{ xs: "center", md: "start"}}>
          {video?.snippet.title}
        </Typography>
        <Typography overflow="hidden" textOverflow="ellipsis" variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'start', alignSelf: { xs: 'center', md: 'start'} }}>
        {formattedDescription}
        </Typography>
      </Box>
    </Box>
  )
})

MediaVideoItem.displayName = 'MediaVideoItem';

export default MediaVideoItem;