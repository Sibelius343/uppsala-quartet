import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction, useState } from "react";
import { LayoutItem } from "../interfaces/media";
import MediaHeaderForm from "./MediaHeaderForm";
import DeleteMediaHeaderDialog from "./DeleteMediaHeaderDialog";

interface MediaHeaderItemProps {
  headerText: string;
  index: number;
  isEditingMedia: boolean;
  setLayout: Dispatch<SetStateAction<LayoutItem[]>>;
}

const MediaHeaderItem = ({ headerText, index, isEditingMedia, setLayout }: MediaHeaderItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditHeaderDialogOpen, setIsEditHeaderDialogOpen] = useState(false);
  const [isDeleteHeaderDialogOpen, setIsDeleteHeaderDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleEditItemClick = () => {
    setIsEditHeaderDialogOpen(true);
    handleClose();
  }

  const handleDeleteItemClick = () => {
    setIsDeleteHeaderDialogOpen(true);
    handleClose();
  }

  return (
    <>
      <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between" mb={4}>
        <Typography variant="h3" sx={{ borderBottom: 2}}>
          {headerText}
        </Typography>
        {isEditingMedia &&
        <IconButton
          onClick={handleOpen}
          sx={{ alignSelf: 'start', width: 37 }}
        >
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size="sm"
            width={5.25}
          />
        </IconButton>
        }
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEditItemClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteItemClick} sx={{ color: "error.main" }}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={isEditHeaderDialogOpen}
        onClose={() => setIsEditHeaderDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4">Edit Header</DialogTitle>
        <DialogContent>
          <MediaHeaderForm
            handleClose={() => setIsEditHeaderDialogOpen(false)}
            setLayout={setLayout}
            existingItemIndex={index}
            existingHeaderText={headerText}
          />
        </DialogContent>
      </Dialog>
      <DeleteMediaHeaderDialog
        index={index}
        isDeleteHeaderDialogOpen={isDeleteHeaderDialogOpen}
        setIsDeleteHeaderDialogOpen={setIsDeleteHeaderDialogOpen}
        setLayout={setLayout}
      />
    </>
  )
}

export default MediaHeaderItem;