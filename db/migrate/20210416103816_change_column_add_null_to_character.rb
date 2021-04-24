class ChangeColumnAddNullToCharacter < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :character, :integer, null: false
  end
end
