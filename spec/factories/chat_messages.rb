FactoryBot.define do
  factory :chat_message do
    chat_room_id { 1 }
    user_id { 1 }
    message { "MyString" }
  end
end
