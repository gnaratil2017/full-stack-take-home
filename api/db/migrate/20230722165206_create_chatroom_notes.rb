class CreateChatroomNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :chatroom_notes do |t|
      t.text :content, null: false
      t.references :chatroom, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
