import Image from "next/image";
import { Box, Button, ButtonBase, IconButton, ImageList, ImageListItem } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, useRef, createRef, RefObject } from 'react';
import { UnsplashApiResponse, UnsplashImage } from '../interfaces/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface ImagePickerProps {
  query: string;
  selectedImage?: UnsplashImage;
  setSelectedImage: Dispatch<SetStateAction<UnsplashImage | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleClose: () => void;
}

interface SelectOverlayProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const SelectedOverlay = ({ x, y, width, height }: SelectOverlayProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        x,
        y,
        width,
        height,
        border: 6,
        borderColor: '#1877F2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesomeIcon icon={faCircleCheck} size='3x' color="#1877F2" />
    </Box>
  )
}

const ImagePicker = ({ query, selectedImage, setSelectedImage, page, setPage, handleClose }: ImagePickerProps) => {
  const [apiResponse, setApiResponse] = useState<UnsplashApiResponse>();
  const [clickedImage, setClickedImage] = useState<UnsplashImage | undefined>();
  
  const imageRefs = useRef<RefObject<HTMLLIElement>[]>([]);
  imageRefs.current = apiResponse?.results.map((_, i) => imageRefs.current[i] ?? createRef<HTMLLIElement>()) || [];
   
  useEffect(() => {
    const fetchImages = async () => {
      const result = await fetch('api/imageSearch', {
        method: 'post',
        body: JSON.stringify({ query, page, perPage: 9 })
      })

      const apiResponse = await result.json() as UnsplashApiResponse;
      
      setApiResponse(apiResponse);
    }
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  useEffect(() => {
    if (apiResponse) {
      const clicked = apiResponse.results.find(img => img.id === selectedImage?.id);
      if (clicked) setClickedImage(clicked);
    }
  }, [apiResponse, selectedImage])

  const handleSelectPhoto = () => {
    if(clickedImage) {
      setSelectedImage(clickedImage);
    }
    handleClose();
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (apiResponse && page < apiResponse.total_pages) {
      setPage(page + 1);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {apiResponse && <ImageList cols={3}>
        {apiResponse.results.map((image, i) => {
          const ref = imageRefs.current[i];
          const x = ref.current?.getBoundingClientRect().x || 0;
          const y = ref.current?.getBoundingClientRect().y || 0;
          const width = ref.current?.getBoundingClientRect().width || 0;
          const height = ref.current?.getBoundingClientRect().height || 0;

          return (
            <ButtonBase key={i} onClick={() => setClickedImage(image)}>
              <ImageListItem ref={ref}>
                <Image
                  src={image.urls.small}
                  alt={image.alt_description}
                  width={150}
                  height={150}
                  objectFit='cover'
                />
                {clickedImage?.id === image.id && <SelectedOverlay x={x} y={y} width={width} height={height} />}
              </ImageListItem>
            </ButtonBase>
          )
        })}
      </ImageList>}
      <Box
        sx={{ display: 'flex', gap: 2, alignSelf: 'center' }}
      >
        <IconButton onClick={handlePreviousPage}>
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </IconButton>
        <IconButton onClick={handleNextPage}>
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </IconButton>
      </Box>
      <Box
        sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSelectPhoto}>Select Photo</Button>
      </Box>
    </Box>
  )
}

export default ImagePicker;