require "rails_helper"

RSpec.describe "Mutations::ToggleChatroomResolved", type: :request do  
  let!(:existing_chatroom) { create(:chatroom, resolved: false) }

  let(:chatroom_id) { existing_chatroom.id }
  let(:resolved_param) { true }

  let(:variables) do
    {
      chatroomId: chatroom_id,
      resolved: resolved_param,
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation ToggleChatroomResolved(
        $chatroomId: ID!
        $resolved: Boolean!
      ) {
        toggleChatroomResolved(
          input: {
            chatroomId: $chatroomId
            resolved: $resolved
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

  it "updates the chatroom's resolved field" do
    expect { post '/graphql', params: { query:, variables: } }
      .to change { Chatroom.first.resolved }.from(false).to(true)

    response_json = JSON.parse(response.body)

    chatroom = Chatroom.find(response_json['data']['toggleChatroomResolved']['chatroom']['id'])
    
    expect(chatroom).to be_truthy
    expect(chatroom.resolved).to eq(true)
  end

  context "when required fields are not provided" do
    let(:chatroom_id) { nil }
    let(:resolved) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }
        .to_not change { Chatroom.first.resolved }.from(false)
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end
