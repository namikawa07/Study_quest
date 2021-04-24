class Mission < ApplicationRecord
  validates :title, presence: true, length: { maximum: 40 }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :memo, length: { maximum: 1000 }
  validates :status, presence: true
  validates :registration, presence: true
  validate :date_cannot_be_start_date, on: :create
  validate :date_cannot_be_end_date
  validate :end_date_cannot_be_now, on: :create
  enum status: [:publish, :complete, :incomplete, :draft]
  enum registration: [:not_registration, :registration]
  has_many :tasks, dependent: :destroy
  has_many :schedules, dependent: :destroy
  belongs_to :user


  def date_cannot_be_start_date
    errors.add(:Startdate, ": 過去の日付は使用できません") if start_date.present? && start_date < Date.today
  end

  def date_cannot_be_end_date
    errors.add(:Enddate, ": Start dateより過去の日付は使用できません") if end_date.present? && end_date < start_date
  end

  def end_date_cannot_be_now
    errors.add(:Enddate, ": End dateは現在の日付以降に設定してください") if end_date.present? && end_date < Date.today
  end
end