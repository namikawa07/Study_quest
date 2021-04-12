class TasksController < ApplicationController
  before_action :set_mission
  before_action :today_tasks, only: %i[index create]
  before_action :set_search_tasks, only: %i[index]
  
  def index
    @task = Task.new
    @all_tasks = @mission.tasks
    @schedules = @mission.schedules.page(params[:schedule]).per(3).order(start_date: :desc)
    past_tasks
    same_created_tasks
    @search_tasks = @search_task.result
    @current_schedules = @mission.schedules.where("end_date >=? and start_date <=?",  Date.today, Date.today)
  end

  def create
    @task = Task.new(task_params)
    @task.mission_id = @mission.id
    binding.pry
    if @task.save
      flash[:success] = t('tasks.create.Success')
      redirect_to mission_tasks_path(@mission)
    else
    binding.pry
      flash.now[:danger] = t('tasks.create.Not_success')
      redirect_to mission_tasks_path(@mission)
    end
  end
  
  def update
    @task = @mission.tasks.find(params[:id])
    if @task.update(task_params)
      flash[:success] = t('tasks.update.Success')
      redirect_to mission_tasks_path(@mission)
    else
      flash.now[:danger] = t('tasks.update.Not_success')
      redirect_to mission_tasks_path(@mission)
    end
  end
  
  def destroy
    @task = @mission.tasks.find(params[:id])
    @task.destroy!
    flash[:success] = t('tasks.destroy.Success')
    redirect_to mission_tasks_path(@mission)
  end
  
  def finish
    @finish_tasks = @mission.tasks.where(task_date: "today_task")
    @finish_untouch_tasks = @finish_tasks.where(status: "untouch")
    @finish_untouch_tasks.update_all(status: "incomplete") if @finish_untouch_tasks.present?
    if @finish_tasks.update_all(task_date: "past_task")
      flash[:success] = t('tasks.finish.Success')
      redirect_to mission_tasks_path(@mission)
    else
      flash.now[:danger] = t('tasks.finish.Not_success')
      render :index
    end
  end
  
  def attack
    task = @mission.tasks.find(params[:id])
    if task.status == "untouch"
      task.status = "complete"
    elsif task.status == "complete"
      task.status = "untouch"
    end
    task.update!(task_params)
    render :index
  end

  def remake
    @task = @mission.tasks.find(params[:id])
    @remake_task = Task.new(title: @task.title, detail: @task.detail)
    @remake_task.mission_id = @mission.id
    binding.pry
    if @remake_task.save
        binding.pry
      flash[:success] = t('tasks.remake.Success')
      redirect_to mission_tasks_path(@mission)
    else
    binding.pry
      flash.now[:danger] = t('tasks.remake.Not_success')
      render :index
    end
  end
  
  private
  
  def task_params
    params.require(:task).permit(:title, :detail, :status, :task_date)
  end
  
  def set_mission
    @mission = Mission.find(params[:mission_id])
  end

  def today_tasks
    @tasks = @mission.tasks.where(task_date: "today_task")
  end
  
  def past_tasks
    @pasttasks = @mission.tasks.where(task_date: "past_task")
  end

  def same_created_tasks
    @same_tasks = @pasttasks.order(created_at: :desc).page(params[:same_task]).per(15)
    @same_created_tasks = @same_tasks.group_by{|task| task.created_at.to_date}
  end

  def set_search_tasks
    mission = current_user.missions.find(params[:mission_id])
    @search_task = mission.tasks.ransack(params[:q])
  end
end
