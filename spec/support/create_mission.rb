module CreateMissionModule
  def create_mission
    click_on 'ミッションを作成'
    fill_in 'mission[title]', with: 'test_mission'
    fill_in 'mission[start_date]', with: Date.today
    fill_in 'mission[end_date]', with: Date.tomorrow
    fill_in 'mission[memo]', with: 'test_memo'
    click_button '実行'
  end
end

