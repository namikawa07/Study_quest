class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 40 }
  validates :detail, length: { maximum: 200 }
  validates :task_date, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :character, presence: true
  validate :date_cannot_be_end_date
  validate :start_date_cannot_be_mission_start_date
  #validate :today_task_until_10, on: :create
  validate :end_date_cannot_be_mission_end_date
  enum status: [:untouch, :complete, :incomplete]
  enum task_date: [:today_task, :past_task, :future_task]
  enum character: [:enemy0, :enemy1, :enemy2, :enemy3, :enemy4, :enemy5, :enemy6, :enemy7, :enemy8, :enemy9, :enemy10, :enemy11, :enemy12, :enemy13, :enemy14]
  has_many :notes, dependent: :destroy
  belongs_to :mission
  
  
  private


  def date_cannot_be_end_date
    errors.add(:Enddate, ": はStart dateより過去の日付は使用できません") if end_date.present? && end_date < start_date
  end

  def start_date_cannot_be_mission_start_date
    errors.add(:Startdate,": はMissionのStart dateより過去の日付は使用できません") if start_date.present? && start_date < self.mission.start_date
  end
  
  def end_date_cannot_be_mission_end_date
    errors.add(:Enddate, ": はMissionのEnd dateより先の日付は使用できません") if end_date.present? && end_date > self.mission.end_date
  end
  
  #def today_task_until_10
   # today_task = Task.joins(:mission).group("missions.title").where(task_date: "today_task").having('count(*) >= ?', 10).count
   # binding.pry
   # errors.add(:Startdate, ": 「今日のタスク」に登録できる件数は１０件までです(前日以降のタスクを終了していない場合は「今日の作業を終了する」を押してください)") if today_task.present?
  #end
end
