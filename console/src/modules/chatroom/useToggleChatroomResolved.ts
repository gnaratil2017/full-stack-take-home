import {
  ArchivedChatroomsListDocument,
  ChatroomDataFragment,
  ChatroomsListDocument,
  useToggleChatroomResolvedMutation,
} from "~src/codegen/graphql";

export function useToggleChatroomResolved() {
  return useToggleChatroomResolvedMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          chatrooms(existingChatrooms: ChatroomDataFragment[] = [], { storeFieldName }) {
            if (!data?.toggleChatroomResolved) return existingChatrooms

            const updatedChatroom = data.toggleChatroomResolved.chatroom

            if (storeFieldName === 'chatrooms({"resolved":true})') {
              if (updatedChatroom.resolved) {
                return [updatedChatroom, ...existingChatrooms]
              } else {
                return existingChatrooms.filter(chatroom => chatroom.id !== updatedChatroom.id)
              }
            }

            if (storeFieldName === 'chatrooms') {
              if (updatedChatroom.resolved) {
                return existingChatrooms.filter(chatroom => chatroom.id !== updatedChatroom.id)
              } else {
                return [updatedChatroom, ...existingChatrooms]
              }
            }
          }
        }
      });
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: [ChatroomsListDocument, ArchivedChatroomsListDocument],
  });
}
