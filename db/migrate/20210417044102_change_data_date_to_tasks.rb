class ChangeDataDateToTasks < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :start_date, :date
    change_column :tasks, :end_date, :date
  end
end
