class MatchingController < ApplicationController
  def index
    # http://railsdoc.com/references/pluck
    # pluck とは任意のカラムの配列を取得する
    # モデル.pluck(カラム名)
    # Reactionモデルから自分をいいねしたuser_idを配列で取得
    got_reaction_user_ids =
    Reaction.where(
      to_user_id: current_user.id,
      status: 'like'
      ).pluck(:from_user_id)

    # Reactionモデルからfrom_user_idは自分
    # to_user_idは自分をいいねしたユーザーの配列とマッチする
    # 上記に条件が適したReactionオブジェクトからto_user（Userオブジェクト）を取得
    @match_users =
    Reaction.where(
      to_user_id: got_reaction_user_ids,
      from_user_id: current_user.id,
      status: 'like'
     ).map(&:to_user)
  end
end
