import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

interface ImageHeaderProps {
  image: string;
  text: string;
};

const ImageHeader = ({ image, text }: ImageHeaderProps) => {
  return (
    <Box
      width="100%"
      position="relative"
      mb={5}
      sx={{ aspectRatio: 4 / 3, maxHeight: "66vh" }}
    >
      <Image
        src={image}
        alt={`${text} header`}
        style={{
          objectFit: "cover",
          objectPosition: "0 20%",
        }}
        fill
        priority
      />
      <Typography
        variant="h2"
        fontSize={{ xs: "2.5rem", sm: "3.75rem" }}
        position="absolute"
        bottom={0}
        ml={"5vw"}
        mb={{ xs: 4, sm: 6 }}
        color="white"
        sx={{ borderBottom: "2px solid white", whiteSpace: "pre-line" }}
        zIndex={5}
      >
        {text}
      </Typography>
      <Box position="absolute" top={0} width="100%" height="100%" sx={{ background:"linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8))"}} />
    </Box>
  )
}

export default ImageHeader;