import { Card, CardMedia, CardContent, Typography } from "@mui/material"
import { Performer } from "../interfaces/performer";

const BioCard = ({ name, instrument, bio, picUri }: Performer) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={picUri}
        alt={`${name} image`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}, {instrument}
        </Typography>
        <Typography variant="body2" color="text.secondary" whiteSpace='pre-wrap'>
          {bio}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default BioCard;