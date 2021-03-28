class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :detail
      t.integer :status, null: false, default: 0
      t.references :mission, foreign_key: true

      t.timestamps
    end
  end
end
