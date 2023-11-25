import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, Menu, MenuItem } from "@mui/material";
import MediaHeaderItem from "./MediaHeaderItem";
import MediaVideoItem from "./MediaVideoItem";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { LayoutItem, Video } from "../interfaces/media";
import { Dispatch, SetStateAction, useState } from "react";
import VideoForm from "./VideoForm";
import MediaHeaderForm from "./MediaHeaderForm";

interface MediaListProps {
  layout: LayoutItem[];
  setLayout: Dispatch<SetStateAction<LayoutItem[]>>;
  setNewVideos: Dispatch<SetStateAction<Video[]>>;
  videos: Video[];
  isEditingMedia: boolean;
  setDeletedVideoIds: Dispatch<SetStateAction<string[]>>;
}

const MediaList = ({ layout, setLayout, setNewVideos, videos, isEditingMedia, setDeletedVideoIds }: MediaListProps) => {
  
  const [newItemIndex, setNewItemIndex] = useState<number>();
  const [isEditVideosDialogOpen, setIsEditVideosDialogOpen] = useState(false);
  const [isAddHeaderDialogOpen, setIsAddHeaderDialogOpen] = useState(false);
  const [addItemAnchorElement, setAddItemAnchorElement] = useState<null | HTMLElement>(null);
  const addItemMenuOpen = Boolean(addItemAnchorElement);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const item = layout.find(i => i.id === draggableId);
    
    if (item) {
      const mediaLayoutClone = [...layout];
      mediaLayoutClone.splice(source.index, 1);
      mediaLayoutClone.splice(destination.index, 0, item);
      setLayout(mediaLayoutClone);
    }
  }

  const handleOpenAddItemMenu = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setAddItemAnchorElement(event.currentTarget);
    setNewItemIndex(index);
  }

  const handleCloseAddItemMenu = () => {
    setAddItemAnchorElement(null);
  }

  const handleClickAddVideo = () => {
    handleCloseAddItemMenu();
    setIsEditVideosDialogOpen(true);
  }

  const handleClickAddHeader = () => {
    handleCloseAddItemMenu();
    setIsAddHeaderDialogOpen(true);
  }

  const handleCloseHeaderDialog = () => {
    setIsAddHeaderDialogOpen(false);
  }

  return (
    <>
      {isEditingMedia &&
      <IconButton onClick={(event) => handleOpenAddItemMenu(event, 0)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </IconButton>
      }
      <DragDropContext  onDragEnd={handleDragEnd}>
        <Droppable droppableId="media-drop-area">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
          {
            layout.map((item, i) => {
              const video = item.itemType === "MEDIA_ITEM" ? videos.find(v => v.videoId === item.mediaItemId) : undefined;
              return (
                <Draggable isDragDisabled={!isEditingMedia} key={item.id} draggableId={item.id} index={i}>
                {(provided) => (
                  <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{ flexDirection: "column"}}>
                    {item.itemType === "HEADER" && 
                    <MediaHeaderItem
                      headerText={item.headerText}
                      index={i}
                      isEditingMedia={isEditingMedia}
                      setLayout={setLayout}
                    />}
                    {video && <Box key={video.videoId}>
                      <MediaVideoItem
                        video={video}
                        setNewVideos={setNewVideos}
                        isEditingMedia={isEditingMedia}
                        setDeletedVideoIds={setDeletedVideoIds}
                        setLayout={setLayout}
                      />
                      {i < layout.length - 1 && 
                      <Divider sx={{ my: 4 }} />
                      }
                    </Box>}
                    {isEditingMedia &&
                    <IconButton onClick={(event) => handleOpenAddItemMenu(event, i + 1)}>
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </IconButton>
                    }
                  </ListItem>
                )}
                </Draggable>
              )
            })
          }
          {provided.placeholder}
          </List>
        )}
        </Droppable>
      </DragDropContext>
      <Dialog
        open={isEditVideosDialogOpen}
        onClose={() => setIsEditVideosDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4">Add Video</DialogTitle>
        <DialogContent>
          <VideoForm
            handleClose={() => setIsEditVideosDialogOpen(false)}
            setNewVideos={setNewVideos}
            setLayout={setLayout}
            newItemIndex={newItemIndex}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isAddHeaderDialogOpen}
        onClose={handleCloseHeaderDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4">Add Header</DialogTitle>
        <DialogContent>
          <MediaHeaderForm
            handleClose={handleCloseHeaderDialog}
            setLayout={setLayout}
            newItemIndex={newItemIndex}
          />
        </DialogContent>
      </Dialog>
      <Menu
        id="add-media-item-menu"
        anchorEl={addItemAnchorElement}
        open={addItemMenuOpen}
        onClose={handleCloseAddItemMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickAddHeader}>Add Header</MenuItem>
        <MenuItem onClick={handleClickAddVideo}>Add Video</MenuItem>
      </Menu>
    </>
  )
}

export default MediaList;