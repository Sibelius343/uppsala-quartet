import { Box, Typography } from "@mui/material";
import { Video } from "../interfaces/media";

interface MediaVideoItemProps {
  video: Video
}

const MediaVideoItem = ({ video: { videoId, videoTitle, videoDescription } }: MediaVideoItemProps) => {
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
        src={`https://www.youtube.com/embed/${videoId}`}
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
          {videoTitle}
        </Typography>
        <Typography overflow="hidden" textOverflow="ellipsis" variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'start', alignSelf: { xs: 'center', md: 'start'} }}>
        {videoDescription}
        </Typography>
      </Box>
    </Box>
  )
}

MediaVideoItem.displayName = 'MediaVideoItem';

export default MediaVideoItem;