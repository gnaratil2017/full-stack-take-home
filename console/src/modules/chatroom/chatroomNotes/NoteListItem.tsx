import { KeyboardArrowDown, KeyboardArrowUp, NotAccessible } from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, ChatroomNoteDataFragment } from "~src/codegen/graphql";

export type NoteListItemProps = {
  note: ChatroomNoteDataFragment;
};

export const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  return (
    <Typography variant="body2">
      {note.content}
    </Typography>
  )
};
