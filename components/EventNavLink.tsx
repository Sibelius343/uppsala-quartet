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
    router.push(`/event/${event.id}`);
  };

  const formattedDate = dayjs(event.date).format('MMMM D');

  return (
    <Button onClick={handleClick} color="secondary">
      <Stack sx={{ textAlign: previous ? "start" : "end" }} gap={1}>
        <Typography fontSize={13}>
          {`${previous ? "Previous Event:" : "Next Event:"} ${formattedDate}`}
        </Typography>
        <Typography fontSize={13}>
          {event.title}
        </Typography>
      </Stack>
    </Button>
  )
}

export default EventNavLink;