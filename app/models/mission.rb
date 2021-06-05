class LimitRegistrationValidator < ActiveModel::Validator
  def validate(record)
    registration_mission = record.user.missions.where(registration: 'registration')
    return unless record.registration == 'registration' && registration_mission.count >= 1

    record.errors.add :base, 'MyMissionに登録できるのは1件までです'
  end
end

class Mission < ApplicationRecord
  validates :title, presence: true, length: { maximum: 100 }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :memo, length: { maximum: 1000 }
  validates :status, presence: true
  validates :registration, presence: true
  validate :date_cannot_be_start_date, on: :create
  validate :date_cannot_be_end_date
  validate :end_date_cannot_be_now, on: :create
  validates_with LimitRegistrationValidator

  enum status: { publish: 0, complete: 1, incomplete: 2, draft: 3 }
  enum registration: { not_registration: 0, registration: 1 }
  has_many :tasks, dependent: :destroy
  belongs_to :user

  def until_today_mission_count
    (start_date..Date.today).to_a.count
  end

  def due_to_mission_count
    (start_date..end_date).to_a.count
  end

  def due_to_percent
    ((start_date..Date.today).to_a.count * 100.0 / (start_date..end_date).to_a.count).round
  end

  def change_registration
    self.registration = if registration == 'not_registration'
                          'registration'
                        else
                          'not_registration'
                        end
  end

  def change_finish_mission
    self.status = if status == 'incomplete'
                    'complete'
                  else
                    'incomplete'
                  end
  end

  def change_draft_or_publish
    self.status = if status == 'incomplete' || status == 'publish'
                    'draft'
                  elsif status == 'draft' || end_date >= Date.today
                    'publish'
                  else
                    'incomplete'
                  end
  end

  private

  def date_cannot_be_start_date
    errors.add(:Startdate, ': 過去の日付は使用できません') if start_date.present? && start_date < Date.today
  end

  def date_cannot_be_end_date
    errors.add(:Enddate, ': Start dateより過去の日付は使用できません') if end_date.present? && end_date < start_date
  end

  def end_date_cannot_be_now
    errors.add(:Enddate, ': End dateは現在の日付以降に設定してください') if end_date.present? && end_date < Date.today
  end
end
