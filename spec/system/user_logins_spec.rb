require 'rails_helper'

RSpec.describe 'ログイン機能', type: :system do
  let(:user) { create(:user) }
  before do
    visit login_path
  end

  context 'フォームの入力値が正常' do
    it 'ユーザーのログインが成功する' do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'test_password'
      click_button 'LOGIN'
      expect(page).to have_content('ログインしました'),
                      'フラッシュメッセージ「ログインしました」が表示されていません'
    end
  end

  context '間違ったメールアドレスを記入' do
    it 'ユーザーのログインが失敗する' do
      fill_in 'Email', with: 'another_user_email@example.com'
      fill_in 'Password', with: 'test_password'
      click_button 'LOGIN'
      expect(page).to have_content('ログインに失敗しました'),
                      'フラッシュメッセージ「ログインに失敗しました」が表示されていません'
    end
  end

  context '間違ったパスワードを記入' do
    it 'ユーザーのログインが失敗する' do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'another_user_password'
      click_button 'LOGIN'
      expect(page).to have_content('ログインに失敗しました'),
                      'フラッシュメッセージ「ログインに失敗しました」が表示されていません'
    end
  end
end
