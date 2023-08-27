import { Card, CardMedia, CardContent, Typography, IconButton, Dialog, Box } from "@mui/material"
import { useEffect, useState } from "react";
import useAdminContext from "../hooks/useAdminContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import EditTextForm, { ItemEnum } from "./EditTextForm";
import Image from "next/image";

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
      <Box
        px={{ xs: 3, md: 6 }}
      >
        <Box sx={{ float: { xs: 'none', sm: 'left' }, mr: 2, textAlign: 'center' }}>
          <Image
            src={picUri}
            alt='Quartet Bio'
            width={400}
            height={300}
            style={{ borderRadius: '4px' }}
          />
        </Box>
        {(isAdmin && isMounted) &&
        <IconButton
          onClick={() => setIsEditTextOpen(true)}
          sx={{ alignSelf: 'start', float: 'right' }}
        >
          <FontAwesomeIcon
            icon={faPencil}
            size="sm"
          />
        </IconButton>}
        <Typography whiteSpace="pre-line">{text}</Typography>
      </Box>
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