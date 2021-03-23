class CreateMissions < ActiveRecord::Migration[5.2]
  def change
    create_table :missions do |t|
      t.string :title, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.text :memo
      t.integer :status, null: false, default: 0
      t.integer :registration, null: false, default: 0

      t.timestamps
    end
  end
end
