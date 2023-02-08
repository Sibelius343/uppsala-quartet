import { Divider, List, Box } from "@mui/material";
import EventListItem from "./EventListItem";
import { PerformanceEvent } from '../interfaces/events';

interface EventListProps {
  events: PerformanceEvent[],
}

const EventList = ({ events }: EventListProps) => {
  return (
    <List sx={{width: '90vw'}}>
      {events.map(({ id, title, date, location, description, imgUrl }, i) => (
        <Box key={id}>
          <EventListItem
            id={id}
            title={title}
            date={date}
            location={location}
            description={description}
            imgUrl={imgUrl}
          />
          {i < events.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  )
}

export default EventList;