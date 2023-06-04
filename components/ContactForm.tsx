import { TextField, Button } from '@mui/material';
import { Formik, Form, useField, FieldHookConfig, FormikHelpers } from "formik"
import useNotificationContext from '../hooks/useNotificationContext';
import { ContactFormData } from '../interfaces/formData';
import * as Yup from 'yup';

type FieldProps = { label: string, rows?: number } & FieldHookConfig<string>;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const MessageValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name required')
    .required('Name required'),
  email: Yup.string()
    .matches(emailRegex,
    'Provide valid email')
    .required('Email required'),
  message: Yup.string()
    .min(5, 'Please provide us with more details')
    .required('Message required')
})

const TextInput = ({ label, rows, ...props }: FieldProps) => {
  const [field, meta] = useField<string>(props);

  return (
    <TextField
      id={label}
      label={label}
      variant="standard"
      multiline={Boolean(rows)}
      rows={rows}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      fullWidth
      required
      {...field}
      sx={{ display: 'block' }}
    />
  )
}

const ContactForm = () => {
  const { setNotificationMessage } = useNotificationContext();

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    message: ''
  }

  const handleSubmit = async (values: ContactFormData, helpers: FormikHelpers<ContactFormData>) => {
    const response = await fetch('api/mail', {
      method: 'post',
      body: JSON.stringify(values)
    });
    
    try {
      await response.json();
      setNotificationMessage('Message sent successfully!');
    } catch (e) {
      setNotificationMessage('Error sending message');
    }
    helpers.resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={MessageValidationSchema}
    >
      {({ isValid, dirty }) => (
      <Form
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <TextInput
          label='Name'
          name='name'
          type='text'
        />
        <TextInput
          label='Email'
          name='email'
          type='text'
        />
        <TextInput
          label='Message'
          name='message'
          type='text'
          rows={4}
        />
        <Button
          variant='contained'
          type='submit'
          sx={{ mt: 1, display: 'flex', alignSelf: 'start' }}
          disabled={!(isValid && dirty)}
        >
          Send
        </Button>
      </Form>
      )}
    </Formik>
  )
};

export default ContactForm;