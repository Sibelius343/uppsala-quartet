import { TextField } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

export type FieldProps = { label: string, rows?: number } & FieldHookConfig<string>;

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

export default TextInput;