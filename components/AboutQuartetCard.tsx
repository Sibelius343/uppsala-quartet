import { Card, CardMedia, CardContent, Typography, IconButton, Dialog } from "@mui/material"
import { useEffect, useState } from "react";
import useAdminContext from "../hooks/useAdminContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import EditTextForm, { ItemEnum } from "./EditTextForm";

interface CardProps {
  id: string,
  picUri: string,
  text: string
}

const AboutQuartetCard = ({ id, picUri, text }: CardProps) => {
  const [isEditTextOpen, setIsEditTextOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isAdmin } = useAdminContext();

  useEffect(() => {
    setIsMounted(true);
  }, [])

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mx: 2, alignSelf: 'stretch' }}>
        <CardMedia
          component="img"
          image={picUri}
          alt='Quartet pic'
          sx={{ maxWidth: '400px', maxHeight: '400px', display: 'flex', alignSelf: 'center'}}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'row'}}>
          <Typography variant="body2" color="text.secondary" whiteSpace='pre-wrap'>
            {text}
          </Typography>
          {(isAdmin && isMounted) &&
          <IconButton
            onClick={() => setIsEditTextOpen(true)}
            sx={{ alignSelf: 'start' }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              size="sm"
            />
          </IconButton>}
        </CardContent>
      </Card>
      <Dialog
        open={isEditTextOpen}
        onClose={() => setIsEditTextOpen(false)}
        maxWidth={'lg'}
        fullWidth
      >
        <EditTextForm
          itemId={id}
          itemTitle={'About Quartet'}
          itemText={text}
          itemType={ItemEnum.AboutQuartet}
          handleClose={() => setIsEditTextOpen(false)}
        />
      </Dialog>
    </>
  )
};

export default AboutQuartetCard;