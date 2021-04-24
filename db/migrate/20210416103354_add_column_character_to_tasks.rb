class AddColumnCharacterToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :character, :integer
  end
end
