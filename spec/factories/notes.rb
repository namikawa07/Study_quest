FactoryBot.define do
  factory :note do
    association :task
    title { 'test_task_note_title' }
    body { 'test_task_note_body' }

    trait :another_title do
      title { 'test_task_another_note_title_1' }
    end

    trait :another_body do
      body { 'test_task_another_note_body_2' }
    end

    trait :another_title_body do
      title { 'test_task_note_title_3' }
      body { 'test_task_note_body_4' }
    end
  end
end
