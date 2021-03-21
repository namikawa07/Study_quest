class SorceryCore < ActiveRecord::Migration[5.0]
  def change
    create_table :User do |t|
      t.string :name,             null: false
      t.string :email,            null: false
      t.string :crypted_password
      t.string :salt

      t.timestamps                null: false
    end

    add_index :User, :email, unique: true
  end
end
