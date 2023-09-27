import { Card, CardContent, Typography, Button, Link, CardMedia, Box, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import useAdminContext from "../hooks/useAdminContext"
import { PerformanceEvent } from "../interfaces/events"
import DeleteEventDialog from "./DeleteEventDialog";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { DEFAULT_EVENT_IMAGE_PATH } from "../constants/paths";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import EventForm from "./EventForm";
import Image from "next/image";

dayjs.extend(advancedFormat);

const EventDetail = ({ id, title, date, location, description, imgUrl } : PerformanceEvent ) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const { isAdmin } = useAdminContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, [])

  const handleDialogOpen = () => setDeleteDialogOpen(true);
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const src = imgUrl ? imgUrl : DEFAULT_EVENT_IMAGE_PATH;

  const locationUrl = location ? `http://maps.google.com/?q=${location}` : '';
  
  const formattedDate = dayjs(date).format('h:mm A [on] dddd, MMMM Do, YYYY');

  return (
    <Box sx={{ width: '90%', mt: 2, display: 'flex', flexDirection: "column" }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        width="100%"
        gap={2}
      >
        <Box display="flex" flexDirection="column" flex={1}>
          <Typography gutterBottom variant="h4" fontWeight="light">
            {title}
          </Typography>
          {date && <Typography variant="subtitle1" mb={1}>
            {formattedDate}
          </Typography>}
          {location && <span>at {location} <Link href={locationUrl} target='_blank' underline='hover'>
          {"(map)"}
          </Link></span>}
        </Box>
        <Typography flex={2}>
          {description}
        </Typography>
      </Box>
      {(isMounted && isAdmin) &&
      <Box display="flex" alignSelf="end" gap={1}>
        <IconButton
          onClick={() => setIsEditEventOpen(true)}
          sx={{ alignSelf: 'start', width: 37 }}
        >
          <FontAwesomeIcon
            icon={faPencil}
            size="sm"
          />
        </IconButton>
        <IconButton onClick={handleDialogOpen} sx={{ alignSelf: 'end', width: 37 }}>
        <FontAwesomeIcon
          icon={faTrash}
          size="sm"
        />
        </IconButton>
      </Box>}
      <DeleteEventDialog
        open={deleteDialogOpen}
        handleClose={handleDialogClose}
        id={id}
        title={title}
      />
      <Dialog
        open={isEditEventOpen}
        onClose={() => setIsEditEventOpen(false)}
        maxWidth={'lg'}
        fullWidth
      >
        <DialogTitle variant="h4" textAlign="center">
          Edit Event
        </DialogTitle>
        <DialogContent>
          <EventForm
            handleNavigate={() => setIsEditEventOpen(false)}
            id={id}
            title={title}
            date={date}
            location={location}
            description={description}
            imgUrl={imgUrl}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default EventDetail;