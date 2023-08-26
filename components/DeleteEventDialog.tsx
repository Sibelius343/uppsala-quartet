import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

interface DeleteEventProps {
  open: boolean,
  handleClose: () => void,
  id: string,
  title: string
}

const DeleteEventDialog = ({ open, handleClose, id, title }: DeleteEventProps) => {
  const handleDelete = async () => {
    const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete event: {title}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default DeleteEventDialog;