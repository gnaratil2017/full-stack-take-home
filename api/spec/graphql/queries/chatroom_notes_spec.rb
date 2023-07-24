require "rails_helper"

RSpec.describe "ChatroomNotes", type: :request do
  let(:chatroom) { create(:chatroom) }
  let(:chatroom_id) { chatroom.id }

  let!(:notes_for_chatroom) { create_list(:chatroom_note, 3, chatroom:) }
  let!(:other_notes) { create_list(:chatroom_note, 2) }

  let(:variables) { { chatroomId: chatroom_id }.to_json }
  
  let(:query) do
    <<~GQL
      query ChatroomNotes($chatroomId: ID!) {
        chatroomNotes(chatroomId: $chatroomId) {
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
    GQL
  end
    
  it "returns chatroom notes for the specified chatroom" do
    post '/graphql', params: { query:, variables: }

    response_json = JSON.parse(response.body)
    response_note_ids = response_json['data']['chatroomNotes'].map { |note| note['id'] }
    response_notes = ChatroomNote.where(id: response_note_ids)
    
    expect(response_notes.count).to eq(notes_for_chatroom.count)
    expect(response_notes).to all(have_attributes(chatroom_id: chatroom.id))
  end

  context "when a chatroom id is not provided" do
    let(:chatroom_id) { nil }

    it "returns an error" do
      post '/graphql', params: { query:, variables: }

      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end
