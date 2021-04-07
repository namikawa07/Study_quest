FactoryBot.define do
  factory :mission do
    association :user
    title { 'test_mission' }
    start_date { Date.yesterday }
    end_date { Date.tomorrow }
    memo { 'test_memo' }
  end
end
