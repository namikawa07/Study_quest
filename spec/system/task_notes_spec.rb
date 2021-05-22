require 'rails_helper'

RSpec.describe 'タスクノート機能', type: :system, js: true  do
  let(:mission) { create(:mission) }
  let(:task_1) { create(:task, mission_id: mission.id) }
  let(:note) { create(:note, task_id: task_1.id) }
  let(:another_title_note) { create(:note, :another_title, task_id: task_1.id) }
  let(:another_body_note) { create(:note, :another_body, task_id: task_1.id) }
  let(:another_note) { create(:note, :another_title_body, task_id: task_1.id) }
  before do
    login(mission.user)
    task_1
    visit mission_tasks_path(mission.id)
  end

  describe 'タスクノートアクセス機能' do
    it '今日のタスクからアクセスできる' do
      find('.card-title').click_on('0 Notes')
      expect(page).to have_current_path mission_task_notes_path(mission.id, task_1.id)
      expect(page).to have_content(task_1.title)
      expect(page).to have_content(task_1.start_date.strftime('%Y/%m/%d'))
      expect(page).to have_content(task_1.end_date.strftime('%Y/%m/%d'))
    end
  end
  describe 'タスクノート機能' do
    before do
      find('.card-title').click_on('0 Notes')
    end
    describe 'タスクノート作成' do
      context '記入値が未記入' do
        fit 'エラーが表示される' do
          click_on('ノートを作成する')
          expect(page).to have_content('Note title')
          fill_in 'note[body]', with: 'test_task_note_body'
          click_on('作成')
          sleep 2
          expect(page).to have_content('タイトルを入力して下さい')
        end
      end
      context '記入値が正常な場合' do
        it 'ノートの作成が成功する' do
          click_on('ノートを作成する')
          expect(page).to have_content('Note title')
          fill_in 'note[title]', with: 'test_task_note'
          fill_in 'note[body]', with: 'test_task_note_body'
          click_on('作成')
          expect(page).to have_content('ノートを作成しました')
          expect(page).to have_selector '#notes', text: 'test_task_note'
          expect(page).to have_selector '#notes', text: 'test_task_note_body'
        end
      end
    end
    describe 'タスクノート編集機能' do
      before do
        note
        visit mission_task_notes_path(mission.id, task_1.id)
        click_on('編集')
      end
      context '記入値が正常な場合' do
        it 'ノートの編集が成功する' do
          fill_in 'note[title]', with: 'edit_test_task_note'
          fill_in 'note[body]', with: 'edit_test_task_note_body'
          click_on('変更')
          expect(page).to have_content('ノートを更新しました')
          expect(page).to have_selector '#notes', text: 'edit_test_task_note'
          expect(page).to have_selector '#notes', text: 'edit_test_task_note_body'
        end
      end
      context '記入値が未記入' do
        it 'エラーが表示される' , js: true do
          fill_in 'note[title]', with: ''
          fill_in 'note[body]', with: 'edit_test_task_note_body'
          click_on('変更')
          expect(page).to have_content('タイトルを入力して下さい')
        end
      end
    end
    describe 'タスクノート削除機能' do
      it 'ノートが削除できる' do
        note
        visit mission_task_notes_path(mission.id, task_1.id)
        click_on('削除')
        find('#note_delete').click
        page.driver.browser.switch_to.alert.accept
        expect(page).to have_content('No notes')
      end
    end

    describe 'タスクノート検索機能' do
      before do
        note
        another_title_note
        another_body_note
        another_note
        visit mission_task_notes_path(mission.id, task_1.id)
      end
      context 'タイトルを記入した場合' do
        it '対応するノートが出てくる' do
          expect(page).to have_selector '#notes', text: note.title
          expect(page).to have_selector '#notes', text: another_title_note.title
          expect(page).to have_selector '#notes', text: another_body_note.title
          fill_in 'q[title_cont]', with: '1'
          click_on('検索')
          expect(page).to_not have_selector '#notes', text: note.title
          expect(page).to have_selector '#notes', text: another_title_note.title
          expect(page).to_not have_selector '#notes', text: another_body_note.title
        end
      end
      context '本文を記入した場合' do
        it '対応するノートが出てくる' do
          expect(page).to have_selector '#notes', text: note.body
          expect(page).to have_selector '#notes', text: another_title_note.body
          expect(page).to have_selector '#notes', text: another_body_note.body
          fill_in 'q[body_cont]', with: '2'
          click_on('検索')
          expect(page).to_not have_selector '#notes', text: note.body
          expect(page).to_not have_selector '#notes', text: another_title_note.body
          expect(page).to have_selector '#notes', text: another_body_note.body
        end
      end
      context 'タイトルと本文を記入した場合' do
        it '対応するノートが出てくる' do
          expect(page).to have_selector '#notes', text: note.title
          expect(page).to have_selector '#notes', text: another_title_note.title
          expect(page).to have_selector '#notes', text: another_body_note.title
          fill_in 'q[title_cont]', with: '3'
          fill_in 'q[body_cont]', with: '4'
          click_on('検索')
          expect(page).to_not have_selector '#notes', text: another_title_note.title
          expect(page).to_not have_selector '#notes', text: another_body_note.body
          expect(page).to have_selector '#notes', text: another_note.title
        end
      end
    end
  end
  it '作成したノートがタスクに反映されている' do
    note
    visit mission_tasks_path(mission.id)
    click_on('作業を終了する')
    click_button('今日までのタスクを終了')
    page.driver.browser.switch_to.alert.accept
    first('h5', text: '1 Notes').click
    expect(page).to have_content(note.title)
  end
end
