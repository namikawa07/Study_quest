require 'rails_helper'

RSpec.describe 'ミッションの新規作成', type: :system, js: true  do
  let(:user) { create(:user) }
  before do
    login(user)
  end

  describe 'ミッション作成機能' do
    context 'フォームの入力値が正常' do
      it 'ミッション作成が成功する' do
        click_on 'ミッションを作成'
        fill_in 'mission[title]', with: 'test_mission'
        fill_in 'mission[start_date]', with: Date.today
        fill_in 'mission[end_date]', with: Date.tomorrow
        fill_in 'mission[memo]', with: 'test_memo'
        click_button '実行'
        expect(page).to have_content('ミッションを作成しました')
        expect(page).to have_current_path(users_path)
        expect(page).to have_selector '.card', text: '実行中'
        expect(page).to have_selector '.card', text: 'test_mission'
        expect(page).to have_selector '.card', text: Date.today.strftime('%m/%d')
        expect(page).to have_selector '.card', text: Date.tomorrow.strftime('%m/%d')
      end
    end

    describe 'フォーム入力に問題がある場合' do
      context '全て未記入の場合' do
        it 'エラーが発生する' do
          click_on 'ミッションを作成'
          click_on '実行'
          expect(page).to have_content('タイトルを入力して下さい')
          expect(page).to have_content('Start dateを入力して下さい')
          expect(page).to have_content('End dateを入力して下さい')
        end
      end
      context 'タイトルを最大文字数以上を記入した場合' do
        it 'エラーが発生する' do
          click_on 'ミッションを作成'
          fill_in 'mission[title]',
                  with: 'test_mission_test_mission_test_mission_test_mission_test_mission_test_mission_test_mission_test_mission'
          fill_in 'mission[start_date]', with: Date.today
          fill_in 'mission[end_date]', with: Date.tomorrow
          fill_in 'mission[memo]', with: 'test_memo'
          click_button '実行'
          expect(page).to have_content('Mission名は最大で100字までです')
        end
      end
      context '日付設定を間違った場合' do
        context 'Start Dateを過去に設定した場合' do
          it 'エラーが発生する' do
            click_on 'ミッションを作成'
            fill_in 'mission[title]', with: 'test_mission'
            fill_in 'mission[start_date]', with: Date.yesterday
            fill_in 'mission[end_date]', with: Date.tomorrow
            fill_in 'mission[memo]', with: 'test_memo'
            #click_button '実行'
            expect(page).to have_content('Startdate: 過去の日付は使用できません')
          end
        end
        context 'End DateをStart Dateよりも過去に設定した場合' do
          it 'エラーが発生する' do
            click_on 'ミッションを作成'
            fill_in 'mission[title]', with: 'test_mission'
            fill_in 'mission[start_date]', with: Date.tomorrow
            fill_in 'mission[end_date]', with: Date.today
            fill_in 'mission[memo]', with: 'test_memo'
            click_button '実行'
            expect(page).to have_content('Enddate: Start dateより過去の日付は使用できません')
          end
        end
        context 'End Dateを現在時刻より過去に設定した場合' do
          it 'エラーが発生する' do
            click_on 'ミッションを作成'
            fill_in 'mission[title]', with: 'test_mission'
            fill_in 'mission[start_date]', with: Date.today
            fill_in 'mission[end_date]', with: Date.yesterday
            fill_in 'mission[memo]', with: 'test_memo'
            click_button '実行'
            expect(page).to have_content('Enddate: End dateは現在の日付以降に設定してください')
          end
        end
      end
    end

    it 'ミッション作成画面で下書きを押すとそのミッションが下書きと表示される' do
      click_on 'ミッションを作成'
      fill_in 'mission[title]', with: 'test_mission'
      fill_in 'mission[start_date]', with: Date.today
      fill_in 'mission[end_date]', with: Date.tomorrow
      fill_in 'mission[memo]', with: 'test_memo'
      click_button '下書き'
      expect(page).to have_content('ミッションの下書きを作成しました')
      expect(page).to have_current_path(users_path)
      expect(page).to have_selector '.card', text: '下書き'
      expect(page).to have_selector '.card', text: 'test_mission'
      expect(page).to have_selector '.card', text: Date.today.strftime('%m/%d')
      expect(page).to have_selector '.card', text: Date.tomorrow.strftime('%m/%d')
    end
  end

  describe 'ミッション編集機能' do
    let(:mission) { create(:mission, user_id: user.id) }
    before do
      create_mission
    end
    context 'フォームの入力値が正常' do
      it 'ミッションの編集ができる' do
        page.all('a.js-modal-open')[1].click
        fill_in 'mission[title]', with: 'another_test_mission'
        fill_in 'mission[start_date]', with: Date.tomorrow
        fill_in 'mission[end_date]', with: Date.today.days_since(2)
        fill_in 'mission[memo]', with: 'another_test_memo'
        click_button '変更'
        expect(page).to have_content('ミッションを編集しました')
        expect(page).to have_current_path(users_path)
        expect(page).to have_selector '.card', text: '実行中'
        expect(page).to have_selector '.card', text: 'another_test_mission'
        expect(page).to have_selector '.card', text: Date.tomorrow.strftime('%m/%d')
        expect(page).to have_selector '.card', text: Date.today.days_since(2).strftime('%m/%d')
      end
    end
    context 'ミッションの入力に問題がある場合' do
      it 'エラーが発生する' do
        page.all('a.js-modal-open')[1].click
        fill_in 'mission[title]', with: ''
        fill_in 'mission[start_date]', with: Date.yesterday
        fill_in 'mission[end_date]', with: Date.today.days_ago(2)
        fill_in 'mission[memo]', with: 'another_test_memo'
        click_button '変更'
        expect(page).to have_content('タイトルを入力して下さい')
      end
    end

    context 'My_missionを2つ登録する場合' do
      it 'エラーが発生する' do
        create_mission
        all(:link_or_button, 'My mission')[0].click
        expect(page).to have_content('My Missionに登録しました')
        all(:link_or_button, 'My mission')[1].click
        expect(page).to have_content('My Missionに登録できるのは1件までです')
      end
    end

    it 'ミッション削除が機能する' do
      page.all('a.js-modal-open')[0].click
      sleep 3
      click_button '削除'
      expect do
        page.driver.browser.switch_to.alert.accept
      end.to change { Mission.count }.by(0)
      expect(page).to have_content('ミッションを削除しました')
    end

    it '現在時刻がenddateを超えたら未完了になる' do
      expect(page).to have_selector '.card', text: '実行中'
      travel 3.days do
        visit users_path
        page.all('a.js-modal-open')[1].click
        click_button '変更'
        expect(page).to have_selector '.card', text: '未完了'
      end
    end

    it '「Missionを完了する」を押すとミッションが完了済に変わる' do
      expect(page).to have_selector '.card', text: '実行中'
      travel 3.days do
        page.all('a.js-modal-open')[1].click
        click_button '変更'
        expect(page).to have_selector '.card', text: '未完了'
        click_link 'Missionを完了する'
        expect(page).to have_selector '.card', text: '完了済'
      end
    end
  end
end
