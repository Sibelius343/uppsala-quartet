import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from "react";
import useAdminContext from "../hooks/useAdminContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from "../hooks/useLocalStorage";

interface AdminLoginFormProps {
  handleClose: () => void;
}

const AdminLoginForm = ({ handleClose }: AdminLoginFormProps) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [, setLocalValue] = useLocalStorage('catena_admin', false);

  const { setIsAdmin } = useAdminContext();

  const handleLogin = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    const response = await fetch('api/login', {
      method: 'post',
      body: JSON.stringify({ password: passwordInput })
    });
    
    const data = await response.json();    
    
    if (data.admin) {
      setIsAdmin(true);
      setLocalValue(true)
      handleClose();
    } else {
      setErrorText('Incorrect password');
      setPasswordInput('');
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component='form'
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: {xs: '80vw', md: '20vw'},
        padding: 4,
        gap: 2
      }}
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        variant="outlined"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        error={Boolean(errorText)}
        helperText={errorText}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </IconButton>
            </InputAdornment>
        }}
      />
    </Box>
  )
}

export default AdminLoginForm;