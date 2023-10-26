import { Typography, IconButton, Dialog, Box } from "@mui/material"
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
      <Box>
        <Box sx={{
          float: { xs: 'none', md: 'left' },
          mr: { xs: 0, md: 2 },
          textAlign: 'center',
          aspectRatio: 5253/3752,
          width: { xs: "auto", md: 600 },
          position: "relative",
          mb: { xs: 2, md: 0}
        }}>
          <Image
            src={picUri}
            alt='Quartet Bio'
            fill
            sizes="(max-width: 600px) 100vw, 400px"
            style={{ borderRadius: '4px', objectFit: "cover" }}
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