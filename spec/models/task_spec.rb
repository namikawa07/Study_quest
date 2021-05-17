require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:mission) { create(:mission) }
  it 'タイトル、開始日、終了日がある場合、有効である' do
    task = Task.new(title: 'test_title',
                    start_date: Date.today,
                    end_date: Date.tomorrow,
                    character: 0,
                    mission_id: mission.id)
    expect(task).to be_valid
  end
  it 'タイトルがない場合、無効である' do
    task = Task.new(title: nil,
                    start_date: Date.today,
                    end_date: Date.tomorrow,
                    character: 0,
                    mission_id: mission.id)
    task.valid?
    expect(task.errors[:title]).to include('を入力してください')
  end
  it '開始日、終了日がない場合、無効である' do
    task = Task.new(title: 'test_title',
                    start_date: nil,
                    end_date: nil,
                    character: 0,
                    mission_id: mission.id)
    task.valid?
    expect(task.errors[:start_date]).to include('を入力してください')
    expect(task.errors[:end_date]).to include('を入力してください')
  end
  it 'タイトルの文字数が40文字以上の場合、無効になる' do
    task = Task.new(title: 'test_title_test_title_test_title_test_title',
                    start_date: Date.today,
                    end_date: Date.tomorrow,
                    character: 0,
                    mission_id: mission.id)
    task.valid?
    expect(task.errors[:title]).to include('は40文字以内で入力してください')
  end
  it 'detailの文字数が200文字以上の場合、無効になる' do
    task = Task.new(title: 'test_title_test_title_test_title_test_title',
                    start_date: Date.today,
                    end_date: Date.tomorrow,
                    character: 0,
                    mission_id: mission.id,
                    detail: 'test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail_test_detail')
    task.valid?
    expect(task.errors[:detail]).to include('は200文字以内で入力してください')
  end
  it 'タスクの開始日がミッションの開始日より過去の場合、無効である' do
    task = Task.new(title: 'test_title',
                    start_date: Date.yesterday,
                    end_date: Date.today,
                    character: 0,
                    mission_id: mission.id)
    task.valid?
    expect(task.errors[:Startdate]).to include(': はMissionのStart dateより過去の日付は使用できません')
  end
  it 'タスクの終了日がミッションの終了日より未来の場合、無効である' do
    task = Task.new(title: 'test_title',
                    start_date: Date.today,
                    end_date: Date.today.days_since(11),
                    character: 0,
                    mission_id: mission.id)
    task.valid?
    expect(task.errors[:Enddate]).to include(': はMissionのEnd dateより先の日付は使用できません')
  end
  it '終了日が開始日より過去の場合、無効である' do
    task = Task.new(title: 'test_title',
                    start_date: Date.today,
                    end_date: Date.yesterday,
                    character: 0,
                    mission_id: mission.id)
    task.valid?
    expect(task.errors[:Enddate]).to include(': はStart dateより過去の日付は使用できません')
  end
end
