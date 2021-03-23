require 'rails_helper'

RSpec.describe "ユーザーの新規登録", type: :system do
  before do
    visit new_users_path
  end
  context 'フォームの入力値が正常' do
    it 'ユーザーの新規登録が成功する' do
      expect {
        fill_in 'User name', with: 'test_name'
        fill_in 'Email', with: 'test_email@example.com'
        fill_in 'Password', with: 'test_password'
        fill_in 'Password confirmation', with: 'test_password'
        click_button 'SIGNUP'
      }.to change { User.count }.by(1)
      expect(page).to have_content('新規登録が完了しました'),
      'フラッシュメッセージ「新規登録が完了しました」が表示されていません'
    end
  end
  
  context 'メールアドレスが未記入' do
    it 'ユーザーの新規登録が失敗する' do
      expect {
        fill_in 'User name', with: 'test_name'
        fill_in 'Email', with: nil
        fill_in 'Password', with: 'test_password'
        fill_in 'Password confirmation', with: 'test_password'
        click_button 'SIGNUP'
      }.to change { User.count }.by(0)
      expect(page).to have_content('新規登録できませんでした')
      'フラッシュメッセージ「新規登録できませんでした」が表示されていません'
      expect(page).to have_content('メールアドレスを入力してください')
      'エラーメッセージ「メールアドレスを入力してください」が表示されていません'
    end
  end
    
  context 'メールアドレスが登録済み' do
    let(:user) { create(:user) }
    it 'ユーザーの新規登録が失敗する' do
      fill_in 'User name', with: 'test_name_2'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'test_password'
      fill_in 'Password confirmation', with: 'test_password'
      click_button 'SIGNUP'
      expect(page).to have_content('新規登録できませんでした')
      'フラッシュメッセージ「新規登録できませんでした」が表示されていません'
      expect(page).to have_content('メールアドレスはすでに存在します')
      'エラーメッセージ「メールアドレスはすでに存在します」が表示されていません'
    end
  end
  
  context 'パスワードと確認パスワードが違う' do
    it 'ユーザーの新規登録が失敗する' do
      fill_in 'User name', with: 'test_name'
      fill_in 'Email', with: 'test_email@example.com'
      fill_in 'Password', with: 'test_password'
      fill_in 'Password confirmation', with: 'another_test_password'
      click_button 'SIGNUP'
      expect(page).to have_content('新規登録できませんでした')
      'フラッシュメッセージ「新規登録できませんでした」が表示されていません'
      expect(page).to have_content('確認用パスワードとパスワードの入力が一致しません')
      'エラーメッセージ「確認用パスワードとパスワードの入力が一致しません」が表示されていません'
    end
  end
  
  context 'メールアドレスのフォーマットが違う場合' do
    it 'ユーザーの新規登録が失敗する' do
      fill_in 'User name', with: 'test_name'
      fill_in 'Email', with: 'test_email'
      fill_in 'Password', with: 'test_password'
      fill_in 'Password confirmation', with: 'test_password'
      click_button 'SIGNUP'
      expect(page).to have_content('新規登録できませんでした')
      'フラッシュメッセージ「新規登録できませんでした」が表示されていません'
      expect(page).to have_content('メールアドレスは不正な値です')
      'エラーメッセージ「メールアドレスは不正な値です」が表示されていません'
    end
  end
end
