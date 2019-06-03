// window. とは JavaScriptの大元のobjectのこと
// 参考 https://wp-p.info/tpl_rep.php?cat=js-application&fl=r9
// location.pathname …… 現在ページURLのパス名を参照する
// 参考 http://www.htmq.com/js/location_pathname.shtml
// .testメソッド とは regexObj.test(str)
// 正規表現と指定した文字列に一致するものがあった場合は、true。そうでない場合は、false。
// 注 /chat/は正規表現
if(/chat/.test(window.location.pathname)) {
  // 戻り値 ["","chat",":id"]
  var path = window.location.pathname.split('/');
  // room_id は path.lengthで配列の数が数える、最後の配列の要素を取り出すには配列の個数から -1 をする
  var room_id = path[path.length - 1];
  // cable.jsで Rails ActionCableが色々してくれる。
  // とりあえず、開きたいsubscriptionsを作成する
  // サブスクライバーの情報は、
  // channelはChatRoomChannelでその中のroom_idは上のコードで渡される数字
  //
  // jsonで対応できるようにkey: valueの形式で記載されている
  // value で function()を記載 function名は省略
  // そのため.key()でfunction()を呼び出し
  // 仮にfunction名をつけると.key.function_name()と冗長的になる。
  App.chat_room = App.cable.subscriptions.create({
    channel: "ChatRoomChannel",
    room_id: room_id
  },
  {
    // subscriptionsに色々追加
    // デフォルト以外に必要な情報を追加
    //
    // 下がsubscriptionsの内容
    // cable>subscriptions>subscriptions>[:id]>
    //   connected: ƒ ()
    //   consumer: Consumer {url: "ws://localhost:3000/cable", subscriptions: Subscriptions, connection: Connection}
    //   disconnected: ƒ ()
    //   identifier: "{"channel":"ChatRoomChannel","room_id":"1"}"
    //   received: ƒ (data)
    //   speak: ƒ (message)
    //   __proto__: Object

    connected: function() {},
    disconnected: function() {},
    // 受け取ったときのアクション

    // 引数dataの['content']を.messagesの最後に追加する
    // <div class="messagesArea messages">
    //   <%= render @chat_messages %>
    // </div>

    // data['content']の中身は下 注文字列
    // 中身はapp/channel/chat_room_channel.rbのspeakメソッドから渡される情報
    // <div class="message">
    //    <span>オリバー:</span>
    //    <div class="commonMessage">
    //      <div>ほげほげ</div>
    //    </div>
    // </div>
    received: function(data) {
      $('.messages').append(data['content']);
    },

    // 送信したときのアクション
    //
    speak: function(message) {
      console.log("speak1")
      // 'speak'でapp/channel/chat_room_channel.rbのspeakメソッドを発火させる。
      // perform(action, data) を実行すると ChatRoomChannel[:action] が呼ばれる。
      return this.perform('speak', {
        // messageはspeak(event.target.value)の引数
        message: message,
        room_id: room_id,
        // headerに入れてるmetaタグから情報から取得
        user_id: $('meta[name="current_user_id"]').attr('content')
      });
    }
  });

// 対象要素.on(
// イベント名, keypress
// セレクタ,
// データ, '[data-behavior~=room_speaker]'からroom_speakerを取得
// ,関数
// )
//
// keypressイベント
// $("[ 属性 ~= '値' ]")
// <input type="text" data-behavior="room_speaker" class="messageInputForm_input" placeholder="メッセージを入力...">
  $(document).on('keypress', '[data-behavior~=room_speaker]',
  function(event) {
    // 13 はenter_keyの割当数字
    if (event.keyCode === 13) {
      console.log("speak2")
      // speak: function(message)
      // event.target.value は 入力したvalue
      App.chat_room.speak(event.target.value);
      console.log("speak3")
      // event.target.value(入力したvalue)内容を空にする
      event.target.value = '';
      return event.preventDefault();
    }
  });
}
