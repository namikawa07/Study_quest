require 'rails_helper'

RSpec.describe 'プロフィールの編集', type: :system, js: true do
  let(:user) { create(:user) }
  before do
    login(user)
  end

  it 'プロフィール画面に名前とアドレスが表示されているか' do
    expect(page).to have_selector '#mypage', text: user.name
    expect(page).to have_selector '#mypage', text: user.email
  end

  describe 'フォームの入力が正常' do
    it 'プロフィールの編集が完了する' do
      click_button 'プロフィール編集'
      fill_in 'user[name]', with: 'another_test_name'
      fill_in 'user[email]', with: 'another_test_email@example.com'
      attach_file '画像を選択', "#{Rails.root}/app/assets/images/test-avatar.png", make_visible: true
      click_button '変更'
      sleep 3
      expect(page).to have_selector '#mypage', text: 'another_test_name'
      '名前が表示されていません'
      expect(page).to have_selector '#mypage', text: 'another_test_email@example.com'
      'メールアドレスが表示されていません'
      expect(page).to have_selector("img[src$='test-avatar.png']")
      'アイコンが設定したアイコンになっていません'
      expect(page).to have_content('ユーザー情報を更新しました')
      'ユーザー情報を更新しましたが表示されていません'
    end
  end

  describe 'フォームの入力が正しくない場合' do
    context '名前が未記入' do
      it 'プロフィール編集が失敗する'  do
        click_button 'プロフィール編集'
        fill_in 'user[name]', with: ''
        click_button '変更'
        expect(page).to have_content('名前を入力して下さい')
        'エラーメッセージ「名前を入力して下さい」が表示されていません'
      end
    end
    context 'メールアドレスが未記入' do
      it 'プロフィール編集が失敗する' do
        click_button 'プロフィール編集'
        fill_in 'user[email]', with: ''
        click_button '変更'
        expect(page).to have_content('メールアドレスを入力して下さい')
        'エラーメッセージ「メールアドレスを入力して下さい」が表示されていません'
      end
    end
    context 'メールアドレスが既存のアドレス' do
      let(:another_user) { create(:user, :another_email) }
      it 'プロフィール編集が失敗する' do
        click_button 'プロフィール編集'
        fill_in 'user[email]', with: another_user.email
        click_button '変更'
        expect( find('#unique_email', visible: false) ).to have_content("メールアドレスはすでに存在します")
        'エラーメッセージ「メールアドレスはすでに存在します」が表示されていません'
      end
    end
  end

  describe 'アイコンについて' do
    context 'アイコン画像を選択しない場合' do
      it '設定していたアイコンがそれぞれの大きさで2つ表示されている' do
        click_button 'プロフィール編集'
        fill_in 'user[name]', with: 'another_test_name'
        fill_in 'user[email]', with: 'another_test_email@example.com'
        click_button '変更'
        expect(page).to have_selector("img[src$='avatar2.png']")
        'アイコンが初期設定のアイコンになっていません'
        expect(page).to have_content('ユーザー情報を更新しました')
        'ユーザー情報を更新しましたが表示されていません'
      end
    end
  end

  describe 'アカウント削除機能' do
    context 'アカウント削除ボタンを押す' do
      it 'アカウントが削除される' do
        click_button 'アカウント削除'
        click_button '削除'
        page.driver.browser.switch_to.alert.accept
        expect(page).to have_content('アカウントを削除しました')
        'アカウントを削除しましたが表示されていません'
        expect(page).to have_current_path root_path
        'トップページが表示されていません'

        visit login_path
        fill_in 'Email', with: user.email
        fill_in 'Password', with: 'test_password'
        click_button 'LOGIN'
        expect(page).to have_content('ログインに失敗しました')
        'ログインに失敗しましたが表示されていません'
      end
    end
  end
end
