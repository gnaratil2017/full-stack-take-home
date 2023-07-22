module Types
  class MutationType < Types::BaseObject
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :update_chatroom_description, mutation: Mutations::UpdateChatroomDescription
    field :toggle_chatroom_resolved, mutation: Mutations::ToggleChatroomResolved
    field :create_chatroom_note, mutation: Mutations::CreateChatroomNote
  end
end
