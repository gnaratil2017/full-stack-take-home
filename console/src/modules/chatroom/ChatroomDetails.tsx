import { Edit } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { DescriptionForm } from "./DescriptionForm";
import { useState } from "react";
import { ChatroomDataFragment } from "~src/codegen/graphql";
import { NotesSection } from "./chatroomNotes";

export type ChatroomDetailsProps = {
  chatroom: ChatroomDataFragment;
};

export const ChatroomDetails: React.FC<ChatroomDetailsProps> = ({
  chatroom,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <Box display="flex" alignItems="center" gap={0.5} sx={{ height: 45 }}>
          <Typography variant="body1">Description</Typography>

          {!isEditing && (
            <IconButton onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
          )}
        </Box>

        {isEditing ? (
          <DescriptionForm
            chatroomId={chatroom.id}
            description={chatroom.description ?? undefined}
            handleClose={() => setIsEditing(false)}
          />
        ) : (
          <Typography variant="body2">{chatroom.description ?? "No description provided."}</Typography>
        )}
      </Card>

      <Card sx={{ padding: 2, marginTop: 1 }}>
        <NotesSection chatroomId={chatroom.id} />
      </Card>
    </>
  );
};
