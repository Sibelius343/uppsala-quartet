import { Typography, Box, ButtonBase } from "@mui/material"
import { Performer } from "../interfaces/performer";
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
          fill
          style={{ borderRadius: '4px', objectFit: "cover" }}
        />
      </Box>
      <Typography variant="h5" pt={2}>
        {`${name}, ${instrument}`}
      </Typography>
    </ButtonBase>
  )
};

export default PerformerPreview;