FactoryBot.define do
  factory :task do
    association :mission
    sequence(:title) { |n| "test_task_#{n}" }
    start_date { Date.today }
    end_date { Date.today.days_since(rand(5)) }
    detail { 'test_task_detail' }
    character { 'enemy0' }

    trait :start_date_tomorrow do
      start_date { Date.tomorrow }
      end_date { Date.tomorrow.days_since(rand(5)) }
      task_date { 2 }
    end

    trait :attack_task do
      status { 1 }
    end

    trait :today do
      end_date { Date.today }
    end

    trait :another_title do
      title { 'another_test_task' }
    end
  end
end
