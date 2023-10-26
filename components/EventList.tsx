import { Divider, List, Box, Typography } from "@mui/material";
import EventListItem from "./EventListItem";
import { PerformanceEvent } from '../interfaces/events';

interface EventListProps {
  events: PerformanceEvent[],
}

const EventList = ({ events }: EventListProps) => {
  const currentDate = new Date().toISOString();
  const sortedEvents = events.sort((a, b) => {
    if ((a.date || "01-01-2999") < (b.date || "01-01-2999")) return 1;
    return -1
  });
  
  const pastEventsIndex = sortedEvents.findIndex(e => (e.date || "01-01-2999") < currentDate);
  const upcomingEvents = sortedEvents.slice(0, pastEventsIndex < 0 ? sortedEvents.length : pastEventsIndex);
  const pastEvents = sortedEvents.slice(pastEventsIndex < 0 ? sortedEvents.length : pastEventsIndex, sortedEvents.length);

  return (
    <List sx={{width: '90vw', pt: 0 }}>
      {upcomingEvents.length > 0 && <Typography
        variant="h4"
        display="flex"
        alignItems="end"
        fontWeight="light"
        fontSize={30}
        justifyContent={{ xs: "center", sm: "start" }}
        sx={{ width: { xs: "100%", sm: "40%", md: "25%" }, borderBottom: "solid 2px" }}
      >
        Upcoming
      </Typography>}
      {upcomingEvents.map(({ id, title, date, location, description, imgUrl }, i) => (
        <Box key={id}>
          <EventListItem
            id={id}
            title={title}
            date={date}
            location={location}
            description={description}
            imgUrl={imgUrl}
          />
          {i < upcomingEvents.length - 1 && <Divider />}
        </Box>
      ))}
      {pastEvents.length > 0 && <Typography
        variant="h3"
        display="flex"
        alignItems="end"
        fontWeight="light"
        fontSize={30}
        justifyContent={{ xs: "center", sm: "start" }}
        sx={{ height: "75px", width: { xs: "100%", sm: "40%", md: "25%" }, borderBottom: "solid 2px", my: 2 }}
      >
        Past
      </Typography>}
      {pastEvents.map(({ id, title, date, location, description, imgUrl }, i) => (
        <Box key={id}>
          <EventListItem
            id={id}
            title={title}
            date={date}
            location={location}
            description={description}
            imgUrl={imgUrl}
          />
          {i < pastEvents.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  )
}

export default EventList;