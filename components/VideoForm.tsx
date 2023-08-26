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
}

interface VideoFormValues {
  videoTitle: string;
  videoDescription: string;
}

const VideoForm = ({ handleClose }: VideoFormProps) => {
  const [video, setVideo] = useState<YoutubeVideoItem>();
  const { setNotificationMessage } = useNotificationContext();
  const initialValues: VideoFormValues = {
    videoTitle: video?.snippet.title || '',
    videoDescription: video?.snippet.description || '',
  }  

  const handleSubmit = async (values: VideoFormValues) => {
    if (video) {
      const newVideo: Video = {
        videoId: video.id,
        ...values
      }
      
      try {
        await fetch('api/media', {
          method: 'post',
          body: JSON.stringify(newVideo)
        });
        setNotificationMessage('Videos updated successfully.')
        handleClose();
      } catch(e) {
        setNotificationMessage('Error updating videos.')
      }
    }
  }

  return (
    <Stack>
      <VideoIdSearch setVideo={setVideo} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VideoValidationSchema}
        enableReinitialize
      >
        {({ isValid }) => (
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
            <Button
              variant='contained'
              type='submit'
              sx={{ mt: 1 }}
              disabled={(!isValid || !video)}
            >
              Submit Video
            </Button>
          </Stack>
        </Form>
        )}
      </Formik>
    </Stack>
  )
}

export default VideoForm;