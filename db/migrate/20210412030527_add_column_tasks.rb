class AddColumnTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :start_date, :datetime
    add_column :tasks, :end_date, :datetime
  end
end
