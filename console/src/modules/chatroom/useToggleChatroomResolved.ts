import { Reference } from "@apollo/client";
import {
  ArchivedChatroomsListDocument,
  ChatroomDataFragmentDoc,
  ChatroomsListDocument,
  useToggleChatroomResolvedMutation,
} from "~src/codegen/graphql";

export function useToggleChatroomResolved() {
  return useToggleChatroomResolvedMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          chatrooms(existingChatroomRefs: Reference[] = [], { storeFieldName, readField }) {
            if (!data?.toggleChatroomResolved) return existingChatroomRefs

            const updatedChatroom = data.toggleChatroomResolved.chatroom

            const updatedChatroomRef = cache.writeFragment({
              data: updatedChatroom,
              fragment: ChatroomDataFragmentDoc,
              fragmentName: 'ChatroomData',
            })

            if (!updatedChatroomRef) return existingChatroomRefs

            const listWithUpdatedRef = existingChatroomRefs.some(
              ref => readField('id', ref) === updatedChatroom.id,
            ) ? existingChatroomRefs : [updatedChatroomRef, ...existingChatroomRefs]

            const listWithoutUpdatedRef = existingChatroomRefs.filter(
              ref => readField('id', ref) !== updatedChatroom.id,
            )

            if (storeFieldName === 'chatrooms({"resolved":true})') {
              if (updatedChatroom.resolved) {
                return listWithUpdatedRef
              } else {
                return listWithoutUpdatedRef
              }
            }

            if (storeFieldName === 'chatrooms') {
              if (updatedChatroom.resolved) {
                return listWithoutUpdatedRef
              } else {
                return listWithUpdatedRef
              }
            }

            return existingChatroomRefs
          }
        }
      })
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch()
    },
    refetchQueries: [ChatroomsListDocument, ArchivedChatroomsListDocument],
  })
}
