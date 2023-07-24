module Mutations
  class CreateChatroomNote < BaseMutation
    argument :chatroom_id, ID, required: true
    argument :content, String, required: true

    # fields
    field :chatroom_note, Types::ChatroomNoteType, null: false

    # resolver
    def resolve(chatroom_id:, content:)
      chatroom = Chatroom.find(chatroom_id)
      chatroom_note = chatroom.chatroom_notes.create(content: content.strip)
      
      {
        chatroom_note: chatroom_note
      }
    end
  end
end
