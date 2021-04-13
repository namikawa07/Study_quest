class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 20 }
  validates :detail, length: { maximum: 200 }
  validates :task_date, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validate :date_cannot_be_end_date
  validate :start_date_cannot_be_mission_start_date
  validate :end_date_cannot_be_mission_end_date
  validate :end_date_cannot_be_now, on: :create
  enum status: [:untouch, :complete, :incomplete]
  enum task_date: [:today_task, :past_task, :future_task]
  has_many :notes, dependent: :destroy
  belongs_to :mission
  
  
  private

  def date_cannot_be_end_date
    errors.add(:Enddate, ": はStart dateより過去の日付は使用できません") if end_date.present? && end_date < start_date
  end

  def start_date_cannot_be_mission_start_date
    errors.add(:Startdate,": はTaskのStart dateより過去の日付は使用できません") if start_date.present? && start_date < self.mission.start_date
  end
  
  def end_date_cannot_be_mission_end_date
    errors.add(:Enddate, ": はTaskのEnd dateより先の日付は使用できません") if end_date.present? && end_date > self.mission.end_date
  end

  def end_date_cannot_be_now
    errors.add(:Enddate, ": は現在の日付以降に設定してください") if end_date.present? && end_date < Date.today
  end
end
