import { TextField, Button } from '@mui/material';
import { Formik, Form, useField, FieldHookConfig, FormikHelpers } from "formik"

type FieldProps = { label: string, rows?: number } & FieldHookConfig<string>;

export interface FormValues {
  name: string,
  email: string,
  message: string
}

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
      helperText={meta.error}
      fullWidth
      {...field}
      sx={{ display: 'block' }}
    />
  )
}

const ContactForm = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    message: ''
  }

  const handleSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    const response = await fetch('api/mail', {
      method: 'post',
      body: JSON.stringify(values)
    });
    
    const data = await response.json();
    console.log(data);
    helpers.resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form >
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
          sx={{ mt: 1 }}
        >
          Send
        </Button>
      </Form>
    </Formik>
  )
};

export default ContactForm;