FactoryBot.define do
  factory :chatroom_note do
    sequence(:id)
    chatroom
    content { "Chatroom Note Content" }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end
end
