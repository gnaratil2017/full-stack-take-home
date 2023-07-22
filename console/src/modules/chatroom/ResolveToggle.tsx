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
  resolved: boolean;
};

export const ResolveToggle: React.FC<ResolveToggleProps> = ({
  chatroomId,
  resolved,
}) => {
  const [open, setOpen] = useState(false);
  const [toggleChatroomResolved, { loading, error, reset }] = useToggleChatroomResolved();

  const handleClose = () => {
    setOpen(false);
    reset();
  }

  const handleConfirm = () => {
    toggleChatroomResolved({
      variables: { chatroomId, resolved: !resolved },
      onCompleted: handleClose,
    });
  };

  return (
    <>
      <Tooltip title={resolved ? 'Unresolve' : 'Resolve'}>
        <IconButton onClick={() => setOpen(true)}>
          {resolved ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        {error && <Alert severity="error">We're sorry, something went wrong. Please try again.</Alert>}

        <DialogTitle>
          {resolved ? 'Unresolve chatroom?' : 'Resolve chatroom?'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to mark this chatroom as ${resolved ? 'unresolved' : 'resolved'}?`}
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
