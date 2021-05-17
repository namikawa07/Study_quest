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
  enum status: { untouch: 0, complete: 1, incomplete: 2 }
  enum task_date: { today_task: 0, past_task: 1, future_task: 2 }
  enum character: { enemy0: 0, enemy1: 1, enemy2: 2, enemy3: 3, enemy4: 4, enemy5: 5, enemy6: 6,
                    enemy7: 7, enemy8: 8, enemy9: 9, enemy10: 10, enemy11: 11, enemy12: 12, enemy13: 13, enemy14: 14 }
  has_many :notes, dependent: :destroy
  belongs_to :mission

  private

  def date_cannot_be_end_date
    errors.add(:Enddate, ': はStart dateより過去の日付は使用できません') if end_date.present? && end_date < start_date
  end

  def start_date_cannot_be_mission_start_date
    return unless start_date.present? && start_date < mission.start_date

    errors.add(:Startdate, ': はMissionのStart dateより過去の日付は使用できません')
  end

  def end_date_cannot_be_mission_end_date
    errors.add(:Enddate, ': はMissionのEnd dateより先の日付は使用できません') if end_date.present? && end_date > mission.end_date
  end
end
