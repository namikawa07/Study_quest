require 'rails_helper'

RSpec.describe "ユーザーの新規登録", type: :system do
  before do
    visit new_users_path
  end
  context 'フォームの入力値が正常' do
    it 'ユーザーの新規登録が成功する' do
        fill_in 'User name', with: 'test_name'
        fill_in 'Email', with: 'test_email@example.com'
        fill_in 'Password', with: 'test_password'
        fill_in 'Password confirmation', with: 'test_password'
      expect do
        click_button 'SIGN UP'
        sleep 3
      end.to change { User.count }.by(1)
      expect(page).to have_content('新規登録が完了しました'),
      'フラッシュメッセージ「新規登録が完了しました」が表示されていません'
      expect(page).to have_current_path(users_path)
      'Mypage画面へ飛んでいません'
    end
  end
  
  context 'メールアドレスが未記入' do
    it 'ユーザーの新規登録が失敗する' do
      expect {
        fill_in 'User name', with: 'test_name'
        fill_in 'Email', with: nil
        fill_in 'Password', with: 'test_password'
        fill_in 'Password confirmation', with: 'test_password'
        click_button 'SIGN UP'
      }.to change { User.count }.by(0)
      expect(page).to have_content('メールアドレスを入力して下さい')
      'エラーメッセージ「メールアドレスを入力してください」が表示されていません'
      expect(page).to have_current_path(new_users_path)
    end
  end
    
  context 'メールアドレスが登録済み' do
    let(:user) { create(:user) }
    it 'ユーザーの新規登録が失敗する' do
      fill_in 'User name', with: 'test_name_2'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'test_password'
      fill_in 'Password confirmation', with: 'test_password'
      click_button 'SIGN UP'
      expect(page).to have_content('メールアドレスはすでに存在します')
      'エラーメッセージ「メールアドレスはすでに存在します」が表示されていません'
      expect(page).to have_current_path(new_users_path)
    end
  end
  
  context 'パスワードと確認パスワードが違う' do
    it 'ユーザーの新規登録が失敗する' do
      fill_in 'User name', with: 'test_name'
      fill_in 'Email', with: 'test_email@example.com'
      fill_in 'Password', with: 'test_password'
      fill_in 'Password confirmation', with: 'another_test_password'
      click_button 'SIGN UP'
      expect(page).to have_content('確認用パスワードがパスワードと一致しません')
      'エラーメッセージ「確認用パスワードがパスワードと一致しません」が表示されていません'
      expect(page).to have_current_path(new_users_path)
    end
  end
  
  context 'メールアドレスのフォーマットが違う場合' do
    it 'ユーザーの新規登録が失敗する' do
      fill_in 'User name', with: 'test_name'
      fill_in 'Email', with: 'test_email'
      fill_in 'Password', with: 'test_password'
      fill_in 'Password confirmation', with: 'test_password'
      click_button 'SIGN UP'
      expect(page).to have_content('メールアドレスの形式で入力してください')
      'エラーメッセージ「メールアドレスの形式で入力してください」が表示されていません'
      expect(page).to have_current_path(new_users_path)
    end
  end
  
  context '全て未記入の場合' do
    it 'ユーザーの新規登録が失敗する' do
      click_button 'SIGN UP'
      expect(page).to have_content('名前を入力して下さい')
      'エラーメッセージ「名前を入力して下さい」が表示されていません'
      expect(page).to have_content('メールアドレスを入力して下さい')
      'エラーメッセージ「メールアドレスを入力して下さい」が表示されていません'
      expect(page).to have_content('パスワードを入力して下さい')
      'エラーメッセージ「パスワードを入力して下さい」が表示されていません'
      expect(page).to have_content('メールアドレスを入力して下さい')
      'エラーメッセージ「確認用パスワードを入力して下さい」が表示されていません'
      expect(page).to have_current_path(new_users_path)
    end
  end
end
