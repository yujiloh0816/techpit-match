class ChatRoomChannel < ApplicationCable::Channel
  # コンシューマーがこのチャネルのサブスクライバ側になると
  # このコードが呼び出される
  def subscribed
    # ストリーム（stream）は、ブロードキャストでパブリッシュするコンテンツをサブスクライバ側にルーティングする機能をチャネルに提供します。
    # http://laithazer.com/blog/2017/03/25/rails-actioncable-stream-for-vs-stream-from/
    # stream_from: expects a string
    # stream_for: expects an object
    stream_from "chat_room_#{params[:room_id]}"
    # stream_for "chat_room_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # return this.perform('speak', {.... のフロントのアクションがトリガー
  def speak(data)
    message = ChatMessage.create(
      chat_room_id: data['room_id'],
      user_id: data['user_id'],
      message: data['message']
    )
    # broadcastとbroadcast_toの違いは？
    # broadcastではエラー
    # broadcast_toでchat_room_#{}に返して
    # サブスクライバーに届く
    ChatRoomChannel.broadcast_to(
      "chat_room_#{data['room_id']}",
      content: render_message(message)
    )
  end

  private
    def render_message(message)
      ApplicationController.renderer.render(
        partial: 'chat_messages/chat_message',
        locals: { chat_message: message }
      )
    end

end
