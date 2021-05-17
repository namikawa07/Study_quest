require 'rails_helper'

RSpec.describe Contact, type: :model do
  it '名前、メールアドレスがある場合、有効である' do
    contact = Contact.new(name: 'test_title',
                          email: 'test_email@example.com')
    expect(contact).to be_valid
  end
  it '名前がない場合、無効である' do
    contact = Contact.new(name: nil,
                          email: 'test_email@example.com')
    contact.valid?
    expect(contact.errors[:name]).to include('を入力してください')
  end
  it 'メールアドレスがない場合、無効である' do
    contact = Contact.new(name: 'test_title',
                          email: nil)
    contact.valid?
    expect(contact.errors[:email]).to include('を入力してください')
  end
end
