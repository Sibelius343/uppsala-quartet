import { Box, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Image from "next/image";
import { PerformanceEvent } from "../interfaces/events";
import { useRouter } from "next/router";
import { DEFAULT_EVENT_IMAGE_PATH } from "../constants/paths";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

interface ItemDescription {
  date?: string,
  location?: string,
  description?: string
}

const DateElement = ({ date, src, title }: { date: string, src: string, title: string }) => {
  const [month, day] = dayjs(date).format("MMM,DD").split(",");

  return (
    <Box width="100%" position="relative">
      <Image
        src={src}
        fill
        sizes="300px"
        style={{ objectFit: "cover", borderRadius: "4px" }}
        alt={`${title} image`}
      />
      <Box
        position="absolute"
        top={5}
        right={5}
        width={75}
        height={75}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "white", borderRadius: 1 }}
      >
        <Typography fontSize={16} fontWeight="light" lineHeight={1.15}>
          {month.toUpperCase()}
        </Typography>
        <Typography fontSize={22} fontWeight="bold" lineHeight={1.15}>
          {day}
        </Typography>
      </Box>
    </Box>
  )
}

const ItemDescription = ({ date, location, description }: ItemDescription) => {
  return (
    <Box display="flex" flexDirection="column" mt={1} textAlign={{ xs: "center", sm: "start"}}>
      {date && <Typography fontSize={18}>
        {date}
      </Typography>}
      {location && <Typography fontSize={18}>
      {`at ${location}`}
      </Typography>}
      {description && 
      <Typography
        display="-webkit-box"
        textOverflow={'ellipsis'}
        overflow='hidden'
        mt={date || location ? 1 : 0}
        sx={{ WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
      >
        {description}
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
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Box
          display="flex"
          flex={1}
          width="100%"
          maxHeight={300}
          maxWidth={300}
          sx={{ aspectRatio: 1 }}
        >
          <DateElement
            date={date || ""}
            src={src}
            title={title}
          />
        </Box>
        <Box display="flex" flex={2} flexDirection='column' alignSelf="start" overflow='hidden' ml={2} maxWidth="100%">
          <ListItemText
            primary={<Typography textAlign={{ xs: 'center', sm: 'start' }} variant="h4" fontWeight="light">{title}</Typography>}
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