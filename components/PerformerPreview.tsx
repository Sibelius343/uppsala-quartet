import { Card, CardMedia, CardContent, Typography, Box, IconButton, Dialog, ButtonBase } from "@mui/material"
import useAdminContext from "../hooks/useAdminContext";
import { Performer } from "../interfaces/performer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import EditTextForm, { ItemEnum } from "./EditTextForm";
import Image from "next/image";
import { useRouter } from "next/router";


const PerformerPreview = ({ id, name, instrument, bio, picUri }: Performer) => {
  const router = useRouter();

  return (
    <ButtonBase
      onClick={() => router.push(`about/${id}`)}
      sx={{
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'start'
      }}>
      <Box width="100%" position="relative" sx={{ aspectRatio: "3/4" }}>
        <Image
          src={picUri}
          alt={`${name} bio`}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: '4px' }}
        />
      </Box>
      <Typography variant="h5" pt={2}>
        {`${name}, ${instrument}`}
      </Typography>
    </ButtonBase>
  )
};

export default PerformerPreview;