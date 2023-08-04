import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import useYoutubeVideoData from "../hooks/useYoutubeVideoData";
import { faTrash, faSpinner, faCircleXmark, faCircleCheck, faSearch, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import useNotificationContext from "../hooks/useNotificationContext";
import { YoutubeVideoItem } from "../interfaces/media";

interface EditVideoFormProps {
  videoIds: string[];
  handleClose: () => void;
}

interface NewVideoFieldProps {
  handleAddVideo: (video: YoutubeVideoItem) => void;
}

interface ExistingVideoFieldProps {
  videoId: string;
  handleRemoveVideo: (videoId: string) => void;
}

const checkArrayEquality = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1.sort();
  arr2.sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

const ExistingVideoField = ({ videoId, handleRemoveVideo }: ExistingVideoFieldProps) => {
  const { data: video } = useYoutubeVideoData(videoId);

  return (
    <Box display="flex" flexDirection="row" gap={2} alignItems="center">
      <Typography>
        {video?.snippet.title}
      </Typography>
      <Box flexGrow={2}></Box>
      <Typography fontWeight="bold">
        {video?.id}
      </Typography>
      <IconButton onClick={() => handleRemoveVideo(videoId)}>
        <FontAwesomeIcon
          icon={faTrash}
          width="24px"
        />
      </IconButton>
    </Box>
  )
}

const NewVideoField = ({ handleAddVideo }: NewVideoFieldProps) => {
  const [video, setVideo] = useState<YoutubeVideoItem>();
  const [videoIdText, setVideoIdText] = useState("");
  const { data, refetch, isSuccess, isError, isRefetching } = useYoutubeVideoData(videoIdText, true);

  const handleVideoSearch = async () => {
    const { data, isSuccess } = await refetch();
    if (isSuccess && data) {
      setVideo(data);
    }
  }

  const error = isError || (isSuccess && !data)

  const getButtonIcon = () => {
    if (error) {
      return faCircleXmark;
    } else if (isSuccess) {
      return faCircleCheck;
    } else if (isRefetching) {
      return faSpinner;
    } else {
      return faSearch;
    }
  }

  const getButtonColor = () => {
    if (error) {
      return "red";
    } else if (isSuccess) {
      return "green";
    } else {
      return "#1976d2";
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
          if (video) {
            setVideo(undefined);
          }
        }}
      />
      {video && <Typography display="flex" flex={2} justifyContent="center">
        {video.snippet.title || ""}
      </Typography>}
      <Box>
        <IconButton onClick={handleVideoSearch}>
          <FontAwesomeIcon
            icon={getButtonIcon()}
            width="24px"
            spin={isRefetching}
            color={getButtonColor()}
          />
        </IconButton>
        {video &&
        <IconButton onClick={() => {
          setVideoIdText("")
          setVideo(undefined);
          handleAddVideo(video);
        }}>
          <FontAwesomeIcon
            icon={faCirclePlus}
            width="24px"
          />
        </IconButton>
        }
      </Box>
    </Box>
  )
}

const EditVideosForm = ({ videoIds, handleClose }: EditVideoFormProps) => {
  const [newVideoIds, setNewVideoIds] = useState([...videoIds]);
  const { setNotificationMessage } = useNotificationContext();

  const handleAddVideo = (video: YoutubeVideoItem) => {
    setNewVideoIds([video.id, ...newVideoIds]);
  }

  const handleRemoveVideo = (videoId: string) => [
    setNewVideoIds([...newVideoIds.filter(v => v !== videoId)])
  ]

  const handleSubmit = async () => {
    try {
      await fetch('api/media', {
        method: 'put',
        body: JSON.stringify({
          videoIds: newVideoIds
        })
      });
      setNotificationMessage('Videos updated successfully.')
      handleClose();
    } catch(e) {
      setNotificationMessage('Error updating videos.')
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        gap: 2
      }}
    >
      <Typography variant="h4" display="flex" alignSelf="center">Edit Videos</Typography>
      <NewVideoField handleAddVideo={handleAddVideo}/>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ mt: 2 }}
      >
      {newVideoIds.map((v, i) => (
        <Box key={v}>
          <ExistingVideoField videoId={v} handleRemoveVideo={handleRemoveVideo} />
          {i < newVideoIds.length - 1 && <Divider sx={{ my: 2 }}/>}
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 2 }}>
        <Button variant="text" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={checkArrayEquality(videoIds, newVideoIds)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Box>
  )
}

export default EditVideosForm;