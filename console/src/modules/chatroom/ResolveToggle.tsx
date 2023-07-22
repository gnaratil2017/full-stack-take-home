import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useToggleChatroomResolved } from "./useToggleChatroomResolved";

export type ResolveToggleProps = {
  chatroomId: string;
  isResolved: boolean;
};

export const ResolveToggle: React.FC<ResolveToggleProps> = ({
  chatroomId,
  isResolved,
}) => {
  const [open, setOpen] = useState(false);
  const [toggleChatroomResolved, { loading, error, reset }] = useToggleChatroomResolved();

  const handleClose = () => {
    setOpen(false);
    reset();
  }

  const handleConfirm = () => {
    toggleChatroomResolved({
      variables: { chatroomId, resolved: !isResolved },
      onCompleted: handleClose,
    });
  };

  return (
    <>
      <Tooltip title={isResolved ? 'Unresolve' : 'Resolve'}>
        <IconButton onClick={() => setOpen(true)}>
          {isResolved ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        {error && <Alert severity="error">We're sorry, something went wrong. Please try again.</Alert>}

        <DialogTitle>
          {`${isResolved ? 'Unresolve' : 'Resolve'} chatroom?`}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to mark this chatroom as ${isResolved ? 'unresolved' : 'resolved'}?`}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size="1em" />
              ) : null
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
