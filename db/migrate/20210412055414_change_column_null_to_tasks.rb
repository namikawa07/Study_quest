class ChangeColumnNullToTasks < ActiveRecord::Migration[5.2]
  def up
    change_column :tasks, :task_date, :integer, null: true, default: 0
  end

  def down
    change_column :tasks, :task_date, :integer, null: false, default: 0
  end
end
