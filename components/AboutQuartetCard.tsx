import { Card, CardMedia, CardContent, Typography } from "@mui/material"

interface CardProps {
  picUri: string,
  text: string
}

const AboutQuartetCard = ({ picUri, text }: CardProps) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mx: 2, alignSelf: 'stretch' }}>
      <CardMedia
        component="img"
        image={picUri}
        alt='Quartet pic'
        sx={{ maxWidth: '400px', maxHeight: '400px', display: 'flex', alignSelf: 'center'}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" whiteSpace='pre-wrap'>
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default AboutQuartetCard;