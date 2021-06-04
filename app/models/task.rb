class TaskDateValidator < ActiveModel::Validator
  def validate(record)
    @error_dates = []
    due_to = ((record.start_date)..(record.end_date)).to_a
    same_date_tasks = due_to.map do |date|
      [date,
       record.mission.tasks.where('start_date <= ?', date).where('end_date >= ?', date).where.not(id: record.id)]
    end
    error_date_tasks = same_date_tasks.select { |_k, v| v.count >= 10 }
    @error_dates = error_date_tasks.transpose[0].map { |date| I18n.l date } if error_date_tasks.present?
    @error_dates.each do |date|
      record.errors.add :base, "1日に登録できるタスクの上限は10件までです(#{date}が10件を超えてしまいます)"
    end
  end
end

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
  validates_with TaskDateValidator
  enum status: { untouch: 0, complete: 1, incomplete: 2 }
  enum task_date: { today_task: 0, past_task: 1, future_task: 2 }
  enum character: { enemy0: 0, enemy1: 1, enemy2: 2, enemy3: 3, enemy4: 4, enemy5: 5, enemy6: 6,
                    enemy7: 7, enemy8: 8, enemy9: 9, enemy10: 10, enemy11: 11, enemy12: 12, enemy13: 13, enemy14: 14 }
  has_many :notes, dependent: :destroy
  belongs_to :mission

  scope :finish_tasks, ->(date) { where('end_date <= ?', eval(date)) }
  scope :next_tasks_change_today_tasks, ->(date) { where(task_date: 'future_task').where(start_date: eval(date).tomorrow) }
  scope :task_status, ->(status) { where(status: status) }
  scope :task_group, ->(date) { where('start_date <= ?', date).where('end_date >= ?', date) }

  def setting_cheracter
    self.character = "enemy#{rand(15)}"
  end

  def change_status_attack_task
    self.status = case status
                  when 'untouch', 'incomplete'
                    'complete'
                  when 'complete'
                    'incomplete'
                  end
  end

  def change_task_date
    self.task_date = if start_date > Date.today
                       'future_task'
                     elsif end_date < Date.today
                       'past_task'
                     else
                       'today_task'
                     end
  end

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
