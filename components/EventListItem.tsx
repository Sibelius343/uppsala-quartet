import { Box, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Image from "next/image";
import { PerformanceEvent } from "../interfaces/events";
import { useRouter } from "next/router";
import { DEFAULT_EVENT_IMAGE_PATH } from "../constants/paths";
import dayjs from "dayjs";

const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

interface ItemDescription {
  date?: string,
  location?: string,
  description?: string
}

const ItemDescription = ({ date, location, description }: ItemDescription) => {
  const descriptionLines = description ? description.split('\n') : [];

  return (
    <Box color={'GrayText'} >
      {date && <Typography variant="subtitle1">
        {date}
      </Typography>}
      {location && <Typography variant="subtitle1">
      {`at ${location}`}
      </Typography>}
      {description && 
      <Typography
        variant="body1"
        whiteSpace='nowrap'
        textOverflow={'ellipsis'}
        overflow='hidden'
      >
        {descriptionLines[0]}{descriptionLines.length > 1 ? '...' : ''}
      </Typography>}
    </Box>
  )
}

const EventListItem = ({ id, title, date, location, description, imgUrl }: PerformanceEvent) => {
  const router = useRouter();

  const src = imgUrl ? imgUrl : DEFAULT_EVENT_IMAGE_PATH;

  const formattedDate = dayjs(date).format('h:mm A [on] dddd, MMMM Do, YYYY');
  

  return (
    <ListItem>
      <ListItemButton
        onClick={() => router.push(`event/${id}`)}
      >
        <Box flexShrink={0}>
          <Image
            src={src}
            width={150}
            height={150}
            objectFit="none"
            alt={`${title} image`}
          />
        </Box>
        <Box flexDirection='column' overflow='hidden' ml={2}>
          <ListItemText
            primary={<Typography variant="h4">{title}</Typography>}
          />
          <ItemDescription
            date={formattedDate}
            location={location}
            description={description}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  )
};

export default EventListItem;