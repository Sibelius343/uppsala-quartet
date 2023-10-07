import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { PerformanceEvent } from "../interfaces/events";

interface EventNavLinkProps {
  event: PerformanceEvent,
  previous?: boolean
}

const EventNavLink = ({ event, previous = false }: EventNavLinkProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${event.id}`);
  };

  const formattedDate = dayjs(event.date).format('MMMM D');

  return (
    <Button onClick={handleClick} color="secondary" sx={{ px: 0 }}>
      <Stack sx={{ textAlign: previous ? "start" : "end" }} gap={1}>
        <Typography fontSize={{ xs: 13, sm: 15}}>
          {`${previous ? "Previous Event:" : "Next Event:"} ${formattedDate}`}
        </Typography>
        <Typography fontSize={{ xs: 13, sm: 15}}>
          {event.title}
        </Typography>
      </Stack>
    </Button>
  )
}

export default EventNavLink;