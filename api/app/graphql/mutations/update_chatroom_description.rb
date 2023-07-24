module Mutations
  class UpdateChatroomDescription < BaseMutation
    argument :chatroom_id, ID, required: true
    argument :new_description, String, required: false

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(chatroom_id:, new_description: nil)
      chatroom = Chatroom.find(chatroom_id)
      chatroom.update(description: new_description)
      
      {
        chatroom: chatroom
      }
    end
  end
end
