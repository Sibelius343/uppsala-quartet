import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { LayoutItem, Video, YoutubeVideoItem } from "../interfaces/media";
import TextInput from "./FormikTextInput";
import * as Yup from 'yup';
import { Dispatch, SetStateAction, useState } from "react";
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
  setNewVideos: Dispatch<SetStateAction<Video[]>>;
  setLayout?: Dispatch<SetStateAction<LayoutItem[]>>;
  newItemIndex?: number;
}

interface VideoFormValues {
  videoTitle: string;
  videoDescription: string;
}

const VideoForm = ({ handleClose, videoEditId, videoEditTitle = '', videoEditDescription = '', setNewVideos, setLayout, newItemIndex }: VideoFormProps) => {
  const [video, setVideo] = useState<YoutubeVideoItem>();
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
      setNewVideos(state => ([...state, editedVideo]));
      handleClose();
    } else if (video && newItemIndex && setLayout) {
      const newVideo: Video = {
        videoId: video.id,
        ...values
      }
      setLayout(layout => {
        const layoutClone = [...layout];
        layoutClone.splice(newItemIndex, 0, { itemType: "MEDIA_ITEM", id: `tempId-${newVideo.videoId}`, mediaItemId: newVideo.videoId });
        return layoutClone;
      })
      setNewVideos(state => ([...state, newVideo]));
      handleClose();
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