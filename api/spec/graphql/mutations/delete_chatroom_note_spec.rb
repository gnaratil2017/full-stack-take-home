require "rails_helper"

RSpec.describe "Mutations::DeleteChatroomNote", type: :request do  
  let!(:chatroom_note) { create(:chatroom_note) }

  let(:note_id) { chatroom_note.id }

  let(:variables) { { noteId: note_id }.to_json }
  
  let(:query) do
    <<~GQL
      mutation DeleteChatroomNote(
        $noteId: ID!
      ) {
        deleteChatroomNote(
          input: {
            noteId: $noteId
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

  it "deletes the note" do
    expect { post '/graphql', params: { query:, variables: } }.to change { ChatroomNote.count }.from(1).to(0)

    response_json = JSON.parse(response.body)

    expect { ChatroomNote.find(response_json['data']['deleteChatroomNote']['chatroomNote']['id']) }
      .to raise_error(ActiveRecord::RecordNotFound)
  end

  context "when required fields are not provided" do
    let(:note_id) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { ChatroomNote.count }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end
