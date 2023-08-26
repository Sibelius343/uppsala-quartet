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
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import EventForm from "./EventForm";

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
    router.push('/events');
  };

  const src = imgUrl ? imgUrl : DEFAULT_EVENT_IMAGE_PATH;

  const locationUrl = location ? `http://maps.google.com/?q=${location}` : '';
  
  const formattedDate = dayjs(date).format('h:mm A [on] dddd, MMMM Do, YYYY');

  return (
    <Card sx={{ width: '90%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <CardMedia
        component="img"
        image={src}
        alt='Quartet pic'
        sx={{ width: { xs: '100%', sm: '33%' }, aspectRatio: '4/3' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between'}}>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            {(isAdmin && isMounted) && 
            <IconButton
              onClick={() => setIsEditEventOpen(true)}
              sx={{ alignSelf: 'start' }}
            >
              <FontAwesomeIcon
                icon={faPencil}
                size="sm"
              />
            </IconButton>}
          </Box>
        {date && <Typography variant="subtitle1">
          {formattedDate}
        </Typography>}
        {location && <span>at <Link href={locationUrl} target='_blank' underline='hover'>
        {location}
        </Link></span>}
        <Typography mt={2} variant="body2" color="text.secondary">
          {description}
        </Typography>
        </Box>
        {(isMounted && isAdmin) && <Button onClick={handleDialogOpen} sx={{ alignSelf: 'end' }}>Delete</Button>}
      </CardContent>
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
    </Card>
  )
}

export default EventDetail;