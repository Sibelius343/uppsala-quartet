import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { PerformanceEvent } from '../models/events';
import { useRouter } from "next/router";

interface EventListProps {
  events: PerformanceEvent[],
}

const EventList = ({ events }: EventListProps) => {
  const router = useRouter();

  return (
    <List>
      {events.map(({ id, title, date }) => (
        <ListItem
          key={id}
        >
          <ListItemButton
            onClick={() => router.push(`event-detail/${id}`)}
          >
            <ListItemText
              primary={title}
              secondary={date}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default EventList;