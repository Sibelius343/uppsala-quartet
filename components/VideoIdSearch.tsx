import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, TextField } from "@mui/material";
import useYoutubeVideoData from "../hooks/useYoutubeVideoData";
import { faSpinner, faCircleXmark, faCircleCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction, useState } from "react";
import { YoutubeVideoItem } from "../interfaces/media";

interface VideoIdSearchProps {
  setVideo: Dispatch<SetStateAction<YoutubeVideoItem | undefined>>
}

const VideoIdSearch = ({ setVideo }: VideoIdSearchProps) => {
  const [videoIdText, setVideoIdText] = useState("");
  const { refetch, isRefetching } = useYoutubeVideoData(videoIdText, true);

  const handleVideoSearch = async () => {
    const { data, isSuccess } = await refetch();
    if (isSuccess && data) {
      setVideo(data);
    }
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="row"
      alignItems="center"
      onSubmit={handleVideoSearch}
    >
      <TextField
        variant="outlined"
        value={videoIdText}
        sx={{
          display: 'flex',
          flex: 1
        }}
        placeholder="Youtube video id (text after youtube.com/watch?v=)"
        fullWidth
        onChange={(e) => {
          setVideoIdText(e.target.value);
        }}
      />
      <Box>
        <IconButton onClick={handleVideoSearch}>
          <FontAwesomeIcon
            icon={isRefetching ? faSpinner : faSearch}
            width="24px"
            spin={isRefetching}
            color={"#1976d2"}
          />
        </IconButton>
      </Box>
    </Box>
  )
}

export default VideoIdSearch;