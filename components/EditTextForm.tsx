import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useNotificationContext from "../hooks/useNotificationContext";

export enum ItemEnum {
  Bio = 'BIO',
  AboutQuartet = 'ABOUT_QUARTET',
}

interface EditTextFormProps {
  itemId: string;
  itemTitle: string;
  itemText: string;
  itemType: ItemEnum;
  handleClose: () => void;
}

const EditTextForm = ({ itemId, itemTitle, itemText, itemType, handleClose }: EditTextFormProps) => {
  const [text, setText] = useState(itemText);
  const { setNotificationMessage } = useNotificationContext();

  const getApiPath = () => {
    switch (itemType) {
      case ItemEnum.Bio:
        return 'api/editBio';
      case ItemEnum.AboutQuartet:
        return 'api/editAboutQuartet';
      default:
        return '/'
    }
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    try {
      await fetch(getApiPath(), {
        method: 'put',
        body: JSON.stringify({
          id: itemId,
          text
        })
      });
      setNotificationMessage('Text updated successfully.')
      handleClose();
    } catch(e) {
      setNotificationMessage('Error updating text.')
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        gap: 2
      }}
    >
      <Typography variant="h4">Edit {itemTitle}</Typography>
      <TextField
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        multiline
        fullWidth
      />
      <Box sx={{ display: 'flex', alignSelf: 'end', gap: 2 }}>
        <Button variant="text" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default EditTextForm;