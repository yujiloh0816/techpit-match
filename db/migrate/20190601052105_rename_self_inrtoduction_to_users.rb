class RenameSelfInrtoductionToUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :self_inrtoduction, :self_introduction
  end
end
