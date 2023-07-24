module Mutations
  class ToggleChatroomResolved < BaseMutation
    argument :chatroom_id, ID, required: true
    argument :resolved, Boolean, required: true

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(chatroom_id:, resolved:)
      chatroom = Chatroom.find(chatroom_id)
      chatroom.update(resolved:)
      
      {
        chatroom: chatroom
      }
    end
  end
end
