import { Card, CardMedia, CardContent, Typography, Box, IconButton, Dialog } from "@mui/material"
import useAdminContext from "../hooks/useAdminContext";
import { Performer } from "../interfaces/performer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import EditTextForm, { ItemEnum } from "./EditTextForm";


const BioCard = ({ id, name, instrument, bio, picUri }: Performer) => {
  const [isEditTextOpen, setIsEditTextOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isAdmin } = useAdminContext();

  useEffect(() => {
    setIsMounted(true);
  }, [])

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={picUri}
          alt={`${name} image`}
          sx={{ maxHeight: '750px', objectPosition: 'top' }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}, {instrument}
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
          </Box>
          <Typography variant="body2" color="text.secondary" whiteSpace='pre-line'>
            {bio}
          </Typography>
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
          itemTitle={`${name}'s bio`}
          itemText={bio}
          itemType={ItemEnum.Bio}
          handleClose={() => setIsEditTextOpen(false)}
        />
      </Dialog>
    </>
  )
};

export default BioCard;