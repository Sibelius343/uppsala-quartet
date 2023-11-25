import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LayoutItem } from "../interfaces/media";

interface DeleteVideoDialogProps {
  isVideoDeleteOpen: boolean;
  setIsVideoDeleteOpen: Dispatch<SetStateAction<boolean>>;
  videoId: string;
  setDeletedVideoIds: Dispatch<SetStateAction<string[]>>;
  setLayout: Dispatch<SetStateAction<LayoutItem[]>>;
}

const DeleteVideoDialog = ({ isVideoDeleteOpen, setIsVideoDeleteOpen, videoId, setDeletedVideoIds, setLayout }: DeleteVideoDialogProps) => {
  const handleVideoDelete = () => {
    setDeletedVideoIds(state => ([...state, videoId]));
    setLayout(state => ([...state.filter(item => (item.itemType === "HEADER" || item.mediaItemId !== videoId))]));
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
        Video will not be deleted until overall changes are saved.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsVideoDeleteOpen(false)}>Cancel</Button>
      <Button onClick={handleVideoDelete}>
        Confirm
      </Button>
    </DialogActions>
    </Dialog>
  )
}

export default DeleteVideoDialog;