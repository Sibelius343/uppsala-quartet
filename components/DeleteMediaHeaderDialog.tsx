import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LayoutItem } from "../interfaces/media";

interface DeleteHeaderDialogProps {
  isDeleteHeaderDialogOpen: boolean;
  setIsDeleteHeaderDialogOpen: Dispatch<SetStateAction<boolean>>;
  index: number;
  setLayout: Dispatch<SetStateAction<LayoutItem[]>>;
}

const DeleteMediaHeaderDialog = ({ isDeleteHeaderDialogOpen, setIsDeleteHeaderDialogOpen, index, setLayout }: DeleteHeaderDialogProps) => {
  const handleHeaderDelete = () => {
    setLayout(state => {
      const stateClone = [...state];
      stateClone.splice(index, 1);
      return stateClone
    });
    setIsDeleteHeaderDialogOpen(false);
  }

  return (
    <Dialog
      open={isDeleteHeaderDialogOpen}
      onClose={() => setIsDeleteHeaderDialogOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle variant="h4">Delete Header?</DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Header will not be deleted until overall changes are saved.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsDeleteHeaderDialogOpen(false)}>Cancel</Button>
      <Button onClick={handleHeaderDelete}>
        Confirm
      </Button>
    </DialogActions>
    </Dialog>
  )
}

export default DeleteMediaHeaderDialog;