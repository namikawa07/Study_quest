class User < ApplicationRecord
  authenticates_with_sorcery!
  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  has_many :missions, dependent: :destroy
  has_one_attached :icon
  
  def avatar(version = :origin)
    command = case version
              when :icon
                if !icon.attached? || icon.metadata.blank?
                  return '/images/avatar2.png'
                else
                  return icon.variant(resize:'100x100').processed
                end
              when :small_icon
                if !icon.attached? || icon.metadata.blank?
                  return '/images/avatar2.png'
                else
                  return icon.variant(resize:'40x40').processed
                end
              when :edit_icon
                if !icon.attached? || icon.metadata.blank?
                  return '/images/avatar2.png'
                else
                  return icon.variant(resize:'70x70').processed
                end
              else
                false
              end
  end
end
