require 'rails_helper'

RSpec.describe 'タスク画面の各操作', type: :system, js: true  do
  let(:mission) { create(:mission) }
  let(:task_1) { create(:task, mission_id: mission.id) }
  let(:task_2) { create(:task, mission_id: mission.id) }
  let(:task_3) { create(:task, mission_id: mission.id) }
  let(:task_4) { create(:task, mission_id: mission.id) }
  let(:task_5) { create(:task, mission_id: mission.id) }
  let(:task_6) { create(:task, mission_id: mission.id) }
  let(:task_7) { create(:task, mission_id: mission.id) }
  let(:task_8) { create(:task, mission_id: mission.id) }
  let(:task_9) { create(:task, mission_id: mission.id) }
  let(:task_10) { create(:task, mission_id: mission.id) }
  let(:tomorrow_task_1) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_2) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_3) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_4) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_5) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_6) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_7) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_8) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_9) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:tomorrow_task_10) { create(:task, :start_date_tomorrow, mission_id: mission.id) }
  let(:complete_task) { create(:task, :attack_task, mission_id: mission.id) }
  let(:today_task_1) { create(:task, :today, mission_id: mission.id) }
  let(:today_task_2) { create(:task, :today, mission_id: mission.id) }
  before do
    login(mission.user)
    visit mission_tasks_path(mission.id)
  end

  describe 'タスクが１件も作成されていない場合' do
    it 'タスク画面にミッション名・今日の日付・現在のタスク数が表示されている' do
      expect(page).to have_selector '.chara_img', text: mission.title
      expect(page).to have_selector '.partner_img', text: Date.today.strftime('%Y/%m/%d')
      expect(page).to have_selector '.partner_img', text: "Today'task 0"
    end
    it '主人公のキャラクターが2体表示されている' do
      expect(page).to have_selector("img[src$='/images/partner-motion.gif']")
      expect(page).to have_selector("img[src$='/images/hero-stand.gif']")
    end
    it '各場所にNo〇〇と表示されている' do
      expect(page).to have_content('No task')
      expect(page).to have_content('No search task')
    end
  end

  describe 'タスク作成機能' do
    describe 'タスクの記入値が正常だった場合' do
      it 'タスクの作成が完了する' do
        find('p', text: 'タスク作成').click
        fill_in 'task[title]', with: 'test_task'
        fill_in 'task[start_date]', with: Date.today
        fill_in 'task[end_date]', with: Date.today
        fill_in 'task[detail]', with: 'test_task_detail_test_task_detail_test_task_detail_test_task_detail'
        click_on('作成')
        visit mission_tasks_path(mission.id)
        expect(page).to have_selector '.card-body', text: 'test_task'
        expect(page).to have_selector '.card-title', text: 'Start date ' + Date.today.strftime('%Y/%m/%d')
        expect(page).to have_selector '.card-title', text: 'End date ' + Date.today.strftime('%Y/%m/%d')
        expect(page).to have_selector '.card-title', text: 'test_task_detail_test_task_detai...'
      end
      context 'start_dateが現在日時、end_dateが明日以降の日時でタスクの作成に成功した場合' do
        it 'start_dateからend_dateまでの期間全てがスケジュールの未来のタスクに表示される' do
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.today
          fill_in 'task[end_date]', with: Date.today.days_since(2)
          click_on('作成')
          visit mission_tasks_path(mission.id)
          expect(page).to have_content(Date.today.strftime('%Y/%m/%d'))
          expect(page).to have_content(Date.today.days_since(2).strftime('%Y/%m/%d'))
        end
      end
      context 'start_dateが翌日、end_dateが翌日以降の日時でタスクの作成に成功した場合' do
        it '未来のタスクはタスク画面に表示されない' do
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.tomorrow
          fill_in 'task[end_date]', with: Date.today.days_since(3)
          click_on('作成')
          visit mission_tasks_path(mission.id)
          expect(page).to_not have_selector '#enemy-card', text: 'test_task'
          expect(page).to_not have_selector '#enemy-card', text: 'Start date ' + Date.tomorrow.strftime('%Y/%m/%d')
          expect(page).to_not have_selector '#enemy-card',
                                            text: 'End date ' + Date.today.days_since(3).strftime('%Y/%m/%d')
        end
      end
    end

    context 'タスクの記入値が正常ではなかった場合' do
      context '全て未記入だった場合' do
        it 'エラーが発生する' do
          find('p', text: 'タスク作成').click
          fill_in 'task[start_date]', with: ''
          fill_in 'task[end_date]', with: ''
          click_button '作成'
          expect(page).to have_content('タイトルを入力して下さい')
          expect(page).to have_content('開始日を入力して下さい')
          expect(page).to have_content('終了日を入力して下さい')
        end
      end
      context 'end_dateがstart_dateよりも過去の場合' do
        it 'エラーが発生する' do
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.tomorrow
          fill_in 'task[end_date]', with: Date.today
          click_on('作成')
          expect( find('#task_count_error', visible: false) ).to have_content('Enddate: はStart dateより過去の日付は使用できません')
        end
      end
      context 'start_dateが対応するMissionのstart_dateよりも過去の場合' do
        it 'エラーが発生する' do
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.yesterday
          fill_in 'task[end_date]', with: Date.today
          click_on('作成')
          expect(page).to have_content('Startdate: はMissionのStart dateより過去の日付は使用できません')
        end
      end
      context 'end_dateが対応するMissionのend_dateよりも未来だった場合' do
        it 'エラーが発生する' do
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.today
          fill_in 'task[end_date]', with: Date.today.days_since(11)
          click_button '作成'
          expect(page).to have_content('Enddate: はMissionのEnd dateより先の日付は使用できません')
        end
      end
      context '同じ日に10件以上タスクを作成しようとした場合' do
        it 'エラーが発生する' do
          tomorrow_task_1
          tomorrow_task_2
          tomorrow_task_3
          tomorrow_task_4
          tomorrow_task_5
          tomorrow_task_6
          tomorrow_task_7
          tomorrow_task_8
          tomorrow_task_9
          tomorrow_task_10
          visit mission_tasks_path(mission.id)
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.tomorrow
          fill_in 'task[end_date]', with: Date.tomorrow
          click_button '作成'
          sleep 0.5
          expect( find('#task_count_error', visible: false) ).to have_content("1日に登録できるタスクの上限は10件までです(#{Date.tomorrow.strftime('%Y/%m/%d')}が10件を超えてしまいます)")
        end
      end
      context 'エラーが表示された後' do
        it '戻るを押すとエラーが消える' do
          find('p', text: 'タスク作成').click
          fill_in 'task[start_date]', with: ''
          fill_in 'task[end_date]', with: ''
          click_button '作成'
          expect(page).to have_content('タイトルを入力して下さい')
          expect(page).to have_content('開始日を入力して下さい')
          expect(page).to have_content('終了日を入力して下さい')
          click_on '戻る'
          find('p', text: 'タスク作成').click
          expect(page).to_not have_content('タイトルを入力して下さい')
          expect(page).to_not have_content('開始日を入力して下さい')
          expect(page).to_not have_content('終了日を入力して下さい')
        end
      end
    end
    describe '今日のタスクにfinishせずに数日にわたりタスクを作成し続けた場合' do
      context '今日のタスクが10よりも多くなった場合' do
        xit 'エラーが発生する' do
          travel 1.day do
            task_1
            task_2
            task_3
          end
          travel 2.days do
            task_4
            task_5
            task_6
          end
          travel 3.days do
            task_7
            task_8
            task_9
            task_10
            visit mission_tasks_path(mission.id)
            find('p', text: 'タスク作成').click
            fill_in 'task[title]', with: 'test_task'
            fill_in 'task[start_date]', with: Date.today
            fill_in 'task[end_date]', with: Date.today
            fill_in 'task[detail]', with: 'test_task_detail'
            click_button '作成'
            sleep 2
            expect(page).to have_content('「今日のタスク」に登録できる件数は１０件までです(前日以降のタスクを終了していない場合は「今日の作業を終了する」を押してください)')
          end
        end
      end
    end
  end

  describe 'タスク編集機能' do
    context '記入値が正常な場合' do
      it '編集が成功し各スケジュールに反映される' do
        task_1
        visit mission_tasks_path(mission.id)
        expect(page).to have_selector '.card-body', text: task_1.title
        expect(page).to have_selector '.card-title', text: task_1.start_date.strftime('%Y/%m/%d')
        click_on '編集', match: :first
        find('.js-modal').fill_in 'task[title]', with: 'test_task_edit'
        find('.js-modal').fill_in 'task[start_date]', with: Date.tomorrow
        find('.js-modal').fill_in 'task[end_date]', with: Date.today.days_since(4)
        click_button '変更'
        expect(page).to have_content('test_task_edit')
        expect(page).to have_content(Date.tomorrow.strftime('%Y/%m/%d'))
        expect(page).to have_content(Date.today.days_since(4).strftime('%Y/%m/%d'))
      end
    end
    context '記入値に問題がある場合' do
      context '全て未記入だった場合' do
        it 'エラーが発生する' do
          task_1
          visit mission_tasks_path(mission.id)
          find('.card-title').click_on('編集')
          find('.modal__content').fill_in 'task[title]', with: ''
          find('.modal__content').fill_in 'task[start_date]', with: ''
          find('.modal__content').fill_in 'task[end_date]', with: ''
          click_button '変更'
          expect(page).to have_content('タイトルを入力して下さい')
          expect(page).to have_content('開始日を入力して下さい')
          expect(page).to have_content('終了日を入力して下さい')
        end
      end
      context 'end_dateがstart_dateよりも過去の場合' do
        it 'エラーが発生する' do
          travel 1.day do
            task_1
            visit mission_tasks_path(mission.id)
            find('.card-title').click_on('編集')
            find('.modal__content').fill_in 'task[end_date]', with: Date.yesterday
            click_button '変更'
            expect(page).to have_content('Enddate: はStart dateより過去の日付は使用できません')
          end
        end
      end
      context 'start_dateが対応するMissionのstart_dateよりも過去の場合' do
        it 'エラーが発生する' do
          task_1
          visit mission_tasks_path(mission.id)
          find('.card-title').click_on('編集')
          find('.modal__content').fill_in 'task[start_date]', with: mission.start_date.yesterday
          click_button '変更'
          expect(page).to have_content('Startdate: はMissionのStart dateより過去の日付は使用できません')
        end
      end
      context 'end_dateが対応するMissionのend_dateよりも未来だった場合' do
        it 'エラーが発生する' do
          task_1
          visit mission_tasks_path(mission.id)
          find('.card-title').click_on('編集')
          find('.modal__content').fill_in 'task[end_date]', with: mission.end_date.tomorrow
          click_button '変更'
          expect(page).to have_content('Enddate: はMissionのEnd dateより先の日付は使用できません')
        end
      end
      context '編集した日程の中に10件の日程があり、上限の10件を超えてしまう場合' do
        xit 'エラーが発生する' do
          tomorrow_task_1
          tomorrow_task_2
          tomorrow_task_3
          tomorrow_task_4
          tomorrow_task_5
          tomorrow_task_6
          tomorrow_task_7
          tomorrow_task_8
          tomorrow_task_9
          tomorrow_task_10
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task'
          fill_in 'task[start_date]', with: Date.today
          fill_in 'task[end_date]', with: Date.today
          click_on('作成')
          visit mission_tasks_path(mission.id)
          find('.card-title').click_on('編集')
          find('.modal__content').fill_in 'task[end_date]', with: Date.tomorrow
          click_button '変更'
          expect( find('#update_task_count_error_11', visible: false) ).to have_content("1日に登録できるタスクの上限は10件までです(#{Date.tomorrow.strftime('%Y/%m/%d')}が10件を超えてしまいます)")
          #expect(page).to have_content("1日に作成できるタスクの上限は10件までです (#{Date.tomorrow.strftime('%Y/%m/%d')}が10件を超えてしまいます)")
        end
      end
    end
    it 'タスクがcompleteの状態でも各編集ボタンが機能すること' do
      complete_task
      visit mission_tasks_path(mission.id)
      expect(page).to have_content('complete!')
      find('.card-title').click_on('編集')
      expect(page).to have_content('タスク編集')
    end
    it 'その日にタスクが10件だった場合に名前だけ変えても問題なく編集できる' do
      task_1
      task_2
      task_3
      task_4
      task_5
      task_6
      task_7
      task_8
      task_9
      task_10
      visit mission_tasks_path(mission.id)
      expect(page).to have_selector '.card-body', text: task_1.title
      expect(page).to have_selector '.card-title', text: task_1.start_date.strftime('%Y/%m/%d')
      click_on '編集', match: :first
      find('.js-modal').fill_in 'task[title]', with: 'test_task_edit'
      click_button '変更'
      sleep 0.5
      expect(page).to have_content('test_task_edit')
      expect(page).to have_content('タスクを編集しました')
    end
  end
  describe 'タスク削除機能' do
    it '削除ボタンを押すとタスクを削除できる' do
      task_1
      visit mission_tasks_path(mission.id)
      expect(page).to have_selector '.card-body', text: task_1.title
      find('.card-title').click_on('削除')
      page.driver.browser.switch_to.alert.accept
      expect(page).to_not have_selector '.card-body', text: task_1.title
    end
    it 'タスクがcompleteの状態でも各削除ボタンが機能すること' do
      complete_task
      visit mission_tasks_path(mission.id)
      expect(page).to have_selector '.card-body', text: complete_task.title
      find('.card-title').click_on('削除')
      page.driver.browser.switch_to.alert.accept
      expect(page).to_not have_selector '.card-body', text: complete_task.title
    end
  end
  describe 'タスクアタック機能' do
    context '作成したタスクをアタックする' do
      context 'アタックしたタスクのstatusがincompleteかuntouchの場合' do
        it 'タスクアタックのモーションが表示される' do
          task_1
          visit mission_tasks_path(mission.id)
          find('.enemy-title-motion1', visible: false).click
          expect(page).to have_selector("img[src$='enemy0.gif']")
          expect(page).to have_selector '.card-body', text: task_1.title
          sleep 3
          expect(page).to_not have_selector("img[src$='enemy0.gif']")
        end
        it '「今日のタスク」と「スケジュールの今日のタスク」のタスクがcompleteになる' do
          task_1
          visit mission_tasks_path(mission.id)
          expect(page).to_not have_selector '.card-overlay', text: 'complete'
          find('.enemy-title-motion1', visible: false).click
          expect(page).to have_selector("img[src$='enemy0.gif']")
          expect(page).to have_selector '.card-body', text: task_1.title
          sleep 3
          expect(page).to_not have_selector("img[src$='enemy0.gif']")
          expect(page).to have_selector '.card-overlay', text: 'complete'
        end
      end
      context 'アタックしたタスクのstatusがcompleteの場合' do
        it '「今日のタスク」と「スケジュールの今日のタスク」のタスクのcompleteが外れる' do
          task_1
          visit mission_tasks_path(mission.id)
          find('.enemy-title-motion1', visible: false).click
          sleep 3
          expect(page).to have_selector '.card-overlay', text: 'complete'
          find('.enemy-title-motion1', visible: false).click
          expect(page).to have_selector("img[src$='enemy0.gif']")
          expect(page).to have_selector '.card-body', text: task_1.title
          sleep 3
          expect(page).to_not have_selector '.card-overlay', text: 'complete'
        end
      end
    end
  end
  describe '今日のタスク終了機能' do
    before do
      find('p', text: 'タスク作成').click
      fill_in 'task[title]', with: 'test_task'
      fill_in 'task[start_date]', with: Date.today
      fill_in 'task[end_date]', with: Date.today
      click_on('作成')
      visit mission_tasks_path(mission.id)
    end
    context '当日中に「今日のタスクを終了する」を押した場合' do
      it '「今日のタスク」のタスクが全て過去のタスクに移動し、untouchのタスクはincompleteになる' do
        click_on('作業を終了する')
        click_button('今日までのタスクを終了')
        page.driver.browser.switch_to.alert.accept
        sleep 0.5
        expect(page).to have_content('作業を終了しました')
        expect(find('.past-card-style-incomplete', visible: false).text(:all)).to include 'Incomplete'
      end
      it '次の日のタスクが今日のタスクになる' do
        tomorrow_task_1
        click_on('作業を終了する')
        click_button('今日までのタスクを終了')
        page.driver.browser.switch_to.alert.accept
        expect(page).to have_content('過去のタスク')
        expect(page).to have_selector '.past-card-style-incomplete', text: 'test_task'
        expect(page).to have_selector '.card-body', text: tomorrow_task_1.title
      end
    end
    context '翌日以降に「今日のタスクを終了する」を押した場合' do
      it '昨日までのタスクが過去のタスクに入り当日行うタスクは今日のタスクに残り続ける' do
        tomorrow_task_1
        travel 2.day do
          visit mission_tasks_path(mission.id)
          click_on('作業を終了する')
          click_button('前日までのタスクを終了')
          page.driver.browser.switch_to.alert.accept
          expect(page).to have_selector '.past-card-style-incomplete', text: 'test_task'
          expect(page).to_not have_selector '.past-card-style-incomplete', text: tomorrow_task_1.title
          expect(page).to have_selector '.card-body', text: tomorrow_task_1.title
        end
      end
    end
    context '翌日以降にタスクを追加した後「今日のタスクを終了する」を押した場合' do
      it '昨日までのタスクが過去のタスクに入り当日行うタスクは今日のタスクに残り続ける' do
        travel 2.day do
          find('p', text: 'タスク作成').click
          fill_in 'task[title]', with: 'test_task_tomorrow'
          fill_in 'task[start_date]', with: Date.today
          fill_in 'task[end_date]', with: Date.today
          click_on('作成')
          visit mission_tasks_path(mission.id)
          click_on('作業を終了する')
          click_on('前日までのタスクを終了')
          page.driver.browser.switch_to.alert.accept
          expect(page).to have_selector '.past-card-style-incomplete', text: 'test_task'
          expect(page).to_not have_selector '.past-card-style-incomplete', text: 'test_task_tomorrow'
          expect(page).to have_selector '.card-body', text: 'test_task_tomorrow'
        end
      end
    end
  end
  describe 'タスクの詳細' do
    it 'タスクの詳細の各種表示が正しく表示されているか' do
      expect(page).to have_selector '#task_information', text: mission.start_date.strftime('%Y/%m/%d')
      expect(page).to have_selector '#task_information', text: mission.end_date.strftime('%Y/%m/%d')
      expect(page).to have_selector '#task_information', text: '0'
      find('p', text: 'タスク作成').click
      fill_in 'task[title]', with: 'test_task'
      fill_in 'task[start_date]', with: Date.today
      fill_in 'task[end_date]', with: Date.today
      click_on('作成')
      visit mission_tasks_path(mission.id)
      expect(page).to have_selector '#task_information', text: '1'
    end
  end
  describe 'タスク検索機能' do
    let(:another_task) { create(:task, :another_title, mission_id: mission.id) }
    it 'タスクのタイトルを記入するとタスク検索ができる' do
      task_1
      another_task
      visit mission_tasks_path(mission.id)
      expect(page).to have_selector '#task_information', text: 'No search task'
      fill_in 'q[title_cont]', with: 'a'
      click_on('検索')
      expect(page).to have_selector '.search-task', text: 'another_test_task'
    end
  end

  describe 'スケジュール機能' do
    before do
      today_task_1
      visit mission_tasks_path(mission.id)
      click_on('作業を終了する')
      click_on('今日までのタスクを終了')
      page.driver.browser.switch_to.alert.accept
    end
    it 'スケジュール内の各タスクでNoteとDetailが表示される' do
      find('h5', text: 'Detail').click
      expect(page).to have_content('test_task_detail')
    end
    it '「incomplete」または「untouch」を押すとcompleteになる' do
      find('a', text: 'Incomplete').click
      page.driver.browser.switch_to.alert.accept
      expect(page).to have_content('complete')
    end
  end
end
