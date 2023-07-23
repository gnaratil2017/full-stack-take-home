module Mutations
  class DeleteChatroomNote < BaseMutation
    argument :note_id, ID, required: true

    # fields
    field :chatroom_note, Types::ChatroomNoteType, null: false

    # resolver
    def resolve(note_id:)
      chatroom_note = ChatroomNote.find(note_id)
      chatroom_note.destroy
      
      {
        chatroom_note: chatroom_note
      }
    end
  end
end
