import { IconButton, Snackbar } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useNotificationContext from "../hooks/useNotificationContext";

const NotificationSnackbar = () => {
  const { notificationMessage, setNotificationMessage } = useNotificationContext();

  const handleClose = () => {
    setNotificationMessage('');
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(notificationMessage)}
      onClose={handleClose}
      autoHideDuration={5000}
      message={notificationMessage}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
          />
        </IconButton>
      }
    />
  )
}

export default NotificationSnackbar;