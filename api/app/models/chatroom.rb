class Chatroom < ApplicationRecord
  belongs_to :nature_code, optional: true
  has_many :chatroom_notes, dependent: :destroy
end
