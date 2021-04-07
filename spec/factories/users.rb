FactoryBot.define do
  factory :user do
    name { 'test_name' }
    email { 'test_email@example.com' }
    password { 'test_password' }
    password_confirmation { 'test_password' }
    
    trait :another_email do
      email { 'another_test_email@example.com' }
    end
  end
end
