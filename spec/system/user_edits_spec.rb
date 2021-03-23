require 'rails_helper'

RSpec.describe "ユーザー編集機能", type: :system do
  let(:user) { create(:user) }
  before do
    login user
  end
  
  describe 'フォームの入力値が正常' do
    it 'ユーザーの編集が成功する' do
    end
  end
  
  describe '名前を空白で更新' do
  end


end
