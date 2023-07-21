import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useNatureCodesQuery } from "~src/codegen/graphql";
import { formatPhoneNumber } from "~src/modules/utils/formatPhoneNumber";

type CreateChatroomFormState = {
  label: string;
  description: string;
  callerPhoneNumber: string;
  natureCodeId: string;
};

const defaultFormState = (): CreateChatroomFormState => ({
  label: "",
  description: "",
  callerPhoneNumber: "",
  natureCodeId: "",
});

const isFormValid = (formState: CreateChatroomFormState): boolean => {
  const hasLabel = formState.label.length > 0;
  const hasPhoneNumber = formState.callerPhoneNumber.length > 0;

  return hasLabel && hasPhoneNumber;
};

export type CreateChatroomFormProps = {
  handleClose: () => void;
  onSubmit: (values: CreateChatroomFormState) => Promise<void>;
};

export const CreateChatroomForm: React.FC<CreateChatroomFormProps> = ({
  handleClose,
  onSubmit,
}) => {
  const natureCodesQuery = useNatureCodesQuery();
  const natureCodes = natureCodesQuery.data?.natureCodes ?? [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] =
    useState<CreateChatroomFormState>(defaultFormState);

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.target.name as keyof CreateChatroomFormState;
    const value = event.target.value;
    const formattedValue =
      name === "callerPhoneNumber" ? formatPhoneNumber(value) : value;

    setValues({ ...values, [name]: formattedValue });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Create Chatroom
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          size="small"
          label="Label"
          name="label"
          value={values.label}
          onChange={handleTextChange}
          autoFocus
        />
        <TextField
          size="small"
          label="Caller Phone Number"
          name="callerPhoneNumber"
          value={values.callerPhoneNumber}
          onChange={handleTextChange}
        />
        <TextField
          size="small"
          label="Description"
          name="description"
          value={values.description}
          onChange={handleTextChange}
          rows={4}
          multiline
        />
        <Select
          size="small"
          name="natureCodeId"
          value={values.natureCodeId}
          onChange={handleSelectChange}
          disabled={natureCodesQuery.loading}
        >
          <MenuItem disabled value="">
            {natureCodesQuery.loading ? "Loading..." : "Select Nature Code"}
          </MenuItem>
          {natureCodes.map((natureCode) => (
            <MenuItem key={natureCode.id} value={natureCode.id}>
              {natureCode.name}
            </MenuItem>
          ))}
        </Select>
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
            disabled={!isFormValid(values)}
            startIcon={
              isSubmitting ? (
                <CircularProgress color="inherit" size="1em" />
              ) : null
            }
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};
