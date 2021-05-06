class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 40 }
  validates :detail, length: { maximum: 200 }
  validates :task_date, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :character, presence: true
  validate :date_cannot_be_end_date
  validate :start_date_cannot_be_mission_start_date
  validate :end_date_cannot_be_mission_end_date
  enum status: %i[untouch complete incomplete]
  enum task_date: %i[today_task past_task future_task]
  enum character: %i[enemy0 enemy1 enemy2 enemy3 enemy4 enemy5 enemy6 enemy7 enemy8 enemy9 enemy10 enemy11 enemy12 enemy13 enemy14]
  has_many :notes, dependent: :destroy
  belongs_to :mission

  private

  def date_cannot_be_end_date
    errors.add(:Enddate, ': はStart dateより過去の日付は使用できません') if end_date.present? && end_date < start_date
  end

  def start_date_cannot_be_mission_start_date
    errors.add(:Startdate, ': はMissionのStart dateより過去の日付は使用できません') if start_date.present? && start_date < mission.start_date
  end

  def end_date_cannot_be_mission_end_date
    errors.add(:Enddate, ': はMissionのEnd dateより先の日付は使用できません') if end_date.present? && end_date > mission.end_date
  end
end
