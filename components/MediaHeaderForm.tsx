import { Box, Button, TextField } from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { LayoutItem } from "../interfaces/media";

interface MediaHeaderFormProps {
  setLayout: Dispatch<SetStateAction<LayoutItem[]>>;
  handleClose: () => void;
  newItemIndex?: number;
  existingItemIndex?: number;
  existingHeaderText?: string;
}

const MediaHeaderForm = ({ setLayout, handleClose, newItemIndex, existingItemIndex, existingHeaderText }: MediaHeaderFormProps) => {
  const [headerText, setHeaderText] = useState(existingHeaderText || "");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setLayout(state => {
      const stateClone = [...state];
      if (newItemIndex) {
        stateClone.splice(newItemIndex, 0, { itemType: "HEADER", id: `tempId-${headerText}-${newItemIndex}`, headerText });
      }
      else if (existingItemIndex !== undefined) {
        stateClone.splice(existingItemIndex, 1, { itemType: "HEADER", id: `tempId-${headerText}-${existingItemIndex}`, headerText });
      }
      return stateClone;
    })
    handleClose();
  }

  const canSubmit = headerText && existingHeaderText !== headerText;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField onChange={(event) => setHeaderText(event.target.value)} value={headerText} />
      <Box display="flex" flexDirection="row" gap={1}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" onClick={handleClose} disabled={!canSubmit}>Confirm</Button>
      </Box>
    </Box>
  )
}

export default MediaHeaderForm;