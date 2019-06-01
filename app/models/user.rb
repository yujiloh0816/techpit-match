class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :img_name, ImgNameUploader
  # ToDo enumを英語で登録して、日本語変換する
  # https://kimuraysp.hatenablog.com/entry/2016/05/19/233144
  enum sex: { 男: 0, 女: 1 }
end
