import { Box, Dialog, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import useAdminContext from "../hooks/useAdminContext";
import { Performer } from "../interfaces/performer";
import EditTextForm, { ItemEnum } from "./EditTextForm";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const PerformerDetails = ({ id, name, instrument, bio, picUri }: Performer) => {
  const [isEditTextOpen, setIsEditTextOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isAdmin } = useAdminContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
    <Box
      px={{ xs: 3, md: 6 }}
    >
      <Box
        sx={{
          float: { xs: 'none', sm: 'left' },
          aspectRatio: "3/4",
          margin:{ xs: "auto", sm: "0 16px 0 0" }
        }}
        width={{ xs: "auto", sm: "350px" }}
        position="relative"
      >
        <Image
          src={picUri}
          alt={`${name} bio`}
          fill
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
      <Typography mt={{ xs: 2, sm: 0 }} whiteSpace="pre-line">{bio}</Typography>
    </Box>
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
}

export default PerformerDetails;