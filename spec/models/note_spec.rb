require 'rails_helper'

RSpec.describe Note, type: :model do
  let(:task) { create(:task) }
  it 'タイトルがある場合、有効である' do
    note = Note.new(title: 'test_title')
    expect(task).to be_valid
  end
  it 'タイトルがない場合、無効である' do
    note = Note.new(title: nil)
    note.valid?
    expect(note.errors[:title]).to include('を入力してください')
  end
end
