import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Formik, Form, useField, FieldHookConfig } from "formik";
import { NewPerformanceEvent } from '../interfaces/events';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import ImagePicker from './ImagePicker';
import { UnsplashImage } from '../interfaces/images';

type FieldProps = { label: string, rows?: number } & FieldHookConfig<string>;

export interface FormValues {
  id: number,
  title: string,
  date: Date | null
}

interface DateValue {
  $d: string
}

const AddEventValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Title required')
    .required('Title required'),
  date: Yup.string()
    .matches(/(0[1-9]|1[0-2]\/(0[1-9]|[1-2][0-9]|3[0-1])\/20[2-4][0-9]\s[0-1][0-9]:[0-6][0-9]\s(A|P)M)/,
    'Incorrect date format')
})

const TextInput = ({ label, rows, ...props }: FieldProps) => {
  const [field, meta] = useField<string>(props);

  return (
    <TextField
      id={label}
      label={label}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.error}
      fullWidth
      multiline={Boolean(rows)}
      rows={rows}
      {...field}
      sx={{ display: 'block', my: 2 }}
    />
  )
}

const DateInput = ({ label, rows, ...props}: FieldProps) => {
  const [field, meta, helpers] = useField<string>(props);

  const handleChange = (value: DateValue | null) => {
    if (value) helpers.setValue(value.$d)
  }  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        {...field}
        onChange={handleChange}
        renderInput={({...params}) => (
          <TextField
          id={label}
          fullWidth
          {...params}
          onBlur={() => helpers.setTouched(true)}
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
          />
        )}
      />
    </LocalizationProvider>
  )
}

const AddEventForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const [photoQuery, setPhotoQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashImage>();
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const initialValues: NewPerformanceEvent = {
    title: '',
    date: '',
    location: '',
    description: ''
  }

  const handleImageFormSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPhotoQuery(searchValue);
  }

  const handleSubmit = async (values: NewPerformanceEvent) => {
    const newEvent: NewPerformanceEvent = { ...values, imgUrl: selectedPhoto?.urls.small || '' };

    await fetch('api/addEvent', {
      method: 'post',
      body: JSON.stringify(newEvent)
    });
    
    router.push('/events');
  };

  const handleCancel = () => {
    router.push('/events');
  };

  return (
    <Box sx={{ width: '75%' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={AddEventValidationSchema}
      >
        {({ isValid, touched }) => (
        <Form>
          <TextInput
            label='Event Name'
            name='title'
            type='text'
          />
          <DateInput
            label='Date and Time'
            name='date'
            type='text'
          />
          <TextInput
            label='Event Location'
            name='location'
            type='text'
          />
          <TextInput
            label='Description'
            name='description'
            type='text'
            rows={4}
          />
          <Box sx={{ display: 'flex', gap: 2 }} >
            {selectedPhoto ?
            <Image src={selectedPhoto.urls.small} alt={'Event Image'} width={150} height={150} objectFit='cover' /> :
            <FontAwesomeIcon icon={faImage} size="10x" color='#d4d4d4' />}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }} >

              <Button
                variant='contained'
                onClick={() => setIsOpen(true)}
              >
                Add Photo
              </Button>
            </Box>
          </Box>
          <Box>
            <Button
              sx={{ mt: 1 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              type='submit'
              sx={{ mt: 1 }}
              disabled={!isValid || !Boolean(touched.title)}
            >
              Create Event
            </Button>
          </Box>
        </Form>
        )}
      </Formik>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle variant='h5'>Search Image</DialogTitle>
        <DialogContent>
          <Box
            component='form'
            onSubmit={handleImageFormSearch}
          >
            <TextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              fullWidth
            />
            <Button type='submit'>Search</Button>
          </Box>
          {photoQuery &&
          <ImagePicker
            query={photoQuery}
            selectedImage={selectedPhoto}
            setSelectedImage={setSelectedPhoto}
            page={page}
            setPage={setPage}
            handleClose={() => setIsOpen(false)}
          />}
        </DialogContent>
      </Dialog>
    </Box>
  )
};

export default AddEventForm;