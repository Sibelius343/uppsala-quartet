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
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { refetch } = useYoutubeVideoData(videoIdText, true);

  const handleVideoSearch = async () => {
    setError(false);
    setIsLoading(true);
    const { data, isSuccess } = await refetch();
    setIsLoading(false);
    if (isSuccess && data) {
      setVideo(data);
    } else {
      setError(true)
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
        error={error}
        helperText={error && "Video not found"}
        onChange={(e) => {
          setVideoIdText(e.target.value);
        }}
      />
      <Box>
        <IconButton onClick={handleVideoSearch}>
          <FontAwesomeIcon
            icon={loading ? faSpinner : faSearch}
            width="24px"
            spin={loading}
            color={"#1976d2"}
          />
        </IconButton>
      </Box>
    </Box>
  )
}

export default VideoIdSearch;