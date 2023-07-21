import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
  const [toggleChatroomResolved, { loading }] = useToggleChatroomResolved()

  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    await toggleChatroomResolved({ variables: { chatroomId, resolved: !resolved } });
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={resolved ? 'Unresolve' : 'Resolve'}>
        <IconButton onClick={() => setOpen(true)}>
          {resolved ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to mark this chatroom as ${resolved ? 'unresolved' : 'resolved'}?`}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
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
