module Types
  class ChatroomNoteType < Types::BaseObject
    field :id, ID, null: false
    field :content, String, null: false
    field :chatroom, Types::ChatroomType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end