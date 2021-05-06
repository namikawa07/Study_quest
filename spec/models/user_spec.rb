require 'rails_helper'

RSpec.describe User, type: :model do

  it "名前、メール、パスワードがある場合、有効である" do
    user = User.new( name: "test_name",
                     email: "testemail@example.com",
                     password: "password",
                     password_confirmation: "password",
                   )
    expect(user).to be_valid
  end
  it "名がない場合、無効である" do
    user = User.new( name: nil,
                     email: "testemail@example.com",
                     password: "password",
                     password_confirmation: "password",
                    )
    user.valid?
    expect(user.errors[:name]).to include("を入力してください")
  end
  it "メールアドレスがない場合、無効である" do
    user = User.new( name: "test_name",
                     email: nil,
                     password: "password",
                     password_confirmation: "password",
                      )
    user.valid?
    expect(user.errors[:email]).to include("を入力してください")
    end
  it "重複したメールアドレスの場合、無効である" do
    user_1 = User.new( name: "test_name",
                       email: "testemail@example.com",
                       password: "password",
                       password_confirmation: "password",
                     )
    user_1.save
    user_2 = User.new( name: "test_name",
                       email: "testemail@example.com",
                       password: "password",
                       password_confirmation: "password",
                     )
    user_2.valid?
    expect(user_2.errors[:email]).to include("はすでに存在します")
  end
  it "パスワードがない場合、無効である" do
    user = User.new( name: "test_name",
                     email: "testemail@example.com",
                     password: nil,
                     password_confirmation: nil,
                   )
    user.valid?
    expect(user.errors[:password]).to include("は3文字以上で入力してください")
  end
  it "確認用パスワードがパスワードと一致しない場合、無効である" do
    user = User.new( name: "test_name",
                     email: "testemail@example.com",
                     password: "password",
                     password_confirmation: "another_password",
                   )
    user.valid?
    expect(user.errors[:password_confirmation]).to include("とパスワードの入力が一致しません")
  end
end
