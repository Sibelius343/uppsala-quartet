import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import useNotificationContext from "../hooks/useNotificationContext";

interface DeleteVideoDialogProps {
  isVideoDeleteOpen: boolean;
  setIsVideoDeleteOpen: Dispatch<SetStateAction<boolean>>;
  videoId: string
}

const DeleteVideoDialog = ({ isVideoDeleteOpen, setIsVideoDeleteOpen, videoId }: DeleteVideoDialogProps) => {
  const { setNotificationMessage } = useNotificationContext();
  const handleVideoDelete = async () => {
    try {
      await fetch(`/api/media`, {
        method: 'DELETE',
        body: JSON.stringify({ videoId })
      });
      setNotificationMessage('Video deleted successfully');
    } catch (e: any) {
      setNotificationMessage('Error deleting video');
    }
    setIsVideoDeleteOpen(false);
  }

  return (
    <Dialog
      open={isVideoDeleteOpen}
      onClose={() => setIsVideoDeleteOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle variant="h4">Delete Video?</DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
        This cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsVideoDeleteOpen(false)}>Cancel</Button>
      <Button onClick={handleVideoDelete} autoFocus>
        Confirm
      </Button>
    </DialogActions>
    </Dialog>
  )
}

export default DeleteVideoDialog;