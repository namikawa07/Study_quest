class DeleteUser < ActiveRecord::Migration[5.2]
  def change
    drop_table :User
  end
end
