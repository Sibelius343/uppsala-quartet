import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ImageHeaderProps {
  image: string;
  text: string;
};

const ImageHeader = ({ image, text }: ImageHeaderProps) => {
  return (
    <Box
      width="100%"
      height={500}
      position="relative"
      mb={5}
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
        position="absolute"
        bottom={0}
        ml={"5vw"}
        mb={6}
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