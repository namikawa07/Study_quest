require 'rails_helper'

RSpec.describe Mission, type: :model do

  let(:user){create(:user)}
  it "タイトル、開始日、終了日がある場合、有効である" do
    mission = Mission.new( title: "test_title",
                           start_date: Date.today,
                           end_date: Date.tomorrow,
                           user_id: user.id
                          )
    expect(mission).to be_valid
  end
  it "タイトルがない場合、無効である" do
    mission = Mission.new( title: nil,
                           start_date: Date.today,
                           end_date: Date.tomorrow,
                           user_id: user.id
                         )
    mission.valid?
    expect(mission.errors[:title]).to include("を入力してください")
  end
  it "開始日、終了日がない場合、無効である" do
    mission = Mission.new( title: "test_title",
                           start_date: nil,
                           end_date: nil,
                           user_id: user.id
                         )
    mission.valid?
    expect(mission.errors[:start_date]).to include("を入力してください")
    expect(mission.errors[:end_date]).to include("を入力してください")
    end
  it "タイトルの文字数が100文字以上の場合、無効になる" do
    mission = Mission.new( title: "test_title_test_title_test_title_test_title_test_title_test_title_test_title_test_title_test_title_test_title",
                           start_date: Date.today,
                           end_date: Date.tomorrow,
                           user_id: user.id
                         )
      mission.valid?
    expect(mission.errors[:title]).to include("は100文字以内で入力してください")
  end
  it "memoの文字数が1000文字以上の場合、無効になる" do
    mission = Mission.new( title: "test_title",
                           start_date: Date.today,
                           end_date: Date.tomorrow,
                           user_id: user.id,
                           memo: "test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo_test_memo"
                         )
      mission.valid?
    expect(mission.errors[:memo]).to include("は1000文字以内で入力してください")
  end
  it "開始日が現在より過去の場合、無効である" do
      mission = Mission.new( title: "test_title",
                             start_date: Date.yesterday,
                             end_date: Date.today,
                             user_id: user.id
                           )
      mission.valid?
      expect(mission.errors[:Startdate]).to include(": 過去の日付は使用できません")
  end
  it "終了日が現在より過去の場合、無効である" do
      mission = Mission.new( title: "test_title",
                             start_date: Date.yesterday,
                             end_date: Date.yesterday,
                             user_id: user.id
                           )
      mission.valid?
      expect(mission.errors[:Enddate]).to include(": End dateは現在の日付以降に設定してください")
   
  end
  it "終了日が開始日より過去の場合、無効である" do
      mission = Mission.new( title: "test_title",
                             start_date: Date.today,
                             end_date: Date.yesterday,
                             user_id: user.id
                           )
      mission.valid?
      expect(mission.errors[:Enddate]).to include(": Start dateより過去の日付は使用できません")
  end
end

