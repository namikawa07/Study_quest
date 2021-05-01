FactoryBot.define do
  factory :mission do
    association :user
    title { 'test_mission' }
    start_date { Date.today }
    end_date { Date.today.days_since(10) }
    memo { 'test_memo' }
  end
end
