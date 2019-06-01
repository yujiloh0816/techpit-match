// changeは要素の内容が変更された時のイベント
// つまり、下のfieldにファイルが追加され要素が変更されたときにイベント発火
// <%= f.file_field :img_name, id: "file_photo" %>
$(document).on("change", "#file_photo", function(e) {
  var reader;
  // e.target.files.length
  // e = evnetの要素 を targetメソッドでDOM要素の取得
  // filesメソッドでe.targetで取得した中のFiles要素を取得
  // lengthメソッドで数を確認 0以上ならtrue
  if (e.target.files.length) {

    // FileReader オブジェクトを使うと、ユーザーのコンピューター内にあるファイル (もしくはバッファ上の生データ) をウェブアプリケーションから非同期的に読み込むことが出来ます
    // FileReader オブジェクトをnewしてreader変数に代入
    reader = new FileReader;

    // FileReader.onload プロパティ とは
    // readAsArrayBuffer や readAsBinaryString、 readAsDataURL、readAsText でのコンテンツ読み込みが完了して、利用可能になると発火する load イベント時に実行されるイベントハンドラを含みます
    reader.onload = function(e) {
      var userThumbnail;
      // getElementByIdは、任意のHTMLタグで指定したIDにマッチするドキュメント要素を取得するメソッド
      // documentメソッドでHTMLの要素を取得し
      // getElementById('thumbnail')メソッドでid="thumbnail"にマッチする下の要素を取得
      // <img id="thumbnail" class="userImgPreview_content" src="">
      // それをuserThumbnail変数に代入
      userThumbnail = document.getElementById('thumbnail');
      // addClassメソッドで下のコードのclassに"is-active"を追加
      // <div class="userImgPreview" id="userImgPreview">
      // 下の.scssファイルでis-activeであれば表示、なければ非表示の設定
      // .userImgPreview {
      //   margin: 0 auto;
      //   display: none;
      //   text-align: center;
      //   &.is-active {
      //     display: block;
      //   }
      $("#userImgPreview").addClass("is-active");
      // element.setAttribute(name,value);メソッド とは
      // 指定の要素に新しい属性を追加します。または指定の要素に存在する属性の値を変更します。
      // userThumbnail = <img id="thumbnail" class="userImgPreview_content" src="">
      // srcの属性にe.target.resultの値を入れる

      userThumbnail.setAttribute('src', e.target.result);
    };
    // readAsDataURL メソッドは、指定された Blob ないし File オブジェクトを読み込むために使用します。読込処理が終了すると readyState は DONE に変わり、 loadend イベントが生じます。それと同時に result プロパティにはファイルのデータを表す、base64 エンコーディングされた data: URL の文字列が格納されます。
    // e.target.files[0] files[0]は配列の1つ目を意味している。
    // 下の行が実行されて、reader.onload = function(e) が発火する。
    return reader.readAsDataURL(e.target.files[0]);
  }
});
