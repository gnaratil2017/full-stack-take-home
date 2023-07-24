require "rails_helper"

RSpec.describe "Mutations::UpdateChatroomDescription", type: :request do  
  let!(:existing_chatroom) { create(:chatroom, description: 'Old description') }

  let(:chatroom_id) { existing_chatroom.id }
  let(:new_description) { 'New description' }

  let(:variables) do
    {
      chatroomId: chatroom_id,
      newDescription: new_description,
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation UpdateChatroomDescription(
        $chatroomId: ID!
        $newDescription: String
      ) {
        updateChatroomDescription(
          input: {
            chatroomId: $chatroomId
            newDescription: $newDescription
          }
        ) {
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
        }
      }
    GQL
  end

  it "updates the chatroom's description" do
    expect { post '/graphql', params: { query:, variables: } }
      .to change { Chatroom.first.description }.from('Old description').to(new_description)

    response_json = JSON.parse(response.body)

    chatroom = Chatroom.find(response_json['data']['updateChatroomDescription']['chatroom']['id'])
    
    expect(chatroom).to be_truthy
    expect(chatroom.description).to eq(new_description)
  end

  context "when required fields are not provided" do
    let(:chatroom_id) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }
        .to_not change { Chatroom.first.description }.from('Old description')
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end
