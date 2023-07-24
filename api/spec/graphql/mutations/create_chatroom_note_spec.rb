require "rails_helper"

RSpec.describe "Mutations::CreateChatroomNote", type: :request do
  let(:chatroom) { create(:chatroom) }
  let(:chatroom_id) { chatroom.id }
  let(:content) { "A chatroom note" }

  let(:variables) do
    {
      chatroomId: chatroom_id,
      content:,
    }.to_json
  end

  let(:query) do
    <<~GQL
      mutation CreateChatroomNote(
        $chatroomId: ID!
        $content: String!
      ) {
        createChatroomNote(
          input: {
            chatroomId: $chatroomId
            content: $content
          }
        ) {
          chatroomNote {
            id
            content
            chatroom {
              id
              label
              description
              callerPhoneNumber
              natureCode {
                id
                name
              }
            }
            createdAt
          }
        }
      }      
    GQL
  end

  it "creates a new chatroom note" do
    expect { post '/graphql', params: { query:, variables: } }.to change { ChatroomNote.count }.from(0).to(1)

    response_json = JSON.parse(response.body)

    note = ChatroomNote.find(response_json['data']['createChatroomNote']['chatroomNote']['id'])
    
    expect(note).to be_truthy
    expect(note.chatroom_id).to eq(chatroom_id)
    expect(note.content).to eq(content)
  end

  context "when required fields are not provided" do
    let(:chatroom_id) { nil }
    let(:content) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { ChatroomNote.count }

      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end
