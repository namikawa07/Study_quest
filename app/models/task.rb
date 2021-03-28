class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 20 }
  validates :detail, length: { maximum: 200 }
  validates :task_date, presence: true
  validate :limit_today_task_count, on: :create
  enum status: [:untouch, :complete, :incomplete]
  enum task_date: [:today_task, :past_task]
  belongs_to :mission
  
  def limit_today_task_count
    tasks = Task.where(task_date: "today_task")
    if tasks.count >= 5
      errors.add(:task, "一度に設定できるタイトルは5件までです")
    end
  end
end
