import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import useNotificationContext from "../hooks/useNotificationContext";
import { Video, YoutubeVideoItem } from "../interfaces/media";
import TextInput from "./FormikTextInput";
import * as Yup from 'yup';
import { useState } from "react";
import VideoIdSearch from "./VideoIdSearch";

const VideoValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  videoTitle: Yup.string()
    .min(1, 'Title required')
    .required('Title required'),
})

interface VideoFormProps {
  handleClose: () => void;
  videoEditId?: string;
  videoEditTitle?: string;
  videoEditDescription?: string;
}

interface VideoFormValues {
  videoTitle: string;
  videoDescription: string;
}

const VideoForm = ({ handleClose, videoEditId, videoEditTitle = '', videoEditDescription = '' }: VideoFormProps) => {
  const [video, setVideo] = useState<YoutubeVideoItem>();
  const { setNotificationMessage } = useNotificationContext();
  const initialValues: VideoFormValues = {
    videoTitle: videoEditId ? videoEditTitle : video?.snippet.title || '',
    videoDescription: videoEditId ? videoEditDescription : video?.snippet.description || '',
  }  

  const handleSubmit = async (values: VideoFormValues) => {
    if (videoEditId) {
      const editedVideo: Video = {
        videoId: videoEditId,
        ...values
      }

      try {
        await fetch('api/media', {
          method: 'put',
          body: JSON.stringify(editedVideo)
        });
        setNotificationMessage('Video updated successfully.')
        handleClose();
      } catch(e) {
        setNotificationMessage('Error updating video.')
        handleClose();
      }
    } else if (video) {
      const newVideo: Video = {
        videoId: video.id,
        ...values
      }
      
      try {
        await fetch('api/media', {
          method: 'post',
          body: JSON.stringify(newVideo)
        });
        setNotificationMessage('Video added successfully.')
        handleClose();
      } catch(e) {
        setNotificationMessage('Error adding video.')
        handleClose();
      }
    }
  }

  return (
    <Stack>
      {!videoEditId && <VideoIdSearch setVideo={setVideo} />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VideoValidationSchema}
        enableReinitialize
      >
        {({ isValid, dirty }) => (
        <Form>
          <TextInput
            label='Video Title'
            name='videoTitle'
            type='text'
          />
          <TextInput
            label='Video Description'
            name='videoDescription'
            type='text'
            rows={10}
          />
          <Stack direction="row" justifyContent="end">
            <Button
              sx={{ mt: 1 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            {!videoEditId ?
            <Button
              variant='contained'
              type='submit'
              sx={{ mt: 1 }}
              disabled={(!isValid || !video)}
            >
              Submit Video
            </Button> :
            <Button
              variant='contained'
              type='submit'
              sx={{ mt: 1 }}
              disabled={(!isValid || !dirty)}
            >
              Edit Video
            </Button>}
          </Stack>
        </Form>
        )}
      </Formik>
    </Stack>
  )
}

export default VideoForm;