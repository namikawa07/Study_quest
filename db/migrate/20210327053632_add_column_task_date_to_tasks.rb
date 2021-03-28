class AddColumnTaskDateToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :task_date, :integer, default: 0, null: false
  end
end
