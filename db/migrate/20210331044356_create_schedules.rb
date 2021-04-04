class CreateSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :schedules do |t|
      t.string :title, null: false
      t.date :start_date, null:false
      t.date :end_date, null: false
      t.integer :status, null: false, default: 0
      t.references :mission, foreign_key: true

      t.timestamps
    end
  end
end
