import { Card, CardContent, Typography, Button } from "@mui/material"
import { useState } from "react";
import useAdminContext from "../hooks/useAdminContext"
import { PerformanceEvent } from "../models/events"
import DeleteEventDialog from "./DeleteEventDialog";

const EventDetail = ({ id, title, date, description } : PerformanceEvent ) => {
  const { isAdmin } = useAdminContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDialogOpen = () => setDeleteDialogOpen(true);
  const handleDialogClose = () => setDeleteDialogOpen(false);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}{date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {isAdmin && <Button onClick={handleDialogOpen}>Delete</Button>}
      <DeleteEventDialog
        open={deleteDialogOpen}
        handleClose={handleDialogClose}
        id={id}
        title={title}
      />
    </Card>
  )
}

export default EventDetail;