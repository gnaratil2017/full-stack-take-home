import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useUpdateChatroomDescriptionMutation } from "~src/codegen/graphql";

export type DescriptionFormProps = {
  chatroomId: string;
  description?: string;
  handleClose(): void;
};

export const DescriptionForm: React.FC<DescriptionFormProps> = ({
  chatroomId,
  description,
  handleClose,
}) => {
  const initialDescription = useRef(description).current
  const [descriptionValue, setDescriptionValue] = useState(description);

  const [updateChatroomDescription, { loading }] = useUpdateChatroomDescriptionMutation();

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDescriptionValue(event.target.value)
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    await updateChatroomDescription({ variables: { chatroomId, newDescription: descriptionValue } });

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="description"
        value={descriptionValue}
        onChange={handleTextChange}
        maxRows={5}
        fullWidth
        multiline
        autoFocus
      />

      <Box display="flex" justifyContent="flex-end" marginTop={4} gap={1}>
        <Button
          size="small"
          variant="text"
          color="primary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          disabled={descriptionValue === initialDescription}
          startIcon={
            loading ? (
              <CircularProgress color="inherit" size="1em" />
            ) : null
          }
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

