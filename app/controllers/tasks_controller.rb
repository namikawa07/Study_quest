class TasksController < ApplicationController
  before_action :set_mission
  def index
    @task = Task.new
    today_tasks
  end

  def create
    @task = Task.new(task_params)
    @task.mission_id = @mission.id
    if  @task.save
      flash[:success] = t('tasks.create.Success')
      redirect_to mission_tasks_path(@mission)
    else
      flash[:danger] = t('tasks.create.Not_success')
      redirect_to mission_tasks_path(@mission)
    end
  end
  
  def update
  end
  
  def destroy
    @task = my_mission.tasks.find(params[:id])
    @task.destroy!
    flash[:success] = t('tasks.destroy.Success')
    redirect_to mission_tasks_path(@mission)
  end
  
  private
  
  def task_params
    params.require(:task).permit(:title,:detail)
  end
  
  def set_mission
    @mission = Mission.find(params[:mission_id])
  end

  def today_tasks
    @todaytasks = my_mission.tasks.where(task_date: "today_task")
  end
end
