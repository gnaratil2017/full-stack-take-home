import { Reference } from "@apollo/client";
import { ChatroomNotesDocument, useDeleteChatroomNoteMutation } from "~src/codegen/graphql";

export function useDeleteChatroomNote(chatroomId: string) {
  return useDeleteChatroomNoteMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          chatroomNotes(existingNoteRefs: Reference[] = [], { storeFieldName, readField }) {
            if (!data?.deleteChatroomNote) return existingNoteRefs

            if (storeFieldName === `chatroomNotes({"chatroomId":"${chatroomId}"})`) {
              const deletedNoteId = data.deleteChatroomNote.chatroomNote.id

              return existingNoteRefs.filter(ref => readField('id', ref) !== deletedNoteId)
            }

            return existingNoteRefs
          }
        }
      })
    },
    onQueryUpdated(observableQuery) {
      if (observableQuery.variables?.chatroomId === chatroomId) {
        return observableQuery.refetch()
      }
    },
    refetchQueries: [{ query: ChatroomNotesDocument, variables: { chatroomId }}],
  })
}
