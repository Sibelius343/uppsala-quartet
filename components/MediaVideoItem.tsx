import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { LayoutItem, Video } from "../interfaces/media";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAdminContext from "../hooks/useAdminContext";
import VideoForm from "./VideoForm";
import DeleteVideoDialog from "./DeleteVideoDialog";

interface MediaVideoItemProps {
  video: Video;
  setNewVideos: Dispatch<SetStateAction<Video[]>>;
  isEditingMedia: boolean;
  setDeletedVideoIds: Dispatch<SetStateAction<string[]>>;
  setLayout: Dispatch<SetStateAction<LayoutItem[]>>;
}

const MediaVideoItem = ({ video: { videoId, videoTitle, videoDescription }, setNewVideos, isEditingMedia, setDeletedVideoIds, setLayout }: MediaVideoItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isVideoEditOpen, setIsVideoEditOpen] = useState(false);
  const [isVideoDeleteOpen, setIsVideoDeleteOpen] = useState(false);
  const theme = useTheme();

  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditItemClick = () => {
    handleClose();
    setIsVideoEditOpen(true);
  }
  const handleDeleteItemClick = () => {
    handleClose();
    setIsVideoDeleteOpen(true);
  }

  const [isMounted, setIsMounted] = useState(false);

  const { isAdmin } = useAdminContext();

  useEffect(() => {
    setIsMounted(true);
  }, [])

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "start"}}
      width="90vw"
      overflow="hidden"
    >
      <Box
        component={"iframe"}
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{ border: 0, borderRadius: 2, aspectRatio: "16/9" }}
        flex={2}
      />
      <Box
        display="flex"
        flexDirection="column"
        flex={3}
        overflow="hidden"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" fontSize={28} textAlign={{ xs: "center", md: "start"}}>
            {videoTitle}
          </Typography>
          {(isAdmin && isMounted && isEditingMedia) && 
          <IconButton
            onClick={handleOpenMenu}
            sx={{ alignSelf: 'start', width: 37 }}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size="sm"
              width={5.25}
            />
          </IconButton>}
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
            <MenuItem onClick={handleDeleteItemClick} sx={{ color: theme.palette.error.main }}>Delete</MenuItem>
          </Menu>
        </Box>
        <Typography overflow="hidden" textOverflow="ellipsis" variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'start', alignSelf: { xs: 'center', md: 'start'} }}>
          {videoDescription}
        </Typography>
      </Box>
      <Dialog
        open={isVideoEditOpen}
        onClose={() => setIsVideoEditOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4">Edit Video Details</DialogTitle>
        <DialogContent>
          <VideoForm
            handleClose={() => setIsVideoEditOpen(false)}
            setNewVideos={setNewVideos}
            videoEditId={videoId}
            videoEditTitle={videoTitle}
            videoEditDescription={videoDescription}
          />
        </DialogContent>
      </Dialog>
      <DeleteVideoDialog
        isVideoDeleteOpen={isVideoDeleteOpen}
        setIsVideoDeleteOpen={setIsVideoDeleteOpen}
        videoId={videoId}
        setDeletedVideoIds={setDeletedVideoIds}
        setLayout={setLayout}
      />
    </Box>
  )
}

MediaVideoItem.displayName = 'MediaVideoItem';

export default MediaVideoItem;