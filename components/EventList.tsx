import { List } from "@mui/material";
import EventListItem from "./EventListItem";
import { PerformanceEvent } from '../interfaces/events';

interface EventListProps {
  events: PerformanceEvent[],
}

const EventList = ({ events }: EventListProps) => {
  return (
    <List sx={{width: '90vw'}}>
      {events.map(({ id, title, date, location, description, imgUrl }) => (
        <EventListItem
          key={id}
          id={id}
          title={title}
          date={date}
          location={location}
          description={description}
          imgUrl={imgUrl}
        />
      ))}
    </List>
  )
}

export default EventList;